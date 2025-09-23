import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";
import { Badge } from "@/components/ui/badge";

interface MembershipPlan {
  id: number;
  name: string;
}

interface AddMemberDialogProps {
  onMemberAdded?: () => void;
}

export const AddMemberDialog: React.FC<AddMemberDialogProps> = ({ onMemberAdded }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipType: "",
    joinDate: new Date().toISOString().split("T")[0],
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    dateOfBirth: "",
    gender: "",
  });

  // Camera State for Face Registration
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturingFace, setIsCapturingFace] = useState(false);
  const [faceCaptured, setFaceCaptured] = useState(false);

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        const response = await api.get("/api/membership-plans/");
        setMembershipPlans(response.data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to fetch membership plans.",
          variant: "destructive",
        });
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchMembershipPlans();
  }, [toast, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleMembershipChange = (value: string) => {
    setFormData((prev) => ({ ...prev, membershipType: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  // Start Face Capture
  const startFaceCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturingFace(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Please allow camera access to register face.",
        variant: "destructive",
      });
    }
  };

  // Capture Face and Save Embedding
  const captureFaceAndSave = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg", 0.8);

      try {
        const response = await api.post("/api/save-face-embedding/", {
          member_id: "temp_id",  // Will be replaced after member creation
          image: imageData,
        },{
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
        toast({
          title: "Face Registered!",
          description: response.data.message,
        });
        setFaceCaptured(true);
        // Stop stream
        if (videoRef.current.srcObject) {
          (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
        }
        setIsCapturingFace(false);
      } catch (error: any) {
        toast({
          title: "Embedding Error",
          description: error.response?.data?.error || "Failed to register face.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // First, create the member
      const memberResponse = await api.post("/api/members/", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        membership_plan: formData.membershipType ? parseInt(formData.membershipType, 10) : null,
        join_date: formData.joinDate,
        address: formData.address || null,
        emergency_contact: formData.emergencyContact || null,
        emergency_phone: formData.emergencyPhone || null,
        date_of_birth: formData.dateOfBirth || null,
        gender: formData.gender || null,
        status: "Active",
      },{
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      const memberId = memberResponse.data.id;

      // If face was captured, save embedding for the new member
      if (faceCaptured) {
        const imageData = canvasRef.current?.toDataURL("image/jpeg", 0.8);
        if (imageData) {
          await api.post("/api/save-face-embedding/", {
            member_id: memberId,  // Use the new member ID
            image: imageData,
          }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
        }
      }

      toast({
        title: "Member Added",
        description: `New member ${formData.firstName} ${formData.lastName} has been added successfully!`,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        membershipType: "",
        joinDate: new Date().toISOString().split("T")[0],
        address: "",
        emergencyContact: "",
        emergencyPhone: "",
        dateOfBirth: "",
        gender: "",
      });
      setFaceCaptured(false);
      setOpen(false);
      if (onMemberAdded) onMemberAdded();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to add member.",
        variant: "destructive",
      });
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Existing fields... */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Face Registration Section */}
          <div className="border rounded-lg p-4">
            <Label className="text-lg font-semibold mb-2 block">Face Registration (for Automatic Check-in)</Label>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Capture a clear front-facing photo for face recognition.</p>
              {!isCapturingFace ? (
                <Button onClick={startFaceCapture} variant="outline">
                  Capture Face
                </Button>
              ) : (
                <div className="text-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
                  />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                  <div className="flex gap-2 justify-center mt-4">
                    <Button onClick={captureFaceAndSave}>
                      Capture & Register
                    </Button>
                    <Button variant="outline" onClick={() => {
                      if (videoRef.current?.srcObject) {
                        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                      }
                      setIsCapturingFace(false);
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              {faceCaptured && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  Face registered successfully!
                </Badge>
              )}
            </div>
          </div>

          {/* Other existing fields... */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Rest of form... */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};