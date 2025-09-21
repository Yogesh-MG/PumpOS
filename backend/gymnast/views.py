from rest_framework.permissions import IsAuthenticated
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
from django.db.models import Count, Avg, Max, Min
from django.utils import timezone
from datetime import timedelta
from django.utils.dateparse import parse_date
import datetime

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
            avg_duration=Avg('duration')
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