"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  User, 
  Building2, 
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  FileText,
  Shield,
  Briefcase,
  Package,
  Target,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  X
} from 'lucide-react';
import type { Customer } from "@/types/customer";

interface CustomerProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

// Mock additional product data - in real implementation, this would come from your product API
const getCustomerProducts = (customerId: string) => ({
  activeProducts: [
    {
      id: 'PROD-001',
      name: 'Premium Business Account',
      category: 'Banking',
      status: 'Active',
      startDate: '2023-01-15',
      renewalDate: '2024-01-15',
      monthlyFee: 99.99,
      usage: 85,
      features: ['Priority Support', 'Advanced Analytics', 'API Access'],
      icon: Briefcase
    },
    {
      id: 'PROD-002',
      name: 'Business Insurance',
      category: 'Insurance',
      status: 'Active',
      startDate: '2023-03-01',
      renewalDate: '2024-03-01',
      monthlyFee: 150.00,
      usage: 60,
      features: ['General Liability', 'Property Coverage', '24/7 Claims'],
      icon: Shield
    },
    {
      id: 'PROD-003',
      name: 'Marketing Suite',
      category: 'Software',
      status: 'Trial',
      startDate: '2024-01-01',
      renewalDate: '2024-02-01',
      monthlyFee: 299.99,
      usage: 45,
      features: ['Email Marketing', 'Social Media Tools', 'Analytics Dashboard'],
      icon: TrendingUp
    }
  ],
  recommendedProducts: [
    {
      id: 'PROD-REC-001',
      name: 'Advanced Security Package',
      category: 'Security',
      description: 'Enhanced security features for your business',
      monthlyFee: 49.99,
      features: ['Multi-factor Authentication', 'Advanced Encryption', 'Security Monitoring'],
      reason: 'Based on your business profile and current products',
      match: 92,
      icon: Shield
    },
    {
      id: 'PROD-REC-002',
      name: 'Enterprise Analytics',
      category: 'Analytics',
      description: 'Advanced business intelligence and reporting',
      monthlyFee: 199.99,
      features: ['Custom Dashboards', 'Predictive Analytics', 'Data Export'],
      reason: 'High usage of current analytics features suggests need for upgrade',
      match: 88,
      icon: TrendingUp
    }
  ],
  productHistory: [
    {
      id: 'PROD-HIST-001',
      name: 'Basic Business Account',
      category: 'Banking',
      status: 'Upgraded',
      period: 'Jan 2022 - Jan 2023',
      totalSpent: 1200.00,
      reason: 'Upgraded to Premium'
    },
    {
      id: 'PROD-HIST-002',
      name: 'Starter Marketing Tools',
      category: 'Software',
      status: 'Cancelled',
      period: 'Jun 2022 - Dec 2022',
      totalSpent: 600.00,
      reason: 'Replaced with Marketing Suite'
    }
  ],
  usageAnalytics: {
    totalSpent: 5499.97,
    monthlyAverage: 549.97,
    mostUsedProduct: 'Premium Business Account',
    leastUsedProduct: 'Marketing Suite',
    renewalRate: 95,
    customerSatisfaction: 4.8
  }
});

export const CustomerProductsModal: React.FC<CustomerProductsModalProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const [activeTab, setActiveTab] = useState("active");
  const productData = getCustomerProducts(customer.id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'trial': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'expired': return 'bg-red-100 text-red-700 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'upgraded': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'text-green-600';
    if (usage >= 50) return 'text-blue-600';
    if (usage >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'text-green-600';
    if (match >= 80) return 'text-blue-600';
    if (match >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Products & Services - {customer.fullName}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Products</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4">
              {productData.activeProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.category} • {product.id}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Fee</p>
                          <p className="font-semibold text-lg">{formatCurrency(product.monthlyFee)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="font-medium">{formatDate(product.startDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Renewal Date</p>
                          <p className="font-medium">{formatDate(product.renewalDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Usage</p>
                          <div className="flex items-center gap-2">
                            <Progress value={product.usage} className="flex-1" />
                            <span className={`text-sm font-medium ${getUsageColor(product.usage)}`}>
                              {product.usage}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Features</p>
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm">
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid gap-4">
              {productData.recommendedProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <Card key={product.id} className="border-dashed border-2 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getMatchColor(product.match)}`}>
                            {product.match}% Match
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {formatCurrency(product.monthlyFee)}/mo
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{product.description}</p>

                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Why this recommendation?</span>
                        </div>
                        <p className="text-sm text-blue-700">{product.reason}</p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-gray-700">Key Features</p>
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Product
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Product History
                </CardTitle>
                <CardDescription>Previous products and services used by the customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productData.productHistory.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Package className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.category} • {product.period}</p>
                          <p className="text-xs text-gray-500">{product.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(product.totalSpent)}</div>
                        <Badge className={getStatusColor(product.status)} variant="outline">
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Spent</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(productData.usageAnalytics.totalSpent)}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Average</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(productData.usageAnalytics.monthlyAverage)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Renewal Rate</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {productData.usageAnalytics.renewalRate}%
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Satisfaction</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {productData.usageAnalytics.customerSatisfaction}/5
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Usage Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Most Used Product</span>
                      <span className="text-sm text-green-600">High Usage</span>
                    </div>
                    <p className="font-medium">{productData.usageAnalytics.mostUsedProduct}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Least Used Product</span>
                      <span className="text-sm text-orange-600">Low Usage</span>
                    </div>
                    <p className="font-medium">{productData.usageAnalytics.leastUsedProduct}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">High Engagement</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Customer shows high product engagement and satisfaction.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Upsell Opportunity</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Consider presenting premium features or additional products.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};