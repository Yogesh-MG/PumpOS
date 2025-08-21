import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, FileText, Calendar, CreditCard, Search, Filter, Plus, Eye, Edit, Download } from "lucide-react";

const Sales = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales & Billing</h1>
          <p className="text-muted-foreground">Manage invoices, payments, and sales pipeline</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
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

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices">Invoices & Billing</TabsTrigger>
          <TabsTrigger value="deals">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Track payment status and manage billing</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search invoices..." className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
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
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.member}</TableCell>
                      <TableCell>{invoice.plan}</TableCell>
                      <TableCell className="font-semibold">{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="deals" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales Pipeline</CardTitle>
                  <CardDescription>Track deals and sales opportunities</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Deal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deal ID</TableHead>
                    <TableHead>Prospect</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Close Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">{deal.id}</TableCell>
                      <TableCell>{deal.prospect}</TableCell>
                      <TableCell className="font-semibold">{deal.value}</TableCell>
                      <TableCell>
                        <Badge className={getStageColor(deal.stage)}>
                          {deal.stage}
                        </Badge>
                      </TableCell>
                      <TableCell>{deal.probability}</TableCell>
                      <TableCell>{deal.closeDate}</TableCell>
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

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Revenue chart will be displayed here</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Payment distribution</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Payment methods chart will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sales;