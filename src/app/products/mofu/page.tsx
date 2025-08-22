"use client";

import React, { useState, useEffect, useRef } from 'react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { MofuLeadsTab } from '@/components/products/mofu/MofuLeadsTab';
import { FunnelNavigation } from '@/components/products/FunnelNavigation';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MofuPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for metrics with animation
  const [metrics, setMetrics] = useState({
    leadConversionRate: 0,
    mqlCount: 0,
    costPerLead: 0
  });
  
  // State for chart data
  const [chartData, setChartData] = useState({
    mqlTrend: null,
    mqlSource: null,
    emailPerformance: null,
    contentEngagement: null,
    leadScore: null,
    cplChannel: null
  });
  
  // Loading state
  const [loading, setLoading] = useState(true);
  
  // Initialize data and animations on component mount
  useEffect(() => {
    // Hide loading overlay after everything is loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    // Animate metrics
    const metricTimer = setTimeout(() => {
      animateMetrics();
      initializeCharts();
      
      // Animate funnel bars
      setTimeout(() => {
        const funnelBars = document.querySelectorAll('.funnel-bar');
        funnelBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
        });
      }, 1000);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(metricTimer);
    };
  }, []);
  
  // Handle tab switching
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Re-animate elements in the newly active tab
    setTimeout(() => {
      const progressBars = document.querySelectorAll('.funnel-bar');
      progressBars.forEach(bar => {
        bar.style.width = '0%';
        setTimeout(() => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
        }, 100);
      });
    }, 50);
  };
  
  // Animate metrics
  const animateMetrics = () => {
    animateCounter('leadConversionRate', 0, 3.2, 2000, 1);
    animateCounter('mqlCount', 0, 2265, 2000, 0);
    animateCounter('costPerLead', 0, 38.75, 2000, 2);
  };
  
  // Helper function to animate counters
  const animateCounter = (metricName, start, end, duration, decimals = 0) => {
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Use easeOutExpo for smoother animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = start + easedProgress * (end - start);
      
      setMetrics(prev => ({
        ...prev,
        [metricName]: currentCount
      }));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  };
  
  // Initialize all charts
  const initializeCharts = () => {
    // Generate data for charts
    const dates = generateDates(30);
    
    // MQL Trend Chart Data
    const mqlTrendData = {
      labels: dates,
      datasets: [
        {
          label: 'MQLs',
          data: generateTrendData(30, 50, 90, true),
          borderColor: '#1459e8',
          backgroundColor: 'rgba(20, 89, 232, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHitRadius: 10,
          pointHoverBackgroundColor: '#1459e8'
        },
        {
          label: 'SQLs',
          data: generateTrendData(30, 20, 50, true),
          borderColor: '#5e17eb',
          backgroundColor: 'rgba(94, 23, 235, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHitRadius: 10,
          pointHoverBackgroundColor: '#5e17eb'
        }
      ]
    };
    
    // Email Performance Chart Data
    const emailPerformanceData = {
      labels: ['Monthly Newsletter', 'eBook Promotion', 'Webinar Invitation', 'Product Update', 'Case Study Series'],
      datasets: [
        {
          label: 'Open Rate',
          data: [32.4, 38.9, 42.6, 29.7, 36.2],
          backgroundColor: '#1459e8',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: 'Click Rate',
          data: [8.7, 12.3, 15.2, 7.5, 11.8],
          backgroundColor: '#5e17eb',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }
      ]
    };
    
    // Content Engagement Chart Data
    const contentEngagementData = {
      labels: ['eBooks', 'Webinars', 'Case Studies', 'Interactive Tools', 'Guides'],
      datasets: [
        {
          label: 'Views',
          data: [5284, 4127, 3854, 2984, 3265],
          backgroundColor: '#1459e8',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: 'Conversions',
          data: [742, 564, 482, 358, 348],
          backgroundColor: '#00c27a',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }
      ]
    };
    
    // Lead Score Chart Data
    const leadScoreData = {
      labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
      datasets: [{
        label: 'Number of Leads',
        data: [325, 584, 876, 642, 238],
        backgroundColor: ['#e81402', '#ffc107', '#00c27a', '#3366ff', '#1459e8'],
        borderRadius: 6,
        barPercentage: 0.8,
        categoryPercentage: 0.8
      }]
    };
    
    // Cost Per Lead by Channel Chart Data
    const cplChannelData = {
      labels: ['Organic Search', 'Social Media', 'Paid Search', 'Email', 'Webinars', 'Content/Blog'],
      datasets: [{
        label: 'Cost Per Lead ($)',
        data: [12.45, 32.87, 48.23, 18.65, 42.18, 22.35],
        backgroundColor: ['#00c27a', '#ffc107', '#e81402', '#00c27a', '#e81402', '#ffc107'],
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }]
    };
    
    // MQL by Source Chart Data
    const mqlSourceData = {
      labels: ['Organic Search', 'Social Media', 'Paid Search', 'Email', 'Webinars', 'Content/Blog', 'Referral', 'Direct'],
      datasets: [
        {
          label: 'Total Leads',
          data: [875, 642, 584, 732, 456, 528, 348, 412],
          backgroundColor: '#b0b8c1',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: 'MQLs',
          data: [482, 354, 324, 412, 284, 312, 184, 228],
          backgroundColor: '#1459e8',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: 'SQLs',
          data: [254, 182, 175, 218, 156, 165, 92, 112],
          backgroundColor: '#5e17eb',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }
      ]
    };
    
    setChartData({
      mqlTrend: mqlTrendData,
      mqlSource: mqlSourceData,
      emailPerformance: emailPerformanceData,
      contentEngagement: contentEngagementData,
      leadScore: leadScoreData,
      cplChannel: cplChannelData
    });
  };
  
  // Generate random trend data (for demonstration)
  const generateTrendData = (length, min, max, rising = false) => {
    const data = [];
    let trend = min;
    const maxIncrease = (max - min) / length;
    
    for (let i = 0; i < length; i++) {
      // Add some randomness
      const randomFactor = Math.random() * 0.4 + 0.8; // Between 0.8 and 1.2
      
      // If rising trend, gradually increase the base value
      if (rising) {
        trend += Math.random() * maxIncrease;
        trend = Math.min(trend, max); // Cap at max
      }
      
      data.push(Math.round(trend * randomFactor));
    }
    
    return data;
  };
  
  // Generate date labels for charts
  const generateDates = (days) => {
    const dates = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    return dates;
  };
  
  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxRotation: 0,
          maxTicksLimit: 7
        }
      },
      y: {
        grid: {
          color: 'rgba(20, 89, 232, 0.05)',
          drawBorder: false
        },
        ticks: {
          padding: 10
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        grid: {
          color: 'rgba(20, 89, 232, 0.05)',
          drawBorder: false
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };
  
  const renderTable = (headers, data) => (
    <div className="overflow-auto rounded-lg shadow max-h-96">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-4 text-left bg-blue-50 text-gray-800 font-semibold text-xs uppercase tracking-wider sticky top-0 z-10">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-blue-50/30 transition-colors duration-150">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-4 border-b border-blue-50 text-gray-800 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  return (
    <>
      <StaticExportLayout>
        <div className="relative overflow-x-hidden text-gray-800">
          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 bg-gradient-to-br from-white to-gray-50 flex justify-center items-center z-50 transition-opacity duration-500">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin shadow-lg"></div>
            </div>
          )}
          
          <div className="bg-white bg-opacity-60 shadow-xl rounded-lg">
        {/* Dashboard Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-blue-100">
            <Link href="/products" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors flex-shrink-0">
              <ArrowLeft size={18} />
            </Link>
            
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent flex-shrink-0">
              CDP360 MOFU
            </h1>
            
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md flex-shrink-0 hidden sm:inline-block">
              Engagement
            </span>
            
            <div className="flex-grow"></div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative">
                <select defaultValue="30d" className="appearance-none bg-white border-2 border-blue-100 rounded-lg text-gray-800 py-1 md:py-2 pl-2 md:pl-4 pr-6 md:pr-8 cursor-pointer transition-all focus:outline-none focus:border-blue-500 hover:border-blue-300 text-xs md:text-sm">
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="ytd">Year to date</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 text-xs pointer-events-none">▼</div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border-2 border-blue-100 rounded-lg text-gray-800 py-1 md:py-2 pl-2 md:pl-4 pr-6 md:pr-8 cursor-pointer transition-all focus:outline-none focus:border-blue-500 hover:border-blue-300 text-xs md:text-sm">
                  <option value="prev" selected>vs Previous</option>
                  <option value="yoy">vs Last Year</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 text-xs pointer-events-none">▼</div>
              </div>
            </div>
          </div>

          {/* Funnel Navigation */}
          <FunnelNavigation currentStage="mofu" />
        </div>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap mb-8 bg-white rounded-lg p-2 shadow-md">
          <div 
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'overview' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </div>
          <div 
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'leads' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('leads')}
          >
            Lead Analysis
          </div>
          <div 
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'leads-list' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('leads-list')}
          >
            Leads Database
          </div>
          <div 
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'email' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('email')}
          >
            Email Performance
          </div>
          <div 
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'content' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('content')}
          >
            Content Engagement
          </div>
        </div>
        
        {/* Tab Content */}
        {/* Overview Tab */}
        <div id="overview-tab" className={`${activeTab === 'overview' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-12 gap-6">
            {/* Lead Conversion Rate */}
            <div className="col-span-12 md:col-span-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🎯</div>
                  <span className="font-semibold text-lg text-gray-800">Lead Conversion Rate</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4 opacity-0 animate-in">{metrics.leadConversionRate.toFixed(1)}%</div>
                <div className="text-gray-500 text-sm mb-2">Average visitor-to-lead conversion</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 2.8% vs previous period
                </div>
              </div>
            </div>
            
            {/* Marketing Qualified Leads */}
            <div className="col-span-12 md:col-span-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">👥</div>
                  <span className="font-semibold text-lg text-gray-800">Marketing Qualified Leads</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4 opacity-0 animate-in">{Math.round(metrics.mqlCount).toLocaleString()}</div>
                <div className="text-gray-500 text-sm mb-2">Total MQLs this period</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 12.4% vs previous period
                </div>
              </div>
            </div>
            
            {/* Cost Per Lead */}
            <div className="col-span-12 md:col-span-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">💰</div>
                  <span className="font-semibold text-lg text-gray-800">Cost Per Lead</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4 opacity-0 animate-in">${metrics.costPerLead.toFixed(2)}</div>
                <div className="text-gray-500 text-sm mb-2">Average cost to acquire a lead</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↓</span> 5.3% vs previous period
                </div>
              </div>
            </div>
            
            {/* Lead Funnel */}
            <div className="col-span-12 md:col-span-6 row-span-2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🛒</div>
                  <span className="font-semibold text-lg text-gray-800">Lead Conversion Funnel</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Website Visitors</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="100%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">125,842</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Form Submissions</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="32%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">4,027 (3.2%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Marketing Qualified Leads</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-purple-700 to-purple-500 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="18%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">2,265 (56.2%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Sales Qualified Leads</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-teal-600 to-teal-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="10%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">1,208 (53.3%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Opportunities</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="5%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">684 (56.6%)</div>
                </div>
              </div>
            </div>
            
            {/* MQL Growth Trend */}
            <div className="col-span-12 md:col-span-6 row-span-2 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📈</div>
                  <span className="font-semibold text-lg text-gray-800">MQL Growth Trend</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-80">
                {chartData.mqlTrend && (
                  <Line data={chartData.mqlTrend} options={lineChartOptions} />
                )}
              </div>
            </div>
            
            {/* MQL by Source */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📊</div>
                  <span className="font-semibold text-lg text-gray-800">MQLs by Source</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.mqlSource && (
                  <Bar data={chartData.mqlSource} options={barChartOptions} />
                )}
              </div>
            </div>
            
            {/* MQL to SQL Conversion */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🔄</div>
                  <span className="font-semibold text-lg text-gray-800">MQL to SQL Conversion</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">53.3%</div>
                      <div className="text-sm text-gray-500">Conversion Rate</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="3" 
                      strokeDasharray="100, 100" 
                    />
                    <path 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="3" 
                      strokeDasharray="53.3, 100" 
                      className="animate-in" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Leads Tab */}
        <div id="leads-tab" className={`${activeTab === 'leads' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-12 gap-6">
            {/* Lead Funnel Detail */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🛒</div>
                  <span className="font-semibold text-lg text-gray-800">Lead Conversion Detail</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Website Visitors</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="100%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">125,842</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Form Submissions</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="32%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">4,027 (3.2%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Marketing Qualified Leads</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-purple-700 to-purple-500 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="18%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">2,265 (56.2%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Sales Qualified Leads</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-teal-600 to-teal-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="10%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">1,208 (53.3%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Opportunities</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="5%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">684 (56.6%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Closed Won</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="2%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">324 (47.4%)</div>
                </div>
              </div>
            </div>
            
            {/* Lead Score Distribution */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🔢</div>
                  <span className="font-semibold text-lg text-gray-800">Lead Score Distribution</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.leadScore && (
                  <Bar data={chartData.leadScore} options={barChartOptions} />
                )}
              </div>
            </div>
            
            {/* Cost Per Lead by Channel */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">💲</div>
                  <span className="font-semibold text-lg text-gray-800">Cost Per Lead by Channel</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.cplChannel && (
                  <Bar data={chartData.cplChannel} options={{
                    ...barChartOptions,
                    scales: {
                      ...barChartOptions.scales,
                      y: {
                        ...barChartOptions.scales.y,
                        ticks: {
                          callback: (value) => `$${value}`,
                        }
                      }
                    },
                    plugins: {
                      ...barChartOptions.plugins,
                      tooltip: {
                        callbacks: {
                          label: (context) => `Cost per Lead: $${context.parsed.y.toFixed(2)}`
                        }
                      }
                    }
                  }} />
                )}
              </div>
            </div>
            
            {/* Lead Conversion by Source */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🔍</div>
                  <span className="font-semibold text-lg text-gray-800">Lead Conversion by Source</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Source', 'Visitors', 'Leads', 'Conv. Rate', 'MQLs', 'MQL Rate'],
                  [
                    ['Organic Search', '48,562', '1,845', '3.8%', '985', '53.4%'],
                    ['Paid Search', '32,784', '1,312', '4.0%', '675', '51.4%'],
                    ['Social Media', '25,637', '845', '3.3%', '412', '48.8%'],
                    ['Email', '9,845', '687', '7.0%', '385', '56.0%'],
                    ['Direct', '12,457', '342', '2.7%', '184', '53.8%']
                  ]
                )}
              </div>
            </div>
            
            {/* Lead Time Analysis */}
            <div className="col-span-12 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">⏱️</div>
                  <span className="font-semibold text-lg text-gray-800">Lead Conversion Time Analysis</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Conversion Stage', 'Avg. Time', 'Median Time', 'Min Time', 'Max Time', 'Trend'],
                  [
                    ['Visitor to Lead', '2.3 days', '1.2 days', '0 days', '28 days', '↓ 12.4%'],
                    ['Lead to MQL', '5.7 days', '4.2 days', '0 days', '32 days', '↓ 8.7%'],
                    ['MQL to SQL', '7.3 days', '6.8 days', '1 day', '42 days', '↑ 2.1%'],
                    ['SQL to Opportunity', '8.6 days', '7.5 days', '1 day', '45 days', '↓ 5.3%'],
                    ['Opportunity to Closed', '22.4 days', '18.6 days', '3 days', '90 days', '↑ 1.2%']
                  ]
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Email Performance Tab */}
        <div id="email-tab" className={`${activeTab === 'email' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-12 gap-6">
            {/* Email Performance Overview */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">✉️</div>
                  <span className="font-semibold text-lg text-gray-800">Email Performance Overview</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.emailPerformance && (
                  <Bar data={chartData.emailPerformance} options={{
                    ...barChartOptions,
                    scales: {
                      ...barChartOptions.scales,
                      y: {
                        ...barChartOptions.scales.y,
                        ticks: {
                          callback: (value) => `${value}%`,
                        },
                        suggestedMax: 50
                      }
                    },
                    plugins: {
                      ...barChartOptions.plugins,
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
                        }
                      }
                    }
                  }} />
                )}
              </div>
            </div>
            
            {/* Email Campaign Performance Detail */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📧</div>
                  <span className="font-semibold text-lg text-gray-800">Email Campaign Performance Detail</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Campaign', 'Sent', 'Delivered', 'Open Rate', 'Click Rate', 'Conversion'],
                  [
                    ['Monthly Newsletter', '24,532', '23,987', '32.4%', '8.7%', '3.2%'],
                    ['eBook Promotion', '18,745', '18,321', '38.9%', '12.3%', '5.8%'],
                    ['Webinar Invitation', '15,632', '15,284', '42.6%', '15.2%', '8.7%'],
                    ['Product Update', '22,845', '22,412', '29.7%', '7.5%', '2.9%'],
                    ['Case Study Series', '12,564', '12,325', '36.2%', '11.8%', '4.5%']
                  ]
                )}
              </div>
            </div>
            
            {/* Email Templates Performance */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📋</div>
                  <span className="font-semibold text-lg text-gray-800">Email Templates Performance</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Template', 'Sent', 'Open Rate', 'Click Rate', 'Reply Rate', 'Conversion'],
                  [
                    ['Template A (Image-heavy)', '35,624', '31.5%', '8.2%', '1.8%', '3.4%'],
                    ['Template B (Text-focused)', '28,456', '36.7%', '10.5%', '2.4%', '4.8%'],
                    ['Template C (Hybrid)', '32,187', '34.2%', '9.8%', '2.1%', '4.2%'],
                    ['Template D (Personalized)', '18,526', '42.3%', '14.7%', '3.5%', '6.8%'],
                    ['Template E (Call-to-action)', '24,753', '38.5%', '12.4%', '2.8%', '5.6%']
                  ]
                )}
              </div>
            </div>
            
            {/* Email Subject Line Analysis */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📝</div>
                  <span className="font-semibold text-lg text-gray-800">Subject Line Analysis</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Subject Line Type', 'Emails Sent', 'Open Rate', 'Click Rate', 'Conversion'],
                  [
                    ['Question-based', '24,532', '38.4%', '10.7%', '4.2%'],
                    ['Personalized', '28,745', '42.9%', '14.3%', '6.8%'],
                    ['Urgent/Time-sensitive', '18,632', '41.6%', '13.2%', '5.7%'],
                    ['Numbers/Stats', '20,845', '36.7%', '11.5%', '4.9%'],
                    ['How-to/Value', '22,564', '39.2%', '12.8%', '5.5%']
                  ]
                )}
              </div>
            </div>
            
            {/* Email Sending Time Analysis */}
            <div className="col-span-12 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🕒</div>
                  <span className="font-semibold text-lg text-gray-800">Best Sending Time Analysis</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Day of Week', 'Morning (8-11 AM)', 'Midday (11 AM-2 PM)', 'Afternoon (2-5 PM)', 'Evening (5-8 PM)', 'Night (8-11 PM)'],
                  [
                    ['Monday', '32.4% / 8.7%', '34.2% / 9.5%', '31.8% / 8.3%', '28.5% / 6.8%', '24.2% / 5.4%'],
                    ['Tuesday', '36.7% / 10.2%', '38.4% / 11.3%', '35.2% / 9.7%', '30.6% / 7.8%', '26.3% / 5.9%'],
                    ['Wednesday', '37.2% / 10.5%', '38.9% / 11.8%', '36.4% / 10.2%', '31.2% / 8.1%', '27.5% / 6.3%'],
                    ['Thursday', '35.8% / 9.8%', '36.5% / 10.4%', '34.7% / 9.2%', '29.8% / 7.4%', '25.4% / 5.7%'],
                    ['Friday', '32.3% / 8.6%', '30.7% / 7.9%', '28.4% / 6.8%', '24.5% / 5.5%', '20.8% / 4.2%']
                  ]
                )}
                <div className="text-xs text-gray-500 mt-2 text-center">* Values show Open Rate / Click Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Leads Database Tab */}
        <div id="leads-list-tab" className={`${activeTab === 'leads-list' ? 'block' : 'hidden'}`}>
          <MofuLeadsTab />
        </div>

        {/* Content Engagement Tab */}
        <div id="content-tab" className={`${activeTab === 'content' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-12 gap-6">
            {/* Content Engagement Overview */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📝</div>
                  <span className="font-semibold text-lg text-gray-800">Content Engagement Overview</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.contentEngagement && (
                  <Bar data={chartData.contentEngagement} options={barChartOptions} />
                )}
              </div>
            </div>
            
            {/* Top Performing Content */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📊</div>
                  <span className="font-semibold text-lg text-gray-800">Top Performing Content</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Content', 'Type', 'Views', 'Conversions', 'Conv. Rate'],
                  [
                    ['2025 Industry Outlook eBook', 'eBook', '3,842', '546', '14.2%'],
                    ['Advanced Strategy Webinar', 'Webinar', '2,967', '412', '13.9%'],
                    ['Case Study: Enterprise Success', 'Case Study', '2,354', '295', '12.5%'],
                    ['ROI Calculator', 'Interactive Tool', '1,928', '231', '12.0%'],
                    ['Expert Guide PDF', 'Guide', '1,756', '187', '10.6%']
                  ]
                )}
              </div>
            </div>
            
            {/* Content Engagement by Topic */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📋</div>
                  <span className="font-semibold text-lg text-gray-800">Content Engagement by Topic</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Topic', 'Content Count', 'Avg. Views', 'Avg. Time on Page', 'Avg. Conv. Rate'],
                  [
                    ['Industry Trends', '12', '2,845', '3:42', '11.8%'],
                    ['How-to Guides', '25', '1,756', '4:15', '9.7%'],
                    ['Case Studies', '18', '1,482', '3:28', '12.5%'],
                    ['Product Guides', '15', '1,358', '2:54', '8.2%'],
                    ['Technology Updates', '8', '1,645', '3:12', '7.8%']
                  ]
                )}
              </div>
            </div>
            
            {/* Content Consumption Metrics */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📊</div>
                  <span className="font-semibold text-lg text-gray-800">Content Consumption Metrics</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Content Type', 'Avg. Length', 'Avg. Time Spent', 'Completion Rate', 'Conversion Rate'],
                  [
                    ['Blog Posts', '1,200 words', '3:24', '68%', '7.8%'],
                    ['Whitepapers', '3,500 words', '8:45', '42%', '12.5%'],
                    ['eBooks', '5,200 words', '12:32', '38%', '14.2%'],
                    ['Webinars', '45 minutes', '28:15', '62%', '13.7%'],
                    ['Videos', '5.5 minutes', '3:42', '72%', '9.5%']
                  ]
                )}
              </div>
            </div>
            
            {/* Content Journey Map */}
            <div className="col-span-12 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🗺️</div>
                  <span className="font-semibold text-lg text-gray-800">Content Journey Map</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Stage', 'Awareness', 'Consideration', 'Decision', 'Conversion Rate'],
                  [
                    ['Blog Posts', '85%', '45%', '15%', '7.8%'],
                    ['eBooks & Guides', '65%', '78%', '42%', '14.2%'],
                    ['Webinars', '45%', '72%', '58%', '13.7%'],
                    ['Case Studies', '25%', '65%', '85%', '12.5%'],
                    ['Product Demos', '15%', '48%', '92%', '18.6%']
                  ]
                )}
                <div className="text-xs text-gray-500 mt-2 text-center">* Values show % of content consumed at each stage</div>
              </div>
            </div>
          </div>
        </div>
          </div>
          
          <style jsx global>{`
            /* Custom animations and styles */
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes pulse {
              0% { box-shadow: 0 5px 15px rgba(20, 89, 232, 0.3); }
              50% { box-shadow: 0 8px 20px rgba(20, 89, 232, 0.5); }
              100% { box-shadow: 0 5px 15px rgba(20, 89, 232, 0.3); }
            }
            
            @keyframes countUp {
              0% { opacity: 0; }
              20% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
            
            .animate-in {
              animation: countUp 2s ease-out forwards;
            }
            
            .animate-pulse {
              animation: pulse 3s infinite;
            }
            
            .float {
              animation: float 6s ease-in-out infinite;
            }
          `}</style>
        </div>
      </StaticExportLayout>
    </>
  );
}