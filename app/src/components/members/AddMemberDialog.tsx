import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AddMemberDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Member Added",
      description: "New member has been added successfully!",
    });
    setOpen(false);
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" required />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="membershipType">Membership Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select membership" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Monthly</SelectItem>
                  <SelectItem value="premium">Premium Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="joinDate">Join Date</Label>
              <Input id="joinDate" type="date" required />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter full address" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input id="emergencyContact" placeholder="Contact name" />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input id="emergencyPhone" type="tel" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};