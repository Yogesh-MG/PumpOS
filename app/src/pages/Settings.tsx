import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Bell, CreditCard, Shield, Globe, Palette, Database, Save, Upload } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your gym's configuration and preferences</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>Update your gym's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gym-name">Gym Name</Label>
                  <Input id="gym-name" defaultValue="FitLife Wellness Center" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Fitness Street, Health City, HC 12345" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="info@fitlifegym.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.fitlifegym.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Configure timezone and regional preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                      <SelectItem value="eur">EUR - Euro (€)</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound (£)</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance & Branding
              </CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Logo Upload</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload logo</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded border"></div>
                    <Input id="primary-color" defaultValue="#6366f1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-secondary rounded border"></div>
                    <Input id="secondary-color" defaultValue="#f1f5f9" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="membership" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Membership Plans
              </CardTitle>
              <CardDescription>Configure membership tiers and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Plan</CardTitle>
                    <Badge variant="outline">Active</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-2xl font-bold">$29/month</div>
                    <ul className="text-sm space-y-1">
                      <li>• Gym access</li>
                      <li>• Basic equipment</li>
                      <li>• Locker room</li>
                    </ul>
                    <Button variant="outline" className="w-full">Edit Plan</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Premium Plan</CardTitle>
                    <Badge variant="outline">Active</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-2xl font-bold">$59/month</div>
                    <ul className="text-sm space-y-1">
                      <li>• All basic features</li>
                      <li>• Group classes</li>
                      <li>• Personal training session</li>
                    </ul>
                    <Button variant="outline" className="w-full">Edit Plan</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">VIP Plan</CardTitle>
                    <Badge variant="outline">Active</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-2xl font-bold">$99/month</div>
                    <ul className="text-sm space-y-1">
                      <li>• All premium features</li>
                      <li>• Unlimited personal training</li>
                      <li>• Nutrition consultation</li>
                    </ul>
                    <Button variant="outline" className="w-full">Edit Plan</Button>
                  </CardContent>
                </Card>
              </div>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Add New Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="member-activity">Member Activity Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new member signups and activities</p>
                  </div>
                  <Switch id="member-activity" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-alerts">Payment Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of successful payments and failures</p>
                  </div>
                  <Switch id="payment-alerts" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Configuration
              </CardTitle>
              <CardDescription>Set up payment methods and billing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Gateways</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">S</div>
                        <div>
                          <div className="font-medium">Stripe</div>
                          <div className="text-sm text-muted-foreground">Credit cards, debit cards</div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-info rounded flex items-center justify-center text-white font-bold">P</div>
                        <div>
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-muted-foreground">PayPal payments</div>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Billing Settings</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="billing-cycle">Default Billing Cycle</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="late-fee">Late Payment Fee</Label>
                      <Input id="late-fee" defaultValue="$25.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grace-period">Grace Period (days)</Label>
                      <Input id="grace-period" type="number" defaultValue="7" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage security preferences and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout">Auto Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out users after inactivity</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, numbers, symbols)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Data Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Third-Party Integrations
              </CardTitle>
              <CardDescription>Connect external services and applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success rounded flex items-center justify-center text-white font-bold">M</div>
                      <div>
                        <div className="font-medium">MailChimp</div>
                        <div className="text-sm text-muted-foreground">Email marketing automation</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10">Connected</Badge>
                  </div>
                  <Button variant="outline" className="w-full">Configure</Button>
                </div>
                
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-info rounded flex items-center justify-center text-white font-bold">Z</div>
                      <div>
                        <div className="font-medium">Zoom</div>
                        <div className="text-sm text-muted-foreground">Virtual classes and meetings</div>
                      </div>
                    </div>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                  <Button variant="outline" className="w-full">Connect</Button>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning rounded flex items-center justify-center text-white font-bold">Q</div>
                      <div>
                        <div className="font-medium">QuickBooks</div>
                        <div className="text-sm text-muted-foreground">Accounting and bookkeeping</div>
                      </div>
                    </div>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                  <Button variant="outline" className="w-full">Connect</Button>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-destructive rounded flex items-center justify-center text-white font-bold">S</div>
                      <div>
                        <div className="font-medium">Slack</div>
                        <div className="text-sm text-muted-foreground">Team communication</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10">Connected</Badge>
                  </div>
                  <Button variant="outline" className="w-full">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;