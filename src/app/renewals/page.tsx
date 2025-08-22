"use client";

import React, { useState } from "react";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { SendReminderModal } from "@/components/ui/send-reminder-modal";
import { ViewCustomerModal } from "@/components/ui/view-customer-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Bell,
  CreditCard,
  Shield,
  Home,
  Briefcase,
  Mail,
  MessageSquare,
  Phone,
  DollarSign,
  TrendingUp,
  Users,
  Target
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";

const upcomingRenewals = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    customerId: "CU001892",
    product: "Home Insurance",
    policyNumber: "POL789456",
    renewalDate: "2024-02-15",
    premium: 2400,
    status: "pending",
    daysToRenewal: 12,
    riskLevel: "low",
    lastReminderSent: "2024-01-28",
    preferredChannel: "Email"
  },
  {
    id: 2,
    customerName: "Michael Chen",
    customerId: "CU002431",
    product: "Life Insurance",
    policyNumber: "POL456123",
    renewalDate: "2024-02-08",
    premium: 4800,
    status: "overdue",
    daysToRenewal: -5,
    riskLevel: "high",
    lastReminderSent: "2024-02-01",
    preferredChannel: "Phone"
  },
  {
    id: 3,
    customerName: "Emily Rodriguez",
    customerId: "CU003567",
    product: "Credit Card",
    accountNumber: "****5678",
    renewalDate: "2024-02-20",
    annualFee: 150,
    status: "confirmed",
    daysToRenewal: 17,
    riskLevel: "low",
    lastReminderSent: "N/A",
    preferredChannel: "SMS"
  },
  {
    id: 4,
    customerName: "David Kumar",
    customerId: "CU004123",
    product: "Fixed Deposit",
    accountNumber: "FD789012",
    renewalDate: "2024-02-25",
    amount: 50000,
    status: "reminder_sent",
    daysToRenewal: 22,
    riskLevel: "medium",
    lastReminderSent: "2024-01-30",
    preferredChannel: "WhatsApp"
  }
];

const reminderCampaigns = [
  {
    type: "Policy Renewals",
    totalDue: 1250,
    remindersSent: 945,
    responses: 678,
    renewalRate: 72,
    channels: ["Email", "SMS", "Call"],
    avgResponseTime: "2.3 days"
  },
  {
    type: "EMI Payments",
    totalDue: 3450,
    remindersSent: 2890,
    responses: 2312,
    renewalRate: 80,
    channels: ["SMS", "Push", "Email"],
    avgResponseTime: "1.1 days"
  },
  {
    type: "Credit Card Renewals",
    totalDue: 890,
    remindersSent: 712,
    responses: 534,
    renewalRate: 75,
    channels: ["Email", "App", "SMS"],
    avgResponseTime: "3.2 days"
  },
  {
    type: "Investment Maturity",
    totalDue: 567,
    remindersSent: 445,
    responses: 398,
    renewalRate: 89,
    channels: ["Call", "Email", "Branch"],
    avgResponseTime: "1.8 days"
  }
];

const monthlyTrends = [
  { month: "Aug", renewals: 850, reminders: 1200, success: 68 },
  { month: "Sep", renewals: 920, reminders: 1350, success: 70 },
  { month: "Oct", renewals: 1050, reminders: 1480, success: 72 },
  { month: "Nov", renewals: 1180, reminders: 1620, success: 75 },
  { month: "Dec", renewals: 1320, reminders: 1850, success: 78 },
  { month: "Jan", renewals: 1450, reminders: 2020, success: 80 }
];

const channelPerformance = [
  { channel: "Email", reminders: 8500, responses: 6120, rate: 72 },
  { channel: "SMS", reminders: 6200, responses: 4650, rate: 75 },
  { channel: "WhatsApp", reminders: 4800, responses: 3840, rate: 80 },
  { channel: "Phone Call", reminders: 2100, responses: 1890, rate: 90 },
  { channel: "Push Notification", reminders: 9500, responses: 6650, rate: 70 }
];

const urgencyLevels = [
  { name: "Overdue", value: 145, color: "#ef4444" },
  { name: "Due in 7 days", value: 289, color: "#f59e0b" },
  { name: "Due in 30 days", value: 567, color: "#3b82f6" },
  { name: "Due in 60 days", value: 823, color: "#10b981" }
];

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

export default function RenewalsReminders() {
  const [sendReminderModalOpen, setSendReminderModalOpen] = useState(false);
  const [viewCustomerModalOpen, setViewCustomerModalOpen] = useState(false);
  const [selectedRenewal, setSelectedRenewal] = useState<any>(null);

  const handleSendReminder = (renewal: any) => {
    setSelectedRenewal(renewal);
    setSendReminderModalOpen(true);
  };

  const handleViewCustomer = (renewal: any) => {
    setSelectedRenewal(renewal);
    setViewCustomerModalOpen(true);
  };

  const handleReminderSend = (reminderData: any) => {
    console.log('Reminder sent:', reminderData, 'for renewal:', selectedRenewal);
    // Here you would typically integrate with your reminder service
    setSendReminderModalOpen(false);
    setSelectedRenewal(null);
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Renewals & Reminder Management</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Next 7 days</SelectItem>
              <SelectItem value="30days">Next 30 days</SelectItem>
              <SelectItem value="60days">Next 60 days</SelectItem>
              <SelectItem value="90days">Next 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,824</div>
            <p className="text-xs text-muted-foreground">
              Policies and products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renewal Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue at Risk</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">
              From pending renewals
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="renewals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="renewals">Upcoming Renewals</TabsTrigger>
          <TabsTrigger value="campaigns">Reminder Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="urgency">Urgency Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="renewals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Renewals & Actions Required</CardTitle>
              <CardDescription>Customer policies and products requiring renewal attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingRenewals.map((renewal) => (
                  <div key={renewal.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {renewal.product.includes('Insurance') && <Shield className="h-5 w-5" />}
                          {renewal.product.includes('Credit') && <CreditCard className="h-5 w-5" />}
                          {renewal.product.includes('Deposit') && <Briefcase className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{renewal.customerName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {renewal.customerId} • {renewal.product}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            renewal.status === 'overdue' ? 'destructive' :
                            renewal.status === 'confirmed' ? 'default' :
                            renewal.status === 'pending' ? 'secondary' : 'outline'
                          }
                        >
                          {renewal.status.replace('_', ' ')}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={
                            renewal.riskLevel === 'high' ? 'bg-red-50 text-red-700' :
                            renewal.riskLevel === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-green-50 text-green-700'
                          }
                        >
                          {renewal.riskLevel} risk
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Renewal Date</p>
                        <p className="font-medium">{new Date(renewal.renewalDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">
                          ${(renewal.premium || renewal.annualFee || renewal.amount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Days to Renewal</p>
                        <p className={`font-medium ${renewal.daysToRenewal < 0 ? 'text-red-600' : 
                                     renewal.daysToRenewal < 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {renewal.daysToRenewal < 0 ? 
                            `${Math.abs(renewal.daysToRenewal)} days overdue` : 
                            `${renewal.daysToRenewal} days`}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Preferred Channel</p>
                        <p className="font-medium">{renewal.preferredChannel}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Last reminder: {renewal.lastReminderSent === 'N/A' ? 'None sent' : 
                                       new Date(renewal.lastReminderSent).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSendReminder(renewal)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Send Reminder
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleViewCustomer(renewal)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          View Customer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4">
            {reminderCampaigns.map((campaign) => (
              <Card key={campaign.type}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campaign.type}</CardTitle>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {campaign.renewalRate}% success rate
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Due</p>
                      <p className="font-bold text-lg">{campaign.totalDue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reminders Sent</p>
                      <p className="font-bold text-lg">{campaign.remindersSent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Responses</p>
                      <p className="font-bold text-lg">{campaign.responses.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                      <p className="font-bold text-lg">{campaign.avgResponseTime}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Campaign Progress</span>
                      <span>{((campaign.remindersSent / campaign.totalDue) * 100).toFixed(1)}% coverage</span>
                    </div>
                    <Progress value={(campaign.remindersSent / campaign.totalDue) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <span>Channels:</span>
                      {campaign.channels.map((channel) => (
                        <Badge key={channel} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm">
                      Optimize Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Renewal Trends</CardTitle>
                <CardDescription>Renewal rates and reminder effectiveness over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="renewals" fill="#3b82f6" name="Renewals" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="success" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      name="Success Rate %" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Response rates by communication channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {channelPerformance.map((channel) => (
                    <div key={channel.channel} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{channel.channel}</span>
                        <span className="text-sm text-muted-foreground">
                          {channel.responses.toLocaleString()}/{channel.reminders.toLocaleString()} ({channel.rate}%)
                        </span>
                      </div>
                      <Progress value={channel.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="urgency" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Urgency Distribution</CardTitle>
                <CardDescription>Breakdown of renewals by urgency level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={urgencyLevels}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {urgencyLevels.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Actions</CardTitle>
                <CardDescription>Immediate actions required by urgency level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {urgencyLevels.map((level, index) => (
                    <div key={level.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: level.color }}
                        />
                        <div>
                          <p className="font-medium">{level.name}</p>
                          <p className="text-sm text-muted-foreground">{level.value} items</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={index === 0 ? "default" : "outline"}
                        className={index === 0 ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        {index === 0 ? "Urgent Action" : "Review"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Send Reminder Modal */}
      {selectedRenewal && (
        <SendReminderModal
          isOpen={sendReminderModalOpen}
          onClose={() => {
            setSendReminderModalOpen(false);
            setSelectedRenewal(null);
          }}
          renewalData={selectedRenewal}
          onSend={handleReminderSend}
        />
      )}

      {/* View Customer Modal */}
      {selectedRenewal && (
        <ViewCustomerModal
          isOpen={viewCustomerModalOpen}
          onClose={() => {
            setViewCustomerModalOpen(false);
            setSelectedRenewal(null);
          }}
          renewalData={selectedRenewal}
        />
      )}
    </div>
      </StaticExportLayout>
    </>
  );
}