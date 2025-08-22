"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  DollarSign, 
  BarChart3,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Upload,
  UserPlus
} from "lucide-react";
import { agentKPIData, pipelineStages, recentActivities, todayTasks } from "@/lib/data/agentData";
import { useAuth } from "@/app/authContext";
import { AddNewLeadModal } from "@/components/leads/AddNewLeadModal";
import { ImportDataModal } from "@/components/dashboard/ImportDataModal";

function KPICard({ 
  title, 
  value, 
  trend, 
  target, 
  icon: Icon, 
  format = "number",
  currency = "INR" 
}: {
  title: string;
  value: number;
  trend: number;
  target?: number;
  icon: any;
  format?: "number" | "percentage" | "currency";
  currency?: string;
}) {
  const formatValue = (val: number) => {
    switch (format) {
      case "percentage":
        return `${val}%`;
      case "currency":
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        return `₹${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  };

  const isPositiveTrend = trend > 0;
  const TrendIcon = isPositiveTrend ? ArrowUp : ArrowDown;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        <div className="flex items-center justify-between mt-2">
          <div className={`flex items-center text-xs ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
            <TrendIcon className="h-3 w-3 mr-1" />
            {Math.abs(trend)}% from yesterday
          </div>
          {target && (
            <div className="text-xs text-gray-500">
              Target: {formatValue(target)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function PipelineFunnel() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Pipeline Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pipelineStages.map((stage, index) => (
            <div key={stage.id} className="relative">
              <div className="flex items-center justify-between p-4 rounded-lg border" style={{ borderLeftColor: stage.color, borderLeftWidth: '4px' }}>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                    <Badge variant="secondary">{stage.count} leads</Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                    <span>Value: ₹{(stage.value / 100000).toFixed(1)}L</span>
                    <span>Conv. Rate: {stage.conversionRate}%</span>
                    <span>Avg. Days: {stage.averageDays}</span>
                  </div>
                </div>
              </div>
              {index < pipelineStages.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowDown className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead_created': return <Users className="h-4 w-4" />;
      case 'application_submitted': return <FileText className="h-4 w-4" />;
      case 'call_scheduled': return <Phone className="h-4 w-4" />;
      case 'email_sent': return <Mail className="h-4 w-4" />;
      case 'deal_closed': return <CheckCircle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className="flex-shrink-0 p-2 rounded-full bg-blue-100 text-blue-600">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                {activity.contactName && (
                  <Badge variant="outline" className="text-xs">{activity.contactName}</Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function TaskList() {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'visit': return <MapPin className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'follow_up': return <Target className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDueTime = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) return 'Overdue';
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Today's Tasks
          <Badge variant="secondary">{todayTasks.filter(t => !t.completed).length} pending</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {todayTasks.map((task) => (
          <div key={task.id} className={`flex items-start space-x-3 p-3 rounded-lg border ${task.completed ? 'bg-gray-50 opacity-75' : 'hover:bg-gray-50'}`}>
            <div className={`flex-shrink-0 p-2 rounded-full ${task.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
              {task.completed ? <CheckCircle className="h-4 w-4" /> : getTaskIcon(task.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </p>
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{formatDueTime(task.dueDate)}</span>
                </div>
                {task.contactName && (
                  <Badge variant="outline" className="text-xs">{task.contactName}</Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function AgentDashboard() {
  const dashboardTitle = 'Dashboard Overview';
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showImportDataModal, setShowImportDataModal] = useState(false);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  const handleLeadAdded = (leadData: any) => {
    // Add the new lead to recent leads list
    setRecentLeads(prev => [leadData, ...prev.slice(0, 4)]); // Keep only last 5 leads
    
    // You could also trigger a notification here
    console.log('New lead added:', leadData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{dashboardTitle}</h1>
        <div className="flex space-x-2">
          <Button type="button" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button type="button" variant="outline" onClick={(e) => { e.preventDefault(); setShowImportDataModal(true); }}>
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
          <Button type="button" onClick={(e) => { e.preventDefault(); setShowAddLeadModal(true); }}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Leads Today"
          value={agentKPIData.leadsToday.value}
          trend={agentKPIData.leadsToday.trend}
          target={agentKPIData.leadsToday.target}
          icon={Users}
        />
        <KPICard
          title="Applications Submitted"
          value={agentKPIData.applicationsSubmitted.value}
          trend={agentKPIData.applicationsSubmitted.trend}
          icon={FileText}
        />
        <KPICard
          title="Conversion Rate"
          value={agentKPIData.conversionRate.value}
          trend={agentKPIData.conversionRate.trend}
          target={agentKPIData.conversionRate.target}
          icon={Target}
          format="percentage"
        />
        <KPICard
          title="Total Disbursed"
          value={agentKPIData.totalDisbursed.value}
          trend={agentKPIData.totalDisbursed.trend}
          icon={DollarSign}
          format="currency"
        />
        <KPICard
          title="Pipeline Value"
          value={agentKPIData.pipelineValue.value}
          trend={agentKPIData.pipelineValue.trend}
          icon={BarChart3}
          format="currency"
        />
        <KPICard
          title="Response Rate"
          value={agentKPIData.responseRate.value}
          trend={agentKPIData.responseRate.trend}
          target={agentKPIData.responseRate.target}
          icon={TrendingUp}
          format="percentage"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PipelineFunnel />
        <div className="space-y-6">
          <ActivityFeed />
          <TaskList />
        </div>
      </div>

      {/* Modals */}
      <AddNewLeadModal 
        isOpen={showAddLeadModal}
        onClose={() => setShowAddLeadModal(false)}
        onLeadAdded={handleLeadAdded}
      />
      
      <ImportDataModal 
        isOpen={showImportDataModal}
        onClose={() => setShowImportDataModal(false)}
      />
    </div>
  );
}