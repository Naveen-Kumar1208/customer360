"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  Activity,
  Clock,
  Target,
  Users,
  Zap
} from 'lucide-react';
import type { UsageData } from '@/types/lusha';
import { mockUsageData } from '@/lib/data/lusha-mock';

interface UsageAnalyticsChartProps {
  data?: UsageData;
  className?: string;
}

type ChartType = 'line' | 'bar' | 'pie' | 'area';
type TimeRange = '7d' | '30d' | '90d' | 'all';
type MetricType = 'total' | 'person' | 'company' | 'prospect';

interface ChartData {
  name: string;
  value: number;
  date?: string;
  person?: number;
  company?: number;
  prospect?: number;
  total?: number;
}

export function UsageAnalyticsChart({ 
  data = mockUsageData, 
  className 
}: UsageAnalyticsChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [metricType, setMetricType] = useState<MetricType>('total');
  const [selectedDataPoint, setSelectedDataPoint] = useState<ChartData | null>(null);

  // Process data based on selected time range
  const chartData = useMemo(() => {
    let sourceData = data.dailyUsage;
    
    switch (timeRange) {
      case '7d':
        sourceData = data.dailyUsage.slice(-7);
        break;
      case '30d':
        sourceData = data.dailyUsage.slice(-30);
        break;
      case '90d':
        sourceData = data.dailyUsage;
        break;
      case 'all':
        sourceData = data.dailyUsage;
        break;
    }

    return sourceData.map(item => ({
      name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      date: item.date,
      value: item[metricType] || item.total,
      person: item.person,
      company: item.company,
      prospect: item.prospect,
      total: item.total
    }));
  }, [data, timeRange, metricType]);

  // Calculate analytics
  const totalUsage = chartData.reduce((sum, item) => sum + item.value, 0);
  const averageDaily = totalUsage / chartData.length;
  const maxUsage = Math.max(...chartData.map(item => item.value));
  const minUsage = Math.min(...chartData.map(item => item.value));
  
  // Calculate trend
  const firstHalf = chartData.slice(0, Math.floor(chartData.length / 2));
  const secondHalf = chartData.slice(Math.floor(chartData.length / 2));
  const firstHalfAvg = firstHalf.reduce((sum, item) => sum + item.value, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, item) => sum + item.value, 0) / secondHalf.length;
  const trend = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;

  // Feature distribution data
  const featureData = data.topFeatures.map(feature => ({
    name: feature.feature.replace(' Enrichment', '').replace(' Intelligence', ''),
    value: feature.usage,
    percentage: feature.percentage
  }));

  const getMetricColor = (metric: MetricType) => {
    const colors = {
      total: '#3b82f6',
      person: '#10b981',
      company: '#f59e0b',
      prospect: '#8b5cf6'
    };
    return colors[metric];
  };

  const getMetricLabel = (metric: MetricType) => {
    const labels = {
      total: 'Total Usage',
      person: 'Person Enrichment',
      company: 'Company Intelligence',
      prospect: 'Prospecting'
    };
    return labels[metric];
  };

  // Mock chart visualization components
  const LineChartViz = ({ data }: { data: ChartData[] }) => (
    <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-end justify-around p-6 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm transition-all hover:from-blue-600 hover:to-blue-400 cursor-pointer"
              style={{ 
                height: `${(item.value / Math.max(...data.map(d => d.value))) * 200}px`,
                minHeight: '8px'
              }}
              onClick={() => setSelectedDataPoint(item)}
            />
            <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      
      <div className="absolute top-4 left-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
          <h4 className="font-semibold text-gray-900">{getMetricLabel(metricType)}</h4>
          <p className="text-sm text-gray-600">Interactive line chart</p>
        </div>
      </div>
    </div>
  );

  const BarChartViz = ({ data }: { data: ChartData[] }) => (
    <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 flex items-end justify-around space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1 h-full">
          <div className="flex-1 flex items-end">
            <div
              className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-sm transition-all hover:from-green-600 hover:to-green-400 cursor-pointer"
              style={{ 
                height: `${(item.value / Math.max(...data.map(d => d.value))) * 80}%`,
                minHeight: '8px'
              }}
              onClick={() => setSelectedDataPoint(item)}
            />
          </div>
          <span className="text-xs text-gray-600 mt-2 truncate">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );

  const PieChartViz = ({ data }: { data: Array<{ name: string; value: number; percentage: number }> }) => (
    <div className="h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 flex items-center justify-center">
      <div className="relative">
        <div className="w-64 h-64 rounded-full bg-gradient-conic from-blue-500 via-purple-500 via-pink-500 via-yellow-500 to-blue-500 p-4">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalUsage.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Credits</p>
            </div>
          </div>
        </div>
        
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ 
                  backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'][index % 4] 
                }}
              />
              <div>
                <p className="text-xs font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AreaChartViz = ({ data }: { data: ChartData[] }) => (
    <div className="h-80 bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-lg p-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-end justify-around p-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="relative w-full">
              <div
                className="w-full bg-gradient-to-t from-indigo-500/60 to-indigo-300/40 rounded-t-sm transition-all hover:from-indigo-600/70 hover:to-indigo-400/50 cursor-pointer"
                style={{ 
                  height: `${(item.value / Math.max(...data.map(d => d.value))) * 200}px`,
                  minHeight: '8px'
                }}
                onClick={() => setSelectedDataPoint(item)}
              />
              {index < data.length - 1 && (
                <div className="absolute top-0 right-0 w-full h-1 bg-indigo-400/30 transform translate-x-1/2" />
              )}
            </div>
            <span className="text-xs text-gray-600 mt-2">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-blue-600">{totalUsage.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Average</p>
                <p className="text-2xl font-bold text-green-600">{Math.round(averageDaily)}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Usage</p>
                <p className="text-2xl font-bold text-purple-600">{maxUsage}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trend</p>
                <div className="flex items-center space-x-1">
                  {trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-xl font-bold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(trend).toFixed(1)}%
                  </span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Usage Analytics
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={metricType} onValueChange={(value: MetricType) => setMetricType(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="total">Total Usage</SelectItem>
                  <SelectItem value="person">Person Enrichment</SelectItem>
                  <SelectItem value="company">Company Intelligence</SelectItem>
                  <SelectItem value="prospect">Prospecting</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chart Type Selector */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm font-medium text-gray-600">Chart Type:</span>
            {[
              { type: 'line' as ChartType, icon: <LineChart className="h-4 w-4" />, label: 'Line' },
              { type: 'bar' as ChartType, icon: <BarChart3 className="h-4 w-4" />, label: 'Bar' },
              { type: 'pie' as ChartType, icon: <PieChart className="h-4 w-4" />, label: 'Pie' },
              { type: 'area' as ChartType, icon: <Activity className="h-4 w-4" />, label: 'Area' }
            ].map((chart) => (
              <Button
                key={chart.type}
                variant={chartType === chart.type ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType(chart.type)}
                className="flex items-center space-x-1"
              >
                {chart.icon}
                <span>{chart.label}</span>
              </Button>
            ))}
          </div>

          {/* Chart Visualization */}
          <div className="relative">
            {chartType === 'line' && <LineChartViz data={chartData} />}
            {chartType === 'bar' && <BarChartViz data={chartData} />}
            {chartType === 'pie' && <PieChartViz data={featureData} />}
            {chartType === 'area' && <AreaChartViz data={chartData} />}
            
            {/* Data Point Details */}
            {selectedDataPoint && chartType !== 'pie' && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border rounded-lg p-4 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedDataPoint.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{selectedDataPoint.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Person:</span>
                    <span className="font-medium">{selectedDataPoint.person}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-medium">{selectedDataPoint.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prospect:</span>
                    <span className="font-medium">{selectedDataPoint.prospect}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDataPoint(null)}
                  className="mt-2 w-full"
                >
                  Close
                </Button>
              </div>
            )}
          </div>

          {/* Chart Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {getMetricLabel(metricType).toLowerCase()} for {timeRange === '7d' ? 'last 7 days' : timeRange === '30d' ? 'last 30 days' : timeRange === '90d' ? 'last 90 days' : 'all time'}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedDataPoint(null)}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Success Rate Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Success Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{data.successRate}%</div>
                <p className="text-gray-600">Average Success Rate</p>
                <div className="mt-4 flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">+2.1% vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{data.averageResponseTime}s</div>
                <p className="text-gray-600">Average Response Time</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-green-600">0.8s</p>
                    <p className="text-gray-500">Best</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-blue-600">{data.averageResponseTime}s</p>
                    <p className="text-gray-500">Average</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-red-600">3.2s</p>
                    <p className="text-gray-500">Worst</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UsageAnalyticsChart;