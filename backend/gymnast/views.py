from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from django.db.models import Count
from .models import GymSettings, MembershipPlan, Member, Class, Activity, Booking, Achievement, Message
from .serializers import (
    GymSettingsSerializer, MembershipPlanSerializer, MemberSerializer,
    ClassSerializer,
    ActivitySerializer, BookingSerializer, AchievementSerializer, MessageSerializer
)
from facenet_pytorch import MTCNN, InceptionResnetV1
from django.db.models.functions import Cast
from django.db.models import FloatField
from django.db.models import Count, Avg, Max, Min
from django.utils import timezone
from datetime import timedelta
from django.utils.dateparse import parse_date
import datetime
import cv2
import numpy as np
import random
import base64
import json
from io import BytesIO
from PIL import Image
import torch
from ultralytics import YOLO
from django.contrib.auth import get_user_model

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        })

class GymSettingsView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GymSettingsSerializer

    def get_object(self):
        obj, created = GymSettings.objects.get_or_create(id=1)
        return obj

class MembershipPlanListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MembershipPlan.objects.all()
    serializer_class = MembershipPlanSerializer

class MembershipPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MembershipPlan.objects.all()
    serializer_class = MembershipPlanSerializer

class ClassListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class MemberListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class MemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class SaveFaceEmbeddingView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self):
        super().__init__()
        self.mtcnn = MTCNN(image_size=160, margin=0)  # Face detection
        self.resnet = InceptionResnetV1(pretrained='vggface2').eval()  # Embedding model

    def post(self, request):
        try:
            member_id = request.data.get('member_id')
            image_data = request.data.get('image', '')

            if not member_id or not image_data:
                return Response({'error': 'Member ID and image required'}, status=400)

            # Decode base64 image
            image_bytes = base64.b64decode(image_data.split(',')[1])
            image = Image.open(BytesIO(image_bytes))
            img_rgb = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

            # Detect face with MTCNN
            face = self.mtcnn.detect(img_rgb)
            if face is None:
                return Response({'error': 'No face detected in image'}, status=400)

            # Extract embedding with InceptionResNetV1
            embedding = self.resnet(face[0])  # Returns tensor; convert to list
            embedding_list = embedding.detach().numpy().flatten().tolist()

            # Save to Member model
            member = Member.objects.get(id=member_id)
            member.face_embedding = embedding_list
            member.save()

            serializer = MemberSerializer(member)
            return Response({
                'message': 'Face embedding saved successfully',
                'member': serializer.data
            })
        except Member.DoesNotExist:
            return Response({'error': 'Member not found'}, status=404)
        except Exception as e:
            return Response({'error': f'Failed to extract embedding: {str(e)}'}, status=500)

class MembershipStatsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        stats = Member.objects.values('membership_plan__name').annotate(count=Count('id'))
        result = [
            {
                'type': stat['membership_plan__name'] or 'None',
                'count': stat['count'],
                'color': 'bg-primary' if stat['membership_plan__name'] == 'Premium' else
                         'bg-accent' if stat['membership_plan__name'] == 'Basic' else
                         'bg-success' if stat['membership_plan__name'] == 'Student' else
                         'bg-warning'
            }
            for stat in stats
        ]
        return Response(result)

class ActivityListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ActivitySerializer

    def get_queryset(self):
        member_id = self.request.query_params.get('member_id')
        if member_id:
            return Activity.objects.filter(member_id=member_id)
        return Activity.objects.all()

class BookingListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BookingSerializer

    def get_queryset(self):
        member_id = self.request.query_params.get('member_id')
        if member_id:
            return Booking.objects.filter(member_id=member_id)
        return Booking.objects.all()

class AchievementListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementSerializer

    def get_queryset(self):
        member_id = self.request.query_params.get('member_id')
        if member_id:
            return Achievement.objects.filter(member_id=member_id)
        return Achievement.objects.all()

class MessageListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_queryset(self):
        print(f"-----------------------{self.request}")
        member_id = self.request.query_params.get('member_id')
        if member_id:
            return Message.objects.filter(member_id=member_id)
        return Message.objects.all()
    
class AttendanceSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get date filter from query params (default to today)
        date_str = request.query_params.get('date', timezone.now().date().isoformat())
        try:
            selected_date = parse_date(date_str)
            if not selected_date:
                raise ValueError("Invalid date format")
        except ValueError:
            return Response({"error": "Invalid date format"}, status=400)

        # Live Check-ins (most recent activities)
        live_checkins = Activity.objects.filter(
            timestamp__date=selected_date,
            type__in=['check-in', 'check-out']
        ).order_by('-timestamp')[:5]  # Limit to 5 for display

        # Attendance History (daily summaries for the past 7 days)
        end_date = selected_date
        start_date = end_date - timedelta(days=7)
        history = Activity.objects.filter(
            timestamp__date__range=[start_date, end_date],
            type='check-in'
        ).values('timestamp__date').annotate(
            total_visits=Count('id'),
            peak_hour=Max('timestamp'),
            avg_duration=Avg(Cast('duration', FloatField()))
        ).order_by('-timestamp__date')

        # Currently In Gym (members with check-in but no check-out today)
        checkins = Activity.objects.filter(
            timestamp__date=selected_date,
            type='check-in'
        ).select_related('member')
        checkouts = Activity.objects.filter(
            timestamp__date=selected_date,
            type='check-out'
        ).values('member_id')
        currently_in_gym = checkins.exclude(member_id__in=checkouts).order_by('-timestamp')[:4]

        # Format data
        live_checkins_data = ActivitySerializer(live_checkins, many=True).data
        history_data = [
            {
                'date': item['timestamp__date'].isoformat(),
                'totalVisits': item['total_visits'],
                'peakHour': item['peak_hour'].strftime('%I:%M %p') if item['peak_hour'] else 'N/A',
                'avgDuration': f"{int(float(item['avg_duration'] or 0) // 60)}h {int(float(item['avg_duration'] or 0) % 60)}m"
            }
            for item in history
        ]
        currently_in_gym_data = [
            {
                'member': f"{activity.member.user.first_name} {activity.member.user.last_name}",
                'checkinTime': activity.timestamp.strftime('%I:%M %p'),
                'duration': calculate_duration(activity.timestamp),
                'avatar': activity.member.avatar.url if activity.member.avatar else '/placeholder.svg'
            }
            for activity in currently_in_gym
        ]

        return Response({
            'liveCheckins': live_checkins_data,
            'attendanceHistory': history_data,
            'currentlyInGym': currently_in_gym_data,
            'kpi': {
                'todaysCheckins': Activity.objects.filter(timestamp__date=selected_date, type='check-in').count(),
                'currentlyInGym': len(currently_in_gym),
                'peakHour': history.filter(timestamp__date=selected_date).first()['peak_hour'].strftime('%I:%M %p') if history.filter(timestamp__date=selected_date).exists() else 'N/A',
                'avgDuration': history.filter(timestamp__date=selected_date).first()['avg_duration'] if history.filter(timestamp__date=selected_date).exists() else '0m'
            }
        })

def calculate_duration(checkin_time):
    now = timezone.now()
    delta = now - checkin_time
    minutes = delta.total_seconds() // 60
    hours = int(minutes // 60)
    minutes = int(minutes % 60)
    return f"{hours}h {minutes}m" if hours > 0 else f"{minutes}m"

User = get_user_model()
class FaceRecognitionView(APIView):
    permission_classes = [AllowAny]

    def __init__(self):
        super().__init__()
        # Make sure this path is correct
        self.yolo_model = YOLO('face_model/yolov8n-face.pt')
        self.known_faces = self.load_known_faces()  # {member_id: embedding}

    def load_known_faces(self):
        known_faces = {}
        for member in Member.objects.all():
            if member.face_embedding:
                known_faces[member.id] = np.array(member.face_embedding)
        return known_faces

    def post(self, request):
        try:
            # --- Handle both file upload and base64 ---
            image_file = request.FILES.get('image')
            image_data = request.data.get('image')

            if image_file:
                image_bytes = image_file.read()
            elif image_data:
                if ',' in image_data:
                    image_data = image_data.split(',')[1]
                image_bytes = base64.b64decode(image_data)
            else:
                return Response({'error': 'No image provided'}, status=400)

            # Convert bytes to OpenCV image
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if img is None:
                return Response({'error': 'Invalid image'}, status=400)

            # --- Detect faces ---
            results = self.yolo_model(img)
            if not results[0].boxes:
                return Response({'message': 'No faces detected', 'attendance_updated': False})

            # --- Process the first detected face ---
            box = results[0].boxes[0].xyxy[0].cpu().numpy()
            x1, y1, x2, y2 = map(int, box)
            face = img[y1:y2, x1:x2]

            # --- Extract embedding ---
            embedding = self.extract_face_embedding(face)
            confidence = self.recognize_face(embedding)

            # --- Check if we have known faces ---
            if not self.known_faces:
                return Response({'error': 'No known faces in database'}, status=400)

            if confidence > 0.6:
                # Placeholder: select first known member for demo
                member_id = list(self.known_faces.keys())[0]
                activity = Activity.objects.create(
                    member_id=member_id,
                    type='check-in',  # Or 'check-out' based on your logic
                    confidence=confidence
                )
                serializer = ActivitySerializer(activity)
                return Response({
                    'message': f'Attendance updated for Member ID {member_id}',
                    'attendance_updated': True,
                    'data': serializer.data
                })
            else:
                return Response({'message': 'Face not recognized', 'attendance_updated': False})

        except Exception as e:
            return Response({'error': str(e)}, status=500)

    def extract_face_embedding(self, face):
        # Placeholder: Use MediaPipe, FaceNet, or DeepFace for real embeddings
        # For demo, return a random 128-d vector
        return np.random.rand(128).astype(np.float32)

    def recognize_face(self, embedding):
        # Placeholder: Compare with known embeddings
        # For demo, return random confidence between 0.5 and 0.95
        return random.uniform(0.5, 0.95)