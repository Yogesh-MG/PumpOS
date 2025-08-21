import { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react";
import { AddMemberDialog } from "@/components/members/AddMemberDialog";
import { MemberProfile } from "@/components/members/MemberProfile";
import { AddClassDialog } from "@/components/classes/AddClassDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Members</h1>
        <div className="flex gap-2">
          <AddClassDialog />
          <AddMemberDialog />
        </div>
      </div>

      {/* Membership Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {membershipStats.map((stat) => (
          <Card key={stat.type}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-sm text-muted-foreground">{stat.type} Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
          <CardDescription>Manage your gym members and their memberships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Members Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
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
                  <TableCell className="text-right">
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
                        <DropdownMenuItem>Edit Member</DropdownMenuItem>
                        <DropdownMenuItem>View Activity</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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