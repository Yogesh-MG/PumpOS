import { useState } from "react";
import { UserCheck, Clock, Calendar, TrendingUp, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/dashboard/KPICard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const liveCheckins = [
  {
    id: 1,
    member: "Sarah Johnson",
    time: "09:15 AM",
    confidence: 98,
    avatar: "/placeholder.svg",
    type: "checkin"
  },
  {
    id: 2,
    member: "Mike Davis", 
    time: "09:12 AM",
    confidence: 95,
    avatar: "/placeholder.svg",
    type: "checkin"
  },
  {
    id: 3,
    member: "Emma Wilson",
    time: "09:08 AM", 
    confidence: 97,
    avatar: "/placeholder.svg",
    type: "checkout"
  },
  {
    id: 4,
    member: "James Brown",
    time: "09:05 AM",
    confidence: 92,
    avatar: "/placeholder.svg", 
    type: "checkin"
  },
  {
    id: 5,
    member: "Lisa Chen",
    time: "09:02 AM",
    confidence: 99,
    avatar: "/placeholder.svg",
    type: "checkin"
  }
];

const attendanceHistory = [
  {
    date: "2024-03-15",
    totalVisits: 89,
    peakHour: "6:00 PM",
    avgDuration: "1h 25m"
  },
  {
    date: "2024-03-14", 
    totalVisits: 76,
    peakHour: "7:00 AM",
    avgDuration: "1h 18m"
  },
  {
    date: "2024-03-13",
    totalVisits: 92,
    peakHour: "6:00 PM", 
    avgDuration: "1h 32m"
  },
  {
    date: "2024-03-12",
    totalVisits: 68,
    peakHour: "12:00 PM",
    avgDuration: "1h 15m"
  }
];

const currentlyInGym = [
  { member: "Alex Rodriguez", checkinTime: "8:30 AM", duration: "45 min", avatar: "/placeholder.svg" },
  { member: "Sofia Martinez", checkinTime: "8:45 AM", duration: "30 min", avatar: "/placeholder.svg" },
  { member: "David Kim", checkinTime: "9:00 AM", duration: "15 min", avatar: "/placeholder.svg" },
  { member: "Rachel Green", checkinTime: "9:10 AM", duration: "5 min", avatar: "/placeholder.svg" }
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "bg-success/10 text-success";
    if (confidence >= 90) return "bg-warning/10 text-warning";
    return "bg-destructive/10 text-destructive";
  };

  const getTypeIcon = (type: string) => {
    return type === "checkin" ? "→" : "←";
  };

  const getTypeBadge = (type: string) => {
    return type === "checkin" 
      ? <Badge className="bg-success/10 text-success">Check In</Badge>
      : <Badge className="bg-info/10 text-info">Check Out</Badge>;
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <KPICard
          title="Today's Check-ins"
          value="89"
          change={{ value: "+12", type: "increase" }}
          icon={UserCheck}
          description="vs yesterday"
        />
        <KPICard
          title="Currently In Gym"
          value="42"
          icon={Clock}
          description="Live count"
        />
        <KPICard
          title="Peak Hour"
          value="6:00 PM"
          icon={TrendingUp}
          description="Busiest time today"
        />
        <KPICard
          title="Avg Duration"
          value="1h 25m"
          change={{ value: "+8m", type: "increase" }}
          icon={Calendar}
          description="Per visit"
        />
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live">Live Feed</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="currently">Currently In Gym</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5 text-primary" />
                Live Check-ins
              </CardTitle>
              <CardDescription>
                Real-time member check-ins with face recognition confidence scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveCheckins.map((checkin) => (
                  <div key={checkin.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={checkin.avatar} alt={checkin.member} />
                        <AvatarFallback>
                          {checkin.member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{checkin.member}</p>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="inline mr-1 h-3 w-3" />
                          {checkin.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTypeBadge(checkin.type)}
                      <Badge 
                        variant="secondary" 
                        className={getConfidenceColor(checkin.confidence)}
                      >
                        {checkin.confidence}% confidence
                      </Badge>
                      <span className="text-xl font-mono">
                        {getTypeIcon(checkin.type)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Daily attendance summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceHistory.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Peak: {day.peakHour} • Avg Duration: {day.avgDuration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{day.totalVisits}</p>
                      <p className="text-sm text-muted-foreground">total visits</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currently" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Currently In Gym</CardTitle>
              <CardDescription>Members who have checked in but not checked out</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentlyInGym.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.member} />
                        <AvatarFallback>
                          {member.member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.member}</p>
                        <p className="text-sm text-muted-foreground">
                          Checked in at {member.checkinTime}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {member.duration}
                    </Badge>
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