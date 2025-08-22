"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
import { ArrowLeft, BarChart3, TrendingUp, Award, Target, Users, DollarSign } from 'lucide-react';
import { ProtectedDashboardLayout } from "@/components/layouts/ProtectedDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const BenchmarkingPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('saas');
  const [detailedAnalysisOpen, setDetailedAnalysisOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Industry benchmarking data
  const industryBenchmarks = {
    saas: {
      name: 'SaaS & Software',
      companies: 1247,
      metrics: {
        avgGrowthRate: 28,
        avgChurnRate: 5.2,
        avgLTV: 3200,
        avgCAC: 186,
        avgMargins: 72
      }
    }
  };

  // Portfolio vs industry comparison
  const comparisonData = [
    { metric: 'Growth Rate', portfolio: 23, industry: 28, percentile: 65, target: 35 },
    { metric: 'Customer Retention', portfolio: 94.8, industry: 89.2, percentile: 78, target: 96 },
    { metric: 'LTV:CAC Ratio', portfolio: 4.2, industry: 3.8, percentile: 72, target: 5.0 },
    { metric: 'Gross Margins', portfolio: 75, industry: 72, percentile: 68, target: 80 },
    { metric: 'Revenue per Employee', portfolio: 185000, industry: 165000, percentile: 71, target: 200000 },
    { metric: 'Time to Payback', portfolio: 14, industry: 16, percentile: 76, target: 12 }
  ];

  // Company-specific benchmarking
  const companyBenchmarks = [
    {
      company: 'AI Dynamics',
      industry: 'AI/ML Software',
      percentile: 92,
      strengths: ['Revenue Growth', 'Customer Acquisition'],
      improvements: ['Operational Efficiency'],
      grade: 'A+',
      color: 'green'
    },
    {
      company: 'TechFlow Solutions',
      industry: 'Enterprise Software',
      percentile: 78,
      strengths: ['Customer Retention', 'Margins'],
      improvements: ['Growth Rate', 'Market Expansion'],
      grade: 'B+',
      color: 'blue'
    },
    {
      company: 'DataVault Inc',
      industry: 'Data Management',
      percentile: 65,
      strengths: ['Product Quality', 'Team Efficiency'],
      improvements: ['Sales Process', 'Marketing ROI'],
      grade: 'B',
      color: 'yellow'
    },
    {
      company: 'CloudScale Pro',
      industry: 'Cloud Infrastructure',
      percentile: 34,
      strengths: ['Technology Innovation'],
      improvements: ['Customer Success', 'Revenue Operations'],
      grade: 'C',
      color: 'orange'
    },
    {
      company: 'SecureNet Labs',
      industry: 'Cybersecurity',
      percentile: 12,
      strengths: ['Security Expertise'],
      improvements: ['Go-to-Market', 'Customer Retention', 'Product-Market Fit'],
      grade: 'D',
      color: 'red'
    }
  ];

  // Performance radar data for portfolio
  const radarData = [
    { metric: 'Growth', portfolio: 75, topQuartile: 90, industry: 65 },
    { metric: 'Efficiency', portfolio: 82, topQuartile: 95, industry: 70 },
    { metric: 'Profitability', portfolio: 78, topQuartile: 88, industry: 72 },
    { metric: 'Customer Success', portfolio: 85, topQuartile: 92, industry: 76 },
    { metric: 'Innovation', portfolio: 88, topQuartile: 94, industry: 68 },
    { metric: 'Market Position', portfolio: 72, topQuartile: 89, industry: 64 }
  ];

  // Trend analysis over time
  const trendData = [
    { quarter: 'Q1 2023', portfolioPercentile: 68, industryMedian: 50 },
    { quarter: 'Q2 2023', portfolioPercentile: 71, industryMedian: 50 },
    { quarter: 'Q3 2023', portfolioPercentile: 74, industryMedian: 50 },
    { quarter: 'Q4 2023', portfolioPercentile: 76, industryMedian: 50 },
    { quarter: 'Q1 2024', portfolioPercentile: 73, industryMedian: 50 },
    { quarter: 'Q2 2024', portfolioPercentile: 78, industryMedian: 50 }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': 
      case 'A': return 'bg-green-100 text-green-800';
      case 'B+': 
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': 
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPercentileColor = (percentile) => {
    if (percentile >= 90) return 'text-green-600';
    if (percentile >= 75) return 'text-blue-600';
    if (percentile >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ProtectedDashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/investor/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                Performance Benchmarking Center
              </h1>
              <p className="text-gray-600 mt-2">Industry-specific KPI analysis with 100+ benchmarks across {industryBenchmarks[selectedIndustry].companies.toLocaleString()} companies</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium">
                Custom Benchmarks
              </button>
              <button className="px-4 py-2 text-sm bg-green-50 text-green-600 hover:bg-green-100 rounded-lg font-medium">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-gold-500" />
                <Badge className="bg-blue-100 text-blue-800">Top 25%</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Overall Percentile</p>
                <p className="text-2xl font-bold text-blue-600">78th</p>
                <p className="text-sm text-green-600 mt-1">Above industry avg</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Performance Grade</p>
                <p className="text-2xl font-bold text-green-600">B+</p>
                <p className="text-sm text-gray-500 mt-1">Strong performance</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Companies Above Median</p>
                <p className="text-2xl font-bold text-purple-600">3/5</p>
                <p className="text-sm text-purple-600 mt-1">60% success rate</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Peer Group Size</p>
                <p className="text-2xl font-bold text-orange-600">{industryBenchmarks[selectedIndustry].companies.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Companies analyzed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics Comparison */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Portfolio vs Industry Benchmarks</CardTitle>
            <p className="text-sm text-gray-500">Key performance indicators compared to {selectedIndustry.toUpperCase()} industry standards</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-medium text-gray-900">Metric</th>
                    <th className="text-left p-4 font-medium text-gray-900">Portfolio Avg</th>
                    <th className="text-left p-4 font-medium text-gray-900">Industry Avg</th>
                    <th className="text-left p-4 font-medium text-gray-900">Percentile</th>
                    <th className="text-left p-4 font-medium text-gray-900">Target</th>
                    <th className="text-left p-4 font-medium text-gray-900">Gap to Target</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((metric, index) => {
                    const gapToTarget = ((metric.target - metric.portfolio) / metric.portfolio * 100);
                    const outperforming = metric.portfolio > metric.industry;
                    
                    return (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{metric.metric}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-gray-900">
                            {metric.metric.includes('Rate') || metric.metric.includes('Margins') || metric.metric.includes('Retention') 
                              ? `${metric.portfolio}%` 
                              : metric.metric.includes('Revenue') 
                                ? `$${(metric.portfolio / 1000).toFixed(0)}K`
                                : metric.metric.includes('Time')
                                  ? `${metric.portfolio} mo`
                                  : metric.portfolio.toFixed(1)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-600">
                            {metric.metric.includes('Rate') || metric.metric.includes('Margins') || metric.metric.includes('Retention') 
                              ? `${metric.industry}%` 
                              : metric.metric.includes('Revenue') 
                                ? `$${(metric.industry / 1000).toFixed(0)}K`
                                : metric.metric.includes('Time')
                                  ? `${metric.industry} mo`
                                  : metric.industry.toFixed(1)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`font-semibold ${getPercentileColor(metric.percentile)}`}>
                            {metric.percentile}th
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-blue-600">
                            {metric.metric.includes('Rate') || metric.metric.includes('Margins') || metric.metric.includes('Retention') 
                              ? `${metric.target}%` 
                              : metric.metric.includes('Revenue') 
                                ? `$${(metric.target / 1000).toFixed(0)}K`
                                : metric.metric.includes('Time')
                                  ? `${metric.target} mo`
                                  : metric.target.toFixed(1)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center gap-1 ${gapToTarget > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                            {gapToTarget > 0 ? (
                              <>
                                <TrendingUp className="w-4 h-4" />
                                <span className="font-medium">+{gapToTarget.toFixed(1)}%</span>
                              </>
                            ) : (
                              <>
                                <TrendingUp className="w-4 h-4 transform rotate-180" />
                                <span className="font-medium">Target met</span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Multi-Dimensional Performance</CardTitle>
              <p className="text-sm text-gray-500">Portfolio performance across key business dimensions</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Portfolio" dataKey="portfolio" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Radar name="Top Quartile" dataKey="topQuartile" stroke="#10B981" fill="transparent" strokeDasharray="5 5" />
                  <Radar name="Industry Avg" dataKey="industry" stroke="#6B7280" fill="transparent" strokeDasharray="2 2" />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Percentile Trend Analysis</CardTitle>
              <p className="text-sm text-gray-500">Portfolio performance evolution over time</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="quarter" axisLine={false} tickLine={false} />
                  <YAxis domain={[40, 85]} axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}th percentile`, name === 'portfolioPercentile' ? 'Portfolio' : 'Industry Median']}
                    contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="portfolioPercentile" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 0, r: 5 }} />
                  <Line type="monotone" dataKey="industryMedian" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Company-by-Company Analysis */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Individual Company Benchmarking</CardTitle>
            <p className="text-sm text-gray-500">Detailed performance analysis for each portfolio company</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {companyBenchmarks.map((company, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{company.company}</h3>
                      <p className="text-gray-600">{company.industry}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getGradeColor(company.grade)}>{company.grade}</Badge>
                      <p className={`text-sm font-medium mt-1 ${getPercentileColor(company.percentile)}`}>
                        {company.percentile}th percentile
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Key Strengths</h4>
                      <div className="space-y-1">
                        {company.strengths.map((strength, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2">Improvement Areas</h4>
                      <div className="space-y-1">
                        {company.improvements.map((improvement, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Dialog open={detailedAnalysisOpen} onOpenChange={setDetailedAnalysisOpen}>
                      <DialogTrigger asChild>
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                          onClick={() => setSelectedCompany(company)}
                        >
                          View Detailed Analysis
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[90vw] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                            Detailed Analysis: {selectedCompany?.company}
                          </DialogTitle>
                          <DialogDescription>
                            Comprehensive benchmarking analysis with industry comparisons and actionable insights
                          </DialogDescription>
                        </DialogHeader>

                        {selectedCompany && (
                          <div className="space-y-6">
                            {/* Performance Overview */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Overall Grade</p>
                                <p className={`text-2xl font-bold ${getPercentileColor(selectedCompany.percentile)}`}>
                                  {selectedCompany.grade}
                                </p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Percentile Rank</p>
                                <p className={`text-2xl font-bold ${getPercentileColor(selectedCompany.percentile)}`}>
                                  {selectedCompany.percentile}th
                                </p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Industry</p>
                                <p className="text-lg font-semibold text-gray-900">{selectedCompany.industry}</p>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Peer Group</p>
                                <p className="text-lg font-semibold text-blue-600">247 companies</p>
                              </div>
                            </div>

                            {/* Detailed Metrics Table */}
                            <Tabs defaultValue="metrics" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                                <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
                                <TabsTrigger value="actions">Action Plan</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="metrics" className="space-y-4">
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b border-gray-200">
                                        <th className="text-left p-3 font-medium">Metric</th>
                                        <th className="text-left p-3 font-medium">Current</th>
                                        <th className="text-left p-3 font-medium">Industry P50</th>
                                        <th className="text-left p-3 font-medium">Industry P75</th>
                                        <th className="text-left p-3 font-medium">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-b border-gray-100">
                                        <td className="p-3 font-medium">Revenue Growth</td>
                                        <td className="p-3">32%</td>
                                        <td className="p-3 text-gray-600">18%</td>
                                        <td className="p-3 text-gray-600">28%</td>
                                        <td className="p-3"><Badge className="bg-green-100 text-green-800">Excellent</Badge></td>
                                      </tr>
                                      <tr className="border-b border-gray-100">
                                        <td className="p-3 font-medium">Customer Retention</td>
                                        <td className="p-3">89%</td>
                                        <td className="p-3 text-gray-600">92%</td>
                                        <td className="p-3 text-gray-600">96%</td>
                                        <td className="p-3"><Badge className="bg-yellow-100 text-yellow-800">Below Avg</Badge></td>
                                      </tr>
                                      <tr className="border-b border-gray-100">
                                        <td className="p-3 font-medium">Gross Margins</td>
                                        <td className="p-3">74%</td>
                                        <td className="p-3 text-gray-600">68%</td>
                                        <td className="p-3 text-gray-600">78%</td>
                                        <td className="p-3"><Badge className="bg-blue-100 text-blue-800">Good</Badge></td>
                                      </tr>
                                      <tr className="border-b border-gray-100">
                                        <td className="p-3 font-medium">CAC Payback</td>
                                        <td className="p-3">16 months</td>
                                        <td className="p-3 text-gray-600">14 months</td>
                                        <td className="p-3 text-gray-600">11 months</td>
                                        <td className="p-3"><Badge className="bg-orange-100 text-orange-800">Needs Work</Badge></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="benchmarks" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-green-800">Top Quartile Performance</h4>
                                    {selectedCompany.strengths.map((strength, idx) => (
                                      <div key={idx} className="p-3 bg-green-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium text-green-800">{strength}</span>
                                          <Badge className="bg-green-100 text-green-800">Top 25%</Badge>
                                        </div>
                                        <p className="text-sm text-green-600 mt-1">
                                          {strength === 'Revenue Growth' ? 'Significantly outperforming peer average by 58%' :
                                           strength === 'Customer Acquisition' ? 'CAC efficiency 34% better than median' :
                                           strength === 'Customer Retention' ? 'Churn rate 45% lower than industry average' :
                                           strength === 'Margins' ? 'Gross margins exceed 75th percentile benchmark' :
                                           strength === 'Product Quality' ? 'NPS score in top 15% of peer group' :
                                           strength === 'Team Efficiency' ? 'Revenue per employee 42% above average' :
                                           strength === 'Technology Innovation' ? 'R&D spend optimization in top decile' :
                                           strength === 'Security Expertise' ? 'Security compliance exceeds industry standards' :
                                           'Strong performance indicator in this category'}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-orange-800">Improvement Opportunities</h4>
                                    {selectedCompany.improvements.map((improvement, idx) => (
                                      <div key={idx} className="p-3 bg-orange-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium text-orange-800">{improvement}</span>
                                          <Badge className="bg-orange-100 text-orange-800">Focus Area</Badge>
                                        </div>
                                        <p className="text-sm text-orange-600 mt-1">
                                          {improvement === 'Operational Efficiency' ? 'Operating margin 23% below industry median' :
                                           improvement === 'Growth Rate' ? 'YoY growth trailing peers by 18 percentage points' :
                                           improvement === 'Market Expansion' ? 'Geographic coverage gaps vs competitors' :
                                           improvement === 'Sales Process' ? 'Sales cycle 35% longer than peer average' :
                                           improvement === 'Marketing ROI' ? 'Customer acquisition cost 28% above benchmark' :
                                           improvement === 'Customer Success' ? 'Net retention rate below industry P25' :
                                           improvement === 'Revenue Operations' ? 'Revenue per customer 31% under potential' :
                                           improvement === 'Go-to-Market' ? 'Market penetration rate significantly below peers' :
                                           improvement === 'Customer Retention' ? 'Churn rate exceeding acceptable thresholds' :
                                           improvement === 'Product-Market Fit' ? 'Usage metrics indicate weak product adoption' :
                                           'Performance gap identified relative to industry standards'}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="actions" className="space-y-6">
                                <div className="space-y-4">
                                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                                    <h4 className="font-semibold text-red-800 mb-2">Immediate Actions (0-90 days)</h4>
                                    <ul className="space-y-2 text-sm text-red-700">
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                                        Implement customer success playbook to reduce churn by 15%
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                                        Launch pricing optimization study with target 8% margin improvement
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                                        Deploy sales acceleration tools to reduce cycle time by 20%
                                      </li>
                                    </ul>
                                  </div>
                                  
                                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                                    <h4 className="font-semibold text-yellow-800 mb-2">Strategic Initiatives (90-180 days)</h4>
                                    <ul className="space-y-2 text-sm text-yellow-700">
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                                        Launch expansion into 2 new geographic markets
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                                        Implement advanced analytics for customer behavior insights
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                                        Establish strategic partnerships for market expansion
                                      </li>
                                    </ul>
                                  </div>
                                  
                                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 mb-2">Long-term Goals (6-12 months)</h4>
                                    <ul className="space-y-2 text-sm text-blue-700">
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                        Achieve top quartile performance in customer retention (95%+)
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                        Target 75th percentile ranking across all key metrics
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                        Establish market leadership position in core segments
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="pt-4 border-t border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-900">Projected Impact</span>
                                    <div className="text-right">
                                      <p className="font-semibold text-green-600">+23 percentile improvement</p>
                                      <p className="text-sm text-gray-600">Expected within 12 months</p>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>
                        )}

                        <DialogFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setDetailedAnalysisOpen(false)}>
                            Close
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline">
                              Export Analysis
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              Create Action Plan
                            </Button>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Items & Recommendations */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Benchmarking Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Immediate Priorities</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800">SecureNet Labs</p>
                    <p className="text-xs text-red-600">Critical: Below 15th percentile</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">CloudScale Pro</p>
                    <p className="text-xs text-orange-600">Focus: Customer Success metrics</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Growth Opportunities</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">AI Dynamics</p>
                    <p className="text-xs text-green-600">Opportunity: Scale to top 5%</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">TechFlow Solutions</p>
                    <p className="text-xs text-blue-600">Focus: Growth acceleration</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Portfolio Goals</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Percentile</span>
                  <span className="font-semibold text-blue-600">85th</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeline</span>
                  <span className="font-semibold text-gray-600">12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">92%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedDashboardLayout>
  );
};

export default BenchmarkingPage;