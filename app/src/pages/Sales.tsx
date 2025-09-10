import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, TrendingUp, FileText, Calendar, CreditCard, Search, Filter, Plus, Eye, Edit, Download, Receipt, BarChart3 } from "lucide-react";

const Sales = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const kpiData = [
    { title: "Monthly Revenue", value: "$45,230", change: "+12.5%", icon: DollarSign, trend: "up" },
    { title: "Outstanding Invoices", value: "$8,450", change: "-3.2%", icon: FileText, trend: "down" },
    { title: "Payment Success Rate", value: "94.8%", change: "+2.1%", icon: CreditCard, trend: "up" },
    { title: "Average Deal Size", value: "$285", change: "+8.7%", icon: TrendingUp, trend: "up" },
  ];

  const recentInvoices = [
    { id: "INV-001", member: "John Smith", amount: "$120", status: "paid", date: "2024-01-15", plan: "Premium" },
    { id: "INV-002", member: "Sarah Johnson", amount: "$80", status: "pending", date: "2024-01-14", plan: "Basic" },
    { id: "INV-003", member: "Mike Wilson", amount: "$150", status: "overdue", date: "2024-01-10", plan: "VIP" },
    { id: "INV-004", member: "Emily Davis", amount: "$100", status: "paid", date: "2024-01-12", plan: "Standard" },
  ];

  const salesDeals = [
    { id: "DEAL-001", prospect: "Corporate Fitness Inc.", value: "$2,500", stage: "proposal", probability: "75%", closeDate: "2024-02-01" },
    { id: "DEAL-002", prospect: "Local Sports Club", value: "$1,800", stage: "negotiation", probability: "60%", closeDate: "2024-02-15" },
    { id: "DEAL-003", prospect: "University Gym", value: "$5,000", stage: "closed-won", probability: "100%", closeDate: "2024-01-20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "overdue": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "closed-won": return "bg-success text-success-foreground";
      case "proposal": return "bg-info text-info-foreground";
      case "negotiation": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredInvoices = recentInvoices.filter(invoice => {
    const matchesSearch = invoice.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleInvoiceAction = (action: string, invoice: any) => {
    toast({
      title: `${action} Invoice`,
      description: `${action} action performed for invoice ${invoice.id}`,
    });
  };

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background rounded-xl border border-border/50 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sales & Billing
            </h1>
            <p className="text-muted-foreground text-lg">Manage invoices, payments, and sales pipeline</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="shadow-sm hover:shadow-md transition-all">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-accent">
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                  <DialogDescription>Generate a new invoice for a member</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Member</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Amount</label>
                    <Input placeholder="$0.00" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plan</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewInvoiceOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "Invoice Created",
                      description: "New invoice has been generated successfully.",
                    });
                    setIsNewInvoiceOpen(false);
                  }}>
                    Create Invoice
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground mb-2">{kpi.value}</div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${kpi.trend === 'up' ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}
                >
                  {kpi.change}
                </Badge>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="invoices" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-12 bg-card shadow-lg border">
            <TabsTrigger value="invoices" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Invoices & Billing
            </TabsTrigger>
            <TabsTrigger value="deals" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Sales Pipeline
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Financial Reports
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card/50 to-card">
            <CardHeader className="pb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-semibold">Recent Invoices</CardTitle>
                  <CardDescription className="text-base mt-2">Track payment status and manage billing</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search invoices..." 
                      className="pl-10 w-full sm:w-64 shadow-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32 shadow-sm">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              {/* Mobile Invoice Cards */}
              <div className="block lg:hidden px-6 space-y-4">
                {filteredInvoices.map((invoice) => (
                  <Card key={invoice.id} className="shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-semibold text-lg">{invoice.id}</div>
                          <div className="text-sm text-muted-foreground">{invoice.member}</div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                          <div className="font-semibold text-lg">{invoice.amount}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Plan:</span>
                          <Badge variant="outline" className="bg-secondary/50">{invoice.plan}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{invoice.date}</span>
                        </div>
                        
                        <div className="flex justify-end gap-1 mt-3">
                          <Button variant="ghost" size="sm" onClick={() => handleInvoiceAction("View", invoice)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleInvoiceAction("Edit", invoice)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleInvoiceAction("Download", invoice)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Invoice Table */}
              <div className="hidden lg:block">
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Invoice ID</TableHead>
                        <TableHead className="font-semibold">Member</TableHead>
                        <TableHead className="font-semibold">Plan</TableHead>
                        <TableHead className="font-semibold">Amount</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.member}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-secondary/50">{invoice.plan}</Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{invoice.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleInvoiceAction("View", invoice)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleInvoiceAction("Edit", invoice)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleInvoiceAction("Download", invoice)}>
                                <Download className="h-4 w-4" />
                              </Button>
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
        </TabsContent>

        <TabsContent value="deals" className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card/50 to-card">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-semibold">Sales Pipeline</CardTitle>
                  <CardDescription className="text-base mt-2">Track deals and sales opportunities</CardDescription>
                </div>
                <Button className="shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-accent">
                  <Plus className="h-4 w-4 mr-2" />
                  New Deal
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="block lg:hidden px-6 space-y-4">
                {salesDeals.map((deal) => (
                  <Card key={deal.id} className="shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-semibold text-lg">{deal.id}</div>
                          <div className="text-sm text-muted-foreground">{deal.prospect}</div>
                        </div>
                        <Badge className={getStageColor(deal.stage)}>
                          {deal.stage}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Value:</span>
                          <span className="font-semibold text-lg">{deal.value}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Probability:</span>
                          <Badge variant="outline" className="bg-success/10 text-success">{deal.probability}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Close Date:</span>
                          <span>{deal.closeDate}</span>
                        </div>
                        
                        <div className="flex justify-end gap-1 mt-3">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="hidden lg:block">
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Deal ID</TableHead>
                        <TableHead className="font-semibold">Prospect</TableHead>
                        <TableHead className="font-semibold">Value</TableHead>
                        <TableHead className="font-semibold">Stage</TableHead>
                        <TableHead className="font-semibold">Probability</TableHead>
                        <TableHead className="font-semibold">Close Date</TableHead>
                        <TableHead className="font-semibold text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesDeals.map((deal) => (
                        <TableRow key={deal.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">{deal.id}</TableCell>
                          <TableCell>{deal.prospect}</TableCell>
                          <TableCell className="font-semibold">{deal.value}</TableCell>
                          <TableCell>
                            <Badge className={getStageColor(deal.stage)}>
                              {deal.stage}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-success/10 text-success">{deal.probability}</Badge>
                          </TableCell>
                          <TableCell>{deal.closeDate}</TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
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
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card/50 to-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Revenue Summary</CardTitle>
                    <CardDescription>Monthly revenue breakdown</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-primary">$125,480</div>
                  <div className="text-sm text-muted-foreground">Total revenue this quarter</div>
                  <Button variant="outline" className="hover:bg-primary/10">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card/50 to-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <CreditCard className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Payment distribution</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Credit Cards</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div className="w-12 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bank Transfer</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div className="w-4 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cash</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-muted rounded-full">
                        <div className="w-1 h-2 bg-success rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sales;