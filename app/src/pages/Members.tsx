import { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone, Calendar, Users, Star, TrendingUp, Activity } from "lucide-react";
import { AddMemberDialog } from "@/components/members/AddMemberDialog";
import { MemberProfile } from "@/components/members/MemberProfile";
import { AddClassDialog } from "@/components/classes/AddClassDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const members = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    membership: "Premium",
    joinDate: "2024-01-15",
    lastVisit: "2024-03-15",
    status: "Active",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "+1 (555) 234-5678",
    membership: "Basic",
    joinDate: "2024-02-20",
    lastVisit: "2024-03-14",
    status: "Active",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+1 (555) 345-6789",
    membership: "Premium",
    joinDate: "2023-11-10",
    lastVisit: "2024-03-13",
    status: "Active",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "James Brown",
    email: "james.brown@email.com",
    phone: "+1 (555) 456-7890",
    membership: "Premium",
    joinDate: "2024-01-05",
    lastVisit: "2024-03-10",
    status: "Expired",
    avatar: "/placeholder.svg"
  }
];

const membershipStats = [
  { type: "Premium", count: 89, color: "bg-primary" },
  { type: "Basic", count: 156, color: "bg-accent" },
  { type: "Student", count: 23, color: "bg-success" },
  { type: "Corporate", count: 34, color: "bg-warning" }
];

export default function Members() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [membershipFilter, setMembershipFilter] = useState("all");

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership = membershipFilter === "all" || member.membership.toLowerCase() === membershipFilter.toLowerCase();
    return matchesSearch && matchesMembership;
  });

  const handleMemberAction = (action: string, member: any) => {
    toast({
      title: `${action} Member`,
      description: `${action} action performed for ${member.name}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case "Expired":
        return <Badge className="bg-destructive/10 text-destructive">Expired</Badge>;
      case "Suspended":
        return <Badge className="bg-warning/10 text-warning">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMembershipBadge = (membership: string) => {
    switch (membership) {
      case "Premium":
        return <Badge className="bg-primary/10 text-primary">Premium</Badge>;
      case "Basic":
        return <Badge className="bg-accent/10 text-accent">Basic</Badge>;
      case "Student":
        return <Badge className="bg-success/10 text-success">Student</Badge>;
      default:
        return <Badge variant="outline">{membership}</Badge>;
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background rounded-xl border border-border/50 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Members Directory
            </h1>
            <p className="text-muted-foreground text-lg">Manage your gym members and their memberships</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AddClassDialog />
            <AddMemberDialog />
          </div>
        </div>
      </div>

      {/* Enhanced Membership Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {membershipStats.map((stat) => (
          <Card key={stat.type} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}/10`}>
                  <Users className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <Badge className={`${stat.color}/10 ${stat.color.replace('bg-', 'text-')} border-${stat.color.replace('bg-', '')}/30`}>
                  {stat.type}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">{stat.count}</p>
                <p className="text-sm text-muted-foreground">{stat.type} Members</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Member Directory */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card/50 to-card">
        <CardHeader className="pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-semibold">Member Directory</CardTitle>
              <CardDescription className="text-base mt-2">Manage your gym members and their memberships</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 shadow-sm"
                />
              </div>
              <select
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value)}
                className="px-3 py-2 border rounded-md shadow-sm bg-background"
              >
                <option value="all">All Memberships</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
                <option value="student">Student</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">`

          {/* Mobile Member Cards */}
          <div className="block lg:hidden px-6 space-y-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-lg">{member.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {member.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {getStatusBadge(member.status)}
                      {getMembershipBadge(member.membership)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                      </div>
                      <span className="text-muted-foreground">
                        Last visit: {new Date(member.lastVisit).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedMember(member);
                            setShowProfile(true);
                          }}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMemberAction("Edit", member)}>Edit Member</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMemberAction("View Activity", member)}>View Activity</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleMemberAction("Send Message", member)}>Send Message</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleMemberAction("Deactivate", member)}>
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Members Table */}
          <div className="hidden lg:block">
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Member</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Membership</TableHead>
                    <TableHead className="font-semibold">Join Date</TableHead>
                    <TableHead className="font-semibold">Last Visit</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {member.id.toString().padStart(4, '0')}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-1 h-3 w-3" />
                            {member.email}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="mr-1 h-3 w-3" />
                            {member.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getMembershipBadge(member.membership)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(member.joinDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(member.lastVisit).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(member.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => {
                                setSelectedMember(member);
                                setShowProfile(true);
                              }}>View Profile</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMemberAction("Edit", member)}>Edit Member</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMemberAction("View Activity", member)}>View Activity</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleMemberAction("Send Message", member)}>Send Message</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleMemberAction("Deactivate", member)}>
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      
      <MemberProfile 
        member={selectedMember}
        open={showProfile}
        onOpenChange={setShowProfile}
      />
    </div>
  );
}