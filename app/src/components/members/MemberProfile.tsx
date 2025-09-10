import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit, 
  MessageSquare, 
  UserX,
  Activity,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  status: string;
  joinDate: string;
  avatar?: string;
}

interface MemberProfileProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MemberProfile = ({ member, open, onOpenChange }: MemberProfileProps) => {
  const { toast } = useToast();
  
  if (!member) return null;

  const handleAction = (action: string) => {
    toast({
      title: `${action} Initiated`,
      description: `${action} for ${member.name} has been processed.`,
    });
  };

  const activityData = [
    { date: "2024-01-15", activity: "Gym Check-in", time: "07:30 AM" },
    { date: "2024-01-14", activity: "Group Class - Yoga", time: "06:00 PM" },
    { date: "2024-01-13", activity: "Personal Training", time: "08:00 AM" },
    { date: "2024-01-12", activity: "Gym Check-in", time: "07:45 AM" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Member Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="text-lg">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                  {member.status}
                </Badge>
                <Badge variant="outline">{member.membershipType}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {member.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Joined {member.joinDate}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  New York, NY
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleAction("Edit Profile")}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction("Send Message")}>
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleAction("Deactivate")}>
                <UserX className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{item.activity}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                        <Badge variant="outline">{item.time}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Current Plan:</span>
                      <Badge>{member.membershipType}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Fee:</span>
                      <span className="font-semibold">$99.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Billing:</span>
                      <span>Feb 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span>**** 1234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Date of Birth</Label>
                      <p>January 15, 1990</p>
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <p>Male</p>
                    </div>
                    <div>
                      <Label>Emergency Contact</Label>
                      <p>Jane Doe</p>
                    </div>
                    <div>
                      <Label>Emergency Phone</Label>
                      <p>+1 (555) 987-6543</p>
                    </div>
                    <div className="col-span-2">
                      <Label>Address</Label>
                      <p>123 Main Street, New York, NY 10001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-medium text-muted-foreground">{children}</span>
);