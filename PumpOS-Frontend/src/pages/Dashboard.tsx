import { Users, DollarSign, UserCheck, TrendingUp, Activity, Calendar, Target, Zap } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart, AttendanceChart } from "@/components/dashboard/DashboardChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const recentActivity = [
  {
    id: 1,
    member: "Sarah Johnson",
    action: "Checked in",
    time: "2 min ago",
    avatar: "/placeholder.svg",
    confidence: 98
  },
  {
    id: 2,
    member: "Mike Davis",
    action: "Booked Yoga Class",
    time: "5 min ago",
    avatar: "/placeholder.svg",
    confidence: 95
  },
  {
    id: 3,
    member: "Emma Wilson",
    action: "Payment received",
    time: "12 min ago",
    avatar: "/placeholder.svg",
    confidence: 100
  },
  {
    id: 4,
    member: "James Brown",
    action: "Checked out",
    time: "18 min ago",
    avatar: "/placeholder.svg",
    confidence: 92
  }
];

const upcomingClasses = [
  { id: 1, name: "Morning Yoga", time: "9:00 AM", instructor: "Lisa Chen", spots: "8/12" },
  { id: 2, name: "HIIT Training", time: "10:30 AM", instructor: "Mike Torres", spots: "12/15" },
  { id: 3, name: "Pilates", time: "12:00 PM", instructor: "Sarah Williams", spots: "6/10" },
  { id: 4, name: "Spin Class", time: "2:00 PM", instructor: "David Kim", spots: "15/20" }
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-success border-success">
            <Activity className="mr-1 h-3 w-3" />
            System Healthy
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Members"
          value="1,234"
          change={{ value: "+12%", type: "increase" }}
          icon={Users}
          description="Active memberships"
        />
        <KPICard
          title="Monthly Revenue"
          value="$47,250"
          change={{ value: "+8.2%", type: "increase" }}
          icon={DollarSign}
          description="This month"
        />
        <KPICard
          title="Today's Check-ins"
          value="89"
          change={{ value: "+15%", type: "increase" }}
          icon={UserCheck}
          description="Last updated 2 min ago"
        />
        <KPICard
          title="Conversion Rate"
          value="24.5%"
          change={{ value: "+2.1%", type: "increase" }}
          icon={TrendingUp}
          description="Leads to members"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart />
        <AttendanceChart />
      </div>

      {/* Recent Activity & Upcoming Classes */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Live member check-ins and activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.avatar} alt={activity.member} />
                  <AvatarFallback>
                    {activity.member.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.member}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  {activity.confidence && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.confidence}%
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Upcoming Classes
            </CardTitle>
            <CardDescription>Today's scheduled classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{classItem.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {classItem.time} • {classItem.instructor}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {classItem.spots}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-4">
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-medium">Add Member</h3>
            <p className="text-sm text-muted-foreground">Register new member</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-medium">Check-in Member</h3>
            <p className="text-sm text-muted-foreground">Manual check-in</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-medium">Create Class</h3>
            <p className="text-sm text-muted-foreground">Schedule new class</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <h3 className="font-medium">Process Payment</h3>
            <p className="text-sm text-muted-foreground">Manual payment entry</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}