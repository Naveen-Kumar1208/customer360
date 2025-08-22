"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  CreditCard,
  Shield,
  Briefcase,
  TrendingUp,
  Clock,
  Star,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle,
  Building2,
  Target,
  History
} from 'lucide-react';

interface RenewalData {
  id: number;
  customerName: string;
  customerId: string;
  product: string;
  policyNumber?: string;
  accountNumber?: string;
  renewalDate: string;
  premium?: number;
  annualFee?: number;
  amount?: number;
  status: string;
  daysToRenewal: number;
  riskLevel: string;
  lastReminderSent: string;
  preferredChannel: string;
}

interface ViewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  renewalData: RenewalData;
}

// Mock customer data - in real implementation, this would come from your customer API
const getCustomerDetails = (customerId: string) => ({
  personalInfo: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, ST 12345",
    dateOfBirth: "1985-03-15",
    customerSince: "2019-06-20",
    preferredLanguage: "English",
    communicationPreference: "Email"
  },
  financialProfile: {
    totalRelationshipValue: 125000,
    creditScore: 742,
    riskRating: "Low",
    paymentHistory: 98.5,
    averageBalance: 25000,
    monthlyIncome: 8500
  },
  products: [
    {
      type: "Home Insurance",
      policyNumber: "POL789456",
      status: "Active",
      premium: 2400,
      startDate: "2023-02-15",
      endDate: "2024-02-15",
      coverage: "$500,000"
    },
    {
      type: "Auto Insurance",
      policyNumber: "POL456789",
      status: "Active",
      premium: 1800,
      startDate: "2023-01-10",
      endDate: "2024-01-10",
      coverage: "$100,000"
    },
    {
      type: "Savings Account",
      accountNumber: "****3456",
      status: "Active",
      balance: 45000,
      interestRate: "2.5%",
      accountType: "High Yield Savings"
    }
  ],
  interactionHistory: [
    {
      date: "2024-01-28",
      type: "Email",
      subject: "Renewal Reminder Sent",
      status: "Delivered",
      agent: "System Auto"
    },
    {
      date: "2024-01-15",
      type: "Phone Call",
      subject: "Policy Inquiry",
      status: "Resolved",
      agent: "John Smith",
      duration: "12 minutes"
    },
    {
      date: "2024-01-05",
      type: "Email",
      subject: "Welcome to Premium Services",
      status: "Opened",
      agent: "Marketing Team"
    },
    {
      date: "2023-12-20",
      type: "Branch Visit",
      subject: "Account Review",
      status: "Completed",
      agent: "Jane Doe"
    }
  ],
  renewalHistory: [
    {
      year: "2023",
      product: "Home Insurance",
      amount: 2400,
      status: "Renewed",
      daysToRenewal: 5,
      renewalDate: "2023-02-15"
    },
    {
      year: "2022",
      product: "Home Insurance",
      amount: 2200,
      status: "Renewed",
      daysToRenewal: 12,
      renewalDate: "2022-02-15"
    },
    {
      year: "2021",
      product: "Home Insurance",
      amount: 2000,
      status: "Renewed",
      daysToRenewal: 8,
      renewalDate: "2021-02-15"
    }
  ],
  riskFactors: [
    {
      factor: "Payment History",
      score: 95,
      status: "Excellent",
      impact: "Low Risk"
    },
    {
      factor: "Customer Tenure",
      score: 88,
      status: "Good",
      impact: "Low Risk"
    },
    {
      factor: "Product Utilization",
      score: 72,
      status: "Fair",
      impact: "Medium Risk"
    },
    {
      factor: "Communication Response",
      score: 85,
      status: "Good",
      impact: "Low Risk"
    }
  ]
});

export const ViewCustomerModal: React.FC<ViewCustomerModalProps> = ({
  isOpen,
  onClose,
  renewalData
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const customerData = getCustomerDetails(renewalData.customerId);

  const getProductIcon = (product: string) => {
    if (product.includes('Insurance')) return Shield;
    if (product.includes('Credit') || product.includes('Card')) return CreditCard;
    if (product.includes('Deposit') || product.includes('Savings') || product.includes('Account')) return Briefcase;
    return Building2;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'expired': return 'bg-red-100 text-red-700 border-red-200';
      case 'renewed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Customer Profile - {renewalData.customerName}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="renewals">Renewal History</TabsTrigger>
            <TabsTrigger value="risk">Risk Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{customerData.personalInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{customerData.personalInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-sm">{customerData.personalInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Customer Since</p>
                      <p className="font-medium">
                        {new Date(customerData.personalInfo.customerSince).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Total Relationship Value</p>
                    <p className="font-bold text-xl text-green-600">
                      ${customerData.financialProfile.totalRelationshipValue.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Credit Score</p>
                      <p className="font-medium">{customerData.financialProfile.creditScore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Risk Rating</p>
                      <Badge className={`${getRiskColor(customerData.financialProfile.riskRating)} bg-transparent border-current`}>
                        {customerData.financialProfile.riskRating}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment History</p>
                    <div className="flex items-center gap-2">
                      <Progress value={customerData.financialProfile.paymentHistory} className="flex-1" />
                      <span className="text-sm font-medium">{customerData.financialProfile.paymentHistory}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Renewal */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Current Renewal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    {React.createElement(getProductIcon(renewalData.product), { 
                      className: "w-5 h-5 text-blue-600" 
                    })}
                    <div>
                      <p className="font-medium">{renewalData.product}</p>
                      <p className="text-sm text-gray-500">
                        {renewalData.policyNumber || renewalData.accountNumber}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Renewal Amount</p>
                    <p className="font-bold text-lg">
                      ${(renewalData.premium || renewalData.annualFee || renewalData.amount || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Days to Renewal</p>
                    <p className={`font-medium ${renewalData.daysToRenewal < 0 ? 'text-red-600' : 
                      renewalData.daysToRenewal < 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {renewalData.daysToRenewal < 0 ? 
                        `${Math.abs(renewalData.daysToRenewal)} days overdue` : 
                        `${renewalData.daysToRenewal} days`}
                    </p>
                  </div>
                  <Badge className={getStatusColor(renewalData.status)}>
                    {renewalData.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="grid gap-4">
              {customerData.products.map((product, index) => {
                const ProductIcon = getProductIcon(product.type);
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <ProductIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{product.type}</h4>
                            <p className="text-sm text-gray-500">
                              {product.policyNumber || product.accountNumber}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Value/Premium</p>
                          <p className="font-medium">
                            ${(product.premium || product.balance || 0).toLocaleString()}
                          </p>
                        </div>
                        {product.startDate && (
                          <div>
                            <p className="text-gray-500">Start Date</p>
                            <p className="font-medium">
                              {new Date(product.startDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        {product.endDate && (
                          <div>
                            <p className="text-gray-500">End Date</p>
                            <p className="font-medium">
                              {new Date(product.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-500">
                            {product.coverage ? 'Coverage' : 'Rate'}
                          </p>
                          <p className="font-medium">
                            {product.coverage || product.interestRate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Interactions
                </CardTitle>
                <CardDescription>Customer communication and service history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerData.interactionHistory.map((interaction, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {interaction.type === 'Email' && <Mail className="w-4 h-4" />}
                        {interaction.type === 'Phone Call' && <Phone className="w-4 h-4" />}
                        {interaction.type === 'Branch Visit' && <Building2 className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{interaction.subject}</h4>
                          <Badge variant="outline" className={getStatusColor(interaction.status)}>
                            {interaction.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{new Date(interaction.date).toLocaleDateString()}</span>
                          <span>{interaction.type}</span>
                          <span>Agent: {interaction.agent}</span>
                          {interaction.duration && (
                            <span>Duration: {interaction.duration}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renewals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Renewal History
                </CardTitle>
                <CardDescription>Past renewal performance and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerData.renewalHistory.map((renewal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{renewal.product}</h4>
                          <p className="text-sm text-gray-500">
                            Renewed on {new Date(renewal.renewalDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${renewal.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">
                          {renewal.daysToRenewal} days early
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Risk Assessment
                </CardTitle>
                <CardDescription>Customer risk factors and renewal probability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerData.riskFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{factor.factor}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${getScoreColor(factor.score)}`}>
                            {factor.status}
                          </span>
                          <Badge variant="outline" className={`${getRiskColor(factor.impact)} border-current`}>
                            {factor.impact}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={factor.score} className="flex-1" />
                        <span className="text-sm font-medium w-12">{factor.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Overall Risk Assessment</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Based on the analysis, this customer has a <strong>Low Risk</strong> profile 
                    with a <strong>92% renewal probability</strong>. Recommended action: Standard renewal process.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};