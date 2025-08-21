import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Clock, Calendar, DollarSign, Search, Filter, Plus, Eye, Edit, MessageSquare, UserCheck } from "lucide-react";

const Staff = () => {
  const kpiData = [
    { title: "Total Staff", value: "24", change: "+2", icon: Users, trend: "up" },
    { title: "Hours This Week", value: "892", change: "+45", icon: Clock, trend: "up" },
    { title: "Classes Scheduled", value: "156", change: "+12", icon: Calendar, trend: "up" },
    { title: "Payroll This Month", value: "$28,450", change: "+8.5%", icon: DollarSign, trend: "up" },
  ];

  const staffMembers = [
    { 
      id: "STAFF-001", 
      name: "Sarah Johnson", 
      role: "Head Trainer", 
      department: "Personal Training",
      status: "active", 
      hoursWeek: 40, 
      phone: "(555) 123-4567",
      email: "sarah@gym.com",
      joinDate: "2022-03-15",
      certifications: ["NASM-CPT", "Nutrition Specialist"],
      avatar: "/placeholder.svg"
    },
    { 
      id: "STAFF-002", 
      name: "Mike Rodriguez", 
      role: "Yoga Instructor", 
      department: "Group Classes",
      status: "active", 
      hoursWeek: 25, 
      phone: "(555) 234-5678",
      email: "mike@gym.com",
      joinDate: "2021-08-20",
      certifications: ["RYT-500", "Meditation Coach"],
      avatar: "/placeholder.svg"
    },
    { 
      id: "STAFF-003", 
      name: "Emma Chen", 
      role: "Front Desk", 
      department: "Customer Service",
      status: "active", 
      hoursWeek: 35, 
      phone: "(555) 345-6789",
      email: "emma@gym.com",
      joinDate: "2023-01-10",
      certifications: ["Customer Service", "First Aid"],
      avatar: "/placeholder.svg"
    },
    { 
      id: "STAFF-004", 
      name: "David Kim", 
      role: "Maintenance", 
      department: "Facilities",
      status: "part-time", 
      hoursWeek: 20, 
      phone: "(555) 456-7890",
      email: "david@gym.com",
      joinDate: "2022-11-05",
      certifications: ["Equipment Maintenance", "Safety"],
      avatar: "/placeholder.svg"
    },
  ];

  const schedules = [
    { staff: "Sarah Johnson", day: "Monday", time: "6:00 AM - 2:00 PM", type: "Personal Training" },
    { staff: "Mike Rodriguez", day: "Monday", time: "9:00 AM - 12:00 PM", type: "Yoga Classes" },
    { staff: "Emma Chen", day: "Monday", time: "8:00 AM - 4:00 PM", type: "Front Desk" },
    { staff: "Sarah Johnson", day: "Tuesday", time: "6:00 AM - 2:00 PM", type: "Personal Training" },
    { staff: "Mike Rodriguez", day: "Tuesday", time: "6:00 PM - 8:00 PM", type: "Evening Yoga" },
  ];

  const resources = [
    { name: "Gym Equipment", type: "Equipment", status: "available", location: "Main Floor", maintenance: "Up to date" },
    { name: "Yoga Studio A", type: "Room", status: "occupied", location: "2nd Floor", capacity: "25 people" },
    { name: "Personal Training Room 1", type: "Room", status: "available", location: "1st Floor", capacity: "2 people" },
    { name: "Swimming Pool", type: "Facility", status: "maintenance", location: "Ground Floor", maintenance: "Scheduled cleaning" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "part-time": return "bg-info text-info-foreground";
      case "on-leave": return "bg-warning text-warning-foreground";
      case "inactive": return "bg-muted text-muted-foreground";
      case "available": return "bg-success text-success-foreground";
      case "occupied": return "bg-warning text-warning-foreground";
      case "maintenance": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff & Resources</h1>
          <p className="text-muted-foreground">Manage staff, schedules, and facility resources</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className={`text-xs ${kpi.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
          <TabsTrigger value="schedule">Schedules</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Directory</CardTitle>
                  <CardDescription>Manage staff members and their information</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search staff..." className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="training">Personal Training</SelectItem>
                      <SelectItem value="classes">Group Classes</SelectItem>
                      <SelectItem value="service">Customer Service</SelectItem>
                      <SelectItem value="facilities">Facilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Role & Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hours/Week</TableHead>
                    <TableHead>Certifications</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffMembers.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={staff.avatar} />
                            <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-sm text-muted-foreground">{staff.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{staff.role}</div>
                          <div className="text-sm text-muted-foreground">{staff.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{staff.email}</div>
                          <div className="text-sm text-muted-foreground">{staff.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(staff.status)}>
                          {staff.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{staff.hoursWeek}h</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {staff.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Schedules</CardTitle>
                  <CardDescription>View and manage staff work schedules</CardDescription>
                </div>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{schedule.staff}</TableCell>
                      <TableCell>{schedule.day}</TableCell>
                      <TableCell>{schedule.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{schedule.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Facility Resources</CardTitle>
                  <CardDescription>Manage equipment, rooms, and facility resources</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{resource.name}</TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(resource.status)}>
                          {resource.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{resource.location}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {resource.capacity || resource.maintenance}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Staff;