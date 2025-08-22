"use client";

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Users, Target, Activity, Brain, BarChart3, Workflow, Settings, Shield, Clock, Layers, RefreshCw } from 'lucide-react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projectsList } from "@/lib/data/projectsData";
import Link from "next/link";

const InvestmentPortfolioDashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState('TechFlow Solutions');
  const [selectedProject, setSelectedProject] = useState('all');

  // Generate dynamic data based on selected project with enhanced investor metrics
  const getDynamicPortfolioData = useMemo(() => {
    if (selectedProject === 'all') {
      return [
        { company: 'TechFlow Solutions', health: 85, pipeline: '$2.4M', growth: 23, risk: 'low', status: 'healthy', project: 'CDP-001', aiScore: 92, predictiveGrowth: 28, benchmark: 'Above Market' },
        { company: 'DataVault Inc', health: 72, pipeline: '$1.8M', growth: 15, risk: 'medium', status: 'watch', project: 'BANK-001', aiScore: 78, predictiveGrowth: 18, benchmark: 'Market Average' },
        { company: 'CloudScale Pro', health: 45, pipeline: '$890K', growth: -8, risk: 'high', status: 'intervention', project: 'ECOM-001', aiScore: 45, predictiveGrowth: -12, benchmark: 'Below Market' },
        { company: 'AI Dynamics', health: 91, pipeline: '$3.2M', growth: 34, risk: 'low', status: 'healthy', project: 'UNIV-001', aiScore: 95, predictiveGrowth: 42, benchmark: 'Top Quartile' },
        { company: 'SecureNet Labs', health: 38, pipeline: '$650K', growth: -15, risk: 'critical', status: 'urgent', project: 'CDP-001', aiScore: 32, predictiveGrowth: -25, benchmark: 'Bottom Quartile' }
      ];
    }
    
    const projectData = projectsList.find(p => p.id === selectedProject);
    if (!projectData) return [];
    
    // Generate project-specific company data
    switch (selectedProject) {
      case 'CDP-001':
        return [
          { company: 'TechFlow Solutions', health: projectData.progress, pipeline: '$2.4M', growth: 23, risk: 'low', status: 'healthy', project: selectedProject },
          { company: 'SecureNet Labs', health: 38, pipeline: '$650K', growth: -15, risk: 'critical', status: 'urgent', project: selectedProject }
        ];
      case 'BANK-001':
        return [
          { company: 'DataVault Inc', health: projectData.progress, pipeline: '$1.8M', growth: 15, risk: 'medium', status: 'watch', project: selectedProject }
        ];
      case 'ECOM-001':
        return [
          { company: 'CloudScale Pro', health: projectData.progress, pipeline: '$890K', growth: -8, risk: 'high', status: 'intervention', project: selectedProject }
        ];
      case 'UNIV-001':
        return [
          { company: 'AI Dynamics', health: projectData.progress, pipeline: '$3.2M', growth: 34, risk: 'low', status: 'healthy', project: selectedProject }
        ];
      default:
        return [];
    }
  }, [selectedProject]);

  const portfolioData = getDynamicPortfolioData;

  // Generate dynamic metrics based on selected project
  const getDynamicMetrics = useMemo(() => {
    if (selectedProject === 'all') {
      return {
        totalPipeline: '$8.94M',
        companiesAtRisk: 2,
        avgHealthScore: 66.2,
        portfolioCompanies: 5,
        pipelineChange: 12.3,
        healthChange: -5.2
      };
    }
    
    const projectData = projectsList.find(p => p.id === selectedProject);
    const projectPortfolio = getDynamicPortfolioData;
    
    if (!projectData || !projectPortfolio.length) {
      return {
        totalPipeline: '$0M',
        companiesAtRisk: 0,
        avgHealthScore: 0,
        portfolioCompanies: 0,
        pipelineChange: 0,
        healthChange: 0
      };
    }
    
    // Calculate project-specific metrics
    const totalPipelineValue = projectPortfolio.reduce((sum, company) => {
      const value = Number.parseFloat(company.pipeline.replace(/[$M,]/g, ''));
      return sum + value;
    }, 0);
    
    const avgHealth = projectPortfolio.reduce((sum, company) => sum + company.health, 0) / projectPortfolio.length;
    const companiesAtRisk = projectPortfolio.filter(company => 
      company.status === 'urgent' || company.status === 'intervention'
    ).length;
    
    return {
      totalPipeline: `$${totalPipelineValue.toFixed(1)}M`,
      companiesAtRisk,
      avgHealthScore: avgHealth.toFixed(1),
      portfolioCompanies: projectPortfolio.length,
      pipelineChange: projectData.conversionRate || 12.3,
      healthChange: projectData.progress > 80 ? 8.5 : -3.2
    };
  }, [selectedProject, getDynamicPortfolioData]);

  // Sales Funnel Data for Selected Company
  const funnelData = [
    { stage: 'Leads', current: 1240, target: 1500, conversion: 12 },
    { stage: 'Qualified', current: 148, target: 180, conversion: 32 },
    { stage: 'Proposal', current: 47, target: 58, conversion: 45 },
    { stage: 'Negotiation', current: 21, target: 26, conversion: 67 },
    { stage: 'Closed Won', current: 14, target: 17, conversion: 85 }
  ];

  // Growth Trend Data
  const growthTrendData = [
    { month: 'Jan', actual: 125, projected: 130, pipeline: 980 },
    { month: 'Feb', actual: 142, projected: 145, pipeline: 1120 },
    { month: 'Mar', actual: 138, projected: 165, pipeline: 1050 },
    { month: 'Apr', actual: 156, projected: 180, pipeline: 1340 },
    { month: 'May', actual: 149, projected: 195, pipeline: 1180 },
    { month: 'Jun', actual: 167, projected: 210, pipeline: 1450 }
  ];

  // Risk Distribution
  const riskData = [
    { name: 'Healthy', value: 40, color: '#10B981' },
    { name: 'Watch', value: 20, color: '#F59E0B' },
    { name: 'Intervention', value: 20, color: '#EF4444' },
    { name: 'Critical', value: 20, color: '#DC2626' }
  ];

  const getHealthColor = (health) => {
    if (health >= 80) return 'text-green-600 bg-green-50';
    if (health >= 60) return 'text-yellow-600 bg-yellow-50';
    if (health >= 40) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'watch': return <Activity className="w-5 h-5 text-yellow-500" />;
      case 'intervention': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <StaticExportLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer360 Investor Intelligence Platform</h1>
              <p className="text-gray-600 mt-2">Data-driven portfolio management with predictive insights and automated reporting</p>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Filter by Project</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projectsList.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name} ({project.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Enhanced Investor Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
                <p className="text-3xl font-bold text-gray-900">{getDynamicMetrics.totalPipeline}</p>
                <p className={`text-sm flex items-center mt-1 ${getDynamicMetrics.pipelineChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {getDynamicMetrics.pipelineChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {getDynamicMetrics.pipelineChange >= 0 ? '+' : ''}{getDynamicMetrics.pipelineChange}% QoQ Growth
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Risk Alerts</p>
                <p className="text-3xl font-bold text-red-600">{getDynamicMetrics.companiesAtRisk}</p>
                <p className="text-sm text-red-600">
                  {getDynamicMetrics.companiesAtRisk > 0 ? 'Predictive signals detected' : 'Portfolio stable'}
                </p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Portfolio Health Score</p>
                <p className="text-3xl font-bold text-gray-900">{getDynamicMetrics.avgHealthScore}</p>
                <p className={`text-sm flex items-center mt-1 ${getDynamicMetrics.healthChange >= 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {getDynamicMetrics.healthChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  AI-driven benchmark score
                </p>
              </div>
              <Target className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {selectedProject === 'all' ? 'Portfolio Companies' : 'Project Companies'}
                </p>
                <p className="text-3xl font-bold text-gray-900">{getDynamicMetrics.portfolioCompanies}</p>
                <p className="text-sm text-green-600">
                  {selectedProject !== 'all' ? `In ${projectsList.find(p => p.id === selectedProject)?.name || 'project'}` : '2 outperforming targets'}
                </p>
              </div>
              <Users className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Data-Driven Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Predictive Intelligence
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">AI Risk Score</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-green-600">Low Risk</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Early Warning Signals</span>
                <span className="font-semibold text-gray-900">2 Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Growth Opportunities</span>
                <span className="font-semibold text-blue-600">3 Identified</span>
              </div>
              <div className="pt-2 border-t">
                <Link href="/investor/dashboard/predictive" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Detailed Analysis →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Performance Benchmarking
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Industry Percentile</span>
                <span className="font-semibold text-green-600">Top 25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Peer Comparison</span>
                <span className="font-semibold text-blue-600">Above Average</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Market Position</span>
                <span className="font-semibold text-purple-600">Strong</span>
              </div>
              <div className="pt-2 border-t">
                <Link href="/investor/dashboard/benchmarking" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Benchmark Report →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-orange-600" />
              Operations Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data Integration</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Automated Reporting</span>
                <span className="font-semibold text-gray-900">24/7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Security Compliance</span>
                <span className="font-semibold text-green-600">100%</span>
              </div>
              <div className="pt-2 border-t">
                <Link href="/investor/dashboard/operations" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Operations Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Portfolio Overview Table */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedProject === 'all' ? 'Portfolio Intelligence Dashboard' : 
                   `${projectsList.find(p => p.id === selectedProject)?.name || 'Project'} Intelligence Overview`}
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedProject === 'all' ? 'Real-time monitoring with predictive insights and automated anomaly detection' :
                   `Data-driven analysis for ${projectsList.find(p => p.id === selectedProject)?.name || 'project'} portfolio companies`}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium">
                  Export Report
                </button>
                <button className="px-4 py-2 text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg font-medium">
                  AI Insights
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-900">Company</th>
                  <th className="text-left p-4 font-medium text-gray-900">Health Score</th>
                  <th className="text-left p-4 font-medium text-gray-900">Portfolio Value</th>
                  <th className="text-left p-4 font-medium text-gray-900">Growth Rate</th>
                  <th className="text-left p-4 font-medium text-gray-900">AI Score</th>
                  <th className="text-left p-4 font-medium text-gray-900">Benchmark</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Action Required</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((company, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedCompany === company.company ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedCompany(company.company)}
                  >
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{company.company}</div>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(company.health)}`}>
                        {company.health}/100
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{company.pipeline}</div>
                    </td>
                    <td className="p-4">
                      <div className={`flex items-center ${company.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {company.growth >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                        {company.growth}%
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${company.aiScore >= 90 ? 'text-green-600 bg-green-50' : company.aiScore >= 70 ? 'text-blue-600 bg-blue-50' : company.aiScore >= 50 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
                        {company.aiScore}/100
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        company.benchmark === 'Top Quartile' ? 'text-green-600 bg-green-50' :
                        company.benchmark === 'Above Market' ? 'text-blue-600 bg-blue-50' :
                        company.benchmark === 'Market Average' ? 'text-yellow-600 bg-yellow-50' :
                        'text-red-600 bg-red-50'
                      }`}>
                        {company.benchmark}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        {getStatusIcon(company.status)}
                        <span className="ml-2 capitalize">{company.status}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {company.status === 'urgent' && (
                        <button className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-200">
                          Immediate Review
                        </button>
                      )}
                      {company.status === 'intervention' && (
                        <button className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-orange-200">
                          Schedule Meeting
                        </button>
                      )}
                      {company.status === 'watch' && (
                        <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-200">
                          Monitor Closely
                        </button>
                      )}
                      {company.status === 'healthy' && (
                        <span className="text-green-600 text-sm">On Track</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Analytics for Selected Company */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Funnel Analysis */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedCompany} - Sales Funnel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#3B82F6" name="Current" />
                <Bar dataKey="target" fill="#E5E7EB" name="Target" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Alert: Lead generation 17% below target</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">Recommend increasing marketing spend by $50K this quarter</p>
            </div>
          </div>

          {/* Growth Trend */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trajectory vs Projections</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={3} name="Actual Revenue ($K)" />
                <Line type="monotone" dataKey="projected" stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2} name="Projected ($K)" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-sm font-medium text-red-800">Performance Gap: 23% below projection</span>
              </div>
              <p className="text-sm text-red-700 mt-1">Intervention recommended: Sales team expansion or process optimization</p>
            </div>
          </div>
        </div>

        {/* Portfolio Risk Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                <h4 className="font-medium text-red-800">Critical: SecureNet Labs</h4>
                <p className="text-red-700 text-sm mt-1">Pipeline down 43% - Schedule emergency board meeting</p>
                <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700">
                  Schedule Meeting
                </button>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <h4 className="font-medium text-orange-800">Intervention: CloudScale Pro</h4>
                <p className="text-orange-700 text-sm mt-1">Consider $200K marketing injection for Q4 pipeline recovery</p>
                <button className="mt-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700">
                  Review Budget
                </button>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h4 className="font-medium text-green-800">Opportunity: AI Dynamics</h4>
                <p className="text-green-700 text-sm mt-1">Exceeding targets - Consider follow-on investment</p>
                <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                  Explore Follow-on
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MarTech & Operations Excellence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              MarTech Integration Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">CRM Systems</span>
                </div>
                <span className="text-sm text-green-600 font-medium">5/5 Connected</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Marketing Automation</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">Real-time Sync</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Revenue Operations</span>
                </div>
                <span className="text-sm text-purple-600 font-medium">Optimized</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Enterprise Security & Compliance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">SOC 2 Type II Compliance</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-green-600">Certified</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data Encryption</span>
                <span className="font-semibold text-gray-900">AES-256</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Access Controls</span>
                <span className="font-semibold text-blue-600">Role-based</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Audit Logging</span>
                <span className="font-semibold text-green-600">24/7 Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rapid Implementation & Collaboration */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Implementation & Collaboration Status
            </h3>
            <p className="text-sm text-gray-500 mt-1">2-3 week rapid deployment with seamless team collaboration</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Data Integration</h4>
              <p className="text-sm text-gray-600 mt-1">Complete in 5 days</p>
              <p className="text-xs text-green-600 font-medium mt-1">✓ Deployed</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Team Onboarding</h4>
              <p className="text-sm text-gray-600 mt-1">Dedicated support</p>
              <p className="text-xs text-blue-600 font-medium mt-1">Active</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Collaboration Tools</h4>
              <p className="text-sm text-gray-600 mt-1">Multi-stakeholder access</p>
              <p className="text-xs text-purple-600 font-medium mt-1">Configured</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Seamless Integration</h4>
              <p className="text-sm text-gray-600 mt-1">50+ connectors</p>
              <p className="text-xs text-orange-600 font-medium mt-1">Ready</p>
            </div>
          </div>
        </div>
      </div>
    </StaticExportLayout>
  );
};

export default InvestmentPortfolioDashboard;