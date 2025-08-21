import { useState } from "react";
import { Calendar, Clock, Users, Plus, Filter, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const todaysClasses = [
  {
    id: 1,
    name: "Morning Yoga",
    time: "7:00 AM - 8:00 AM",
    instructor: "Lisa Chen",
    room: "Studio A",
    capacity: 15,
    booked: 12,
    waitlist: 2,
    status: "upcoming"
  },
  {
    id: 2,
    name: "HIIT Training", 
    time: "8:30 AM - 9:30 AM",
    instructor: "Mike Torres",
    room: "Gym Floor",
    capacity: 20,
    booked: 18,
    waitlist: 0,
    status: "in-progress"
  },
  {
    id: 3,
    name: "Pilates",
    time: "10:00 AM - 11:00 AM", 
    instructor: "Sarah Williams",
    room: "Studio B",
    capacity: 12,
    booked: 8,
    waitlist: 0,
    status: "upcoming"
  },
  {
    id: 4,
    name: "Spin Class",
    time: "12:00 PM - 1:00 PM",
    instructor: "David Kim", 
    room: "Cycling Studio",
    capacity: 25,
    booked: 25,
    waitlist: 5,
    status: "full"
  },
  {
    id: 5,
    name: "Evening Yoga",
    time: "6:00 PM - 7:00 PM",
    instructor: "Emma Rodriguez",
    room: "Studio A", 
    capacity: 15,
    booked: 14,
    waitlist: 3,
    status: "upcoming"
  }
];

const weeklySchedule = [
  { day: "Monday", classes: 8 },
  { day: "Tuesday", classes: 10 },
  { day: "Wednesday", classes: 9 },
  { day: "Thursday", classes: 11 },
  { day: "Friday", classes: 7 },
  { day: "Saturday", classes: 6 },
  { day: "Sunday", classes: 5 }
];

const recentBookings = [
  {
    id: 1,
    member: "Sarah Johnson",
    class: "Morning Yoga",
    time: "7:00 AM",
    date: "Today",
    status: "confirmed",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    member: "Mike Davis",
    class: "HIIT Training", 
    time: "8:30 AM",
    date: "Today",
    status: "confirmed",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    member: "Emma Wilson",
    class: "Spin Class",
    time: "12:00 PM", 
    date: "Tomorrow",
    status: "waitlist",
    avatar: "/placeholder.svg"
  }
];

export default function Bookings() {
  const [selectedView, setSelectedView] = useState("today");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-info/10 text-info">Upcoming</Badge>;
      case "in-progress":
        return <Badge className="bg-success/10 text-success">In Progress</Badge>;
      case "full":
        return <Badge className="bg-warning/10 text-warning">Full</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success/10 text-success">Confirmed</Badge>;
      case "waitlist":
        return <Badge className="bg-warning/10 text-warning">Waitlist</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive/10 text-destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCapacityColor = (booked: number, capacity: number) => {
    const percentage = (booked / capacity) * 100;
    if (percentage >= 100) return "text-warning";
    if (percentage >= 80) return "text-info";
    return "text-muted-foreground";
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bookings & Scheduling</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Class
          </Button>
        </div>
      </div>

      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="classes">Today's Classes</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          <div className="grid gap-4">
            {todaysClasses.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{classItem.name}</h3>
                        {getStatusBadge(classItem.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {classItem.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          {classItem.instructor}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {classItem.room}
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="space-y-1">
                        <p className={`text-sm font-medium ${getCapacityColor(classItem.booked, classItem.capacity)}`}>
                          {classItem.booked}/{classItem.capacity} booked
                        </p>
                        {classItem.waitlist > 0 && (
                          <p className="text-xs text-warning">
                            {classItem.waitlist} on waitlist
                          </p>
                        )}
                      </div>
                      
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            classItem.booked >= classItem.capacity 
                              ? 'bg-warning' 
                              : classItem.booked >= classItem.capacity * 0.8 
                                ? 'bg-info' 
                                : 'bg-success'
                          }`}
                          style={{ 
                            width: `${Math.min((classItem.booked / classItem.capacity) * 100, 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Class Schedule</CardTitle>
              <CardDescription>Overview of classes scheduled for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-7">
                {weeklySchedule.map((day) => (
                  <div key={day.day} className="text-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-sm mb-2">{day.day}</h3>
                    <p className="text-2xl font-bold text-primary">{day.classes}</p>
                    <p className="text-xs text-muted-foreground">classes</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Schedule Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-3">
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-medium">Add Recurring Class</h3>
                <p className="text-sm text-muted-foreground">Set up weekly sessions</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-medium">Block Time Slot</h3>
                <p className="text-sm text-muted-foreground">Reserve room/equipment</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-medium">Copy Schedule</h3>
                <p className="text-sm text-muted-foreground">Duplicate to next week</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest class bookings and reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={booking.avatar} alt={booking.member} />
                        <AvatarFallback>
                          {booking.member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.member}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.class} • {booking.time} • {booking.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getBookingStatusBadge(booking.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}