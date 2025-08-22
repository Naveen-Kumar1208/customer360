'use client';

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
  PieController,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { BofuLeadsTab } from '@/components/products/bofu/BofuLeadsTab';
import { FunnelNavigation } from '@/components/products/FunnelNavigation';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function BofuPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for metrics with animation
  const [metrics, setMetrics] = useState({
    sqlCount: 0,
    closeRate: 0,
    avgDealSize: 0,
    salesCycle: 0
  });
  
  // State for chart data
  const [chartData, setChartData] = useState({
    revenueTrend: null,
    dealSize: null,
    closeRate: null,
    salesCycle: null,
    demoClose: null,
    proposal: null,
    productRevenue: null,
    revenueTrendFull: null
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
    animateCounter('sqlCount', 0, 1208, 2000, 0);
    animateCounter('closeRate', 0, 58, 2000, 0);
    animateCounter('avgDealSize', 0, 14380, 2000, 0);
    animateCounter('salesCycle', 0, 22, 2000, 0);
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
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Generate last 12 months
    const monthLabels = [];
    const currentDate = new Date();
    for (let i = 11; i >= 0; i--) {
        const d = new Date(currentDate);
        d.setMonth(d.getMonth() - i);
        monthLabels.push(monthNames[d.getMonth()] + ' ' + d.getFullYear());
    }
    
    // Deal Size Distribution Chart Data
    const dealSizeData = {
      labels: ['<$5K', '$5K-$10K', '$10K-$20K', '$20K-$50K', '$50K-$100K', '>$100K'],
      datasets: [{
        label: 'Number of Deals',
        data: [58, 87, 63, 32, 18, 8],
        backgroundColor: ['#1459e8', '#3366ff', '#3366ff', '#6b8bff', '#6b8bff', '#07caff'],
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }]
    };
    
    // Close Rate by Sales Rep Chart Data
    const closeRateData = {
      labels: ['Sarah Chen', 'Marcus Johnson', 'Priya Patel', 'David Rodriguez', 'Emily Wong', 'Team Average'],
      datasets: [{
        label: 'Close Rate (%)',
        data: [62.5, 58.4, 55.2, 54.8, 53.9, 57.0],
        backgroundColor: ['#00c27a', '#00c27a', '#1459e8', '#1459e8', '#ffc107', '#1459e8'],
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }]
    };
    
    // Sales Cycle by Deal Size Chart Data
    const salesCycleData = {
      labels: ['<$5K', '$5K-$10K', '$10K-$20K', '$20K-$50K', '$50K-$100K', '>$100K'],
      datasets: [{
        label: 'Avg. Days to Close',
        data: [12, 18, 24, 32, 41, 56],
        borderColor: '#1459e8',
        backgroundColor: 'rgba(20, 89, 232, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#1459e8',
        pointHoverRadius: 6,
      }]
    };
    
    // Demo-to-Close Ratio Chart Data
    const demoCloseData = {
      labels: ['Closed Won', 'Closed Lost', 'Still in Pipeline'],
      datasets: [{
        data: [266, 192, 484],
        backgroundColor: ['#00c27a', '#e81402', '#ffc107'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    };
    
    // Proposal Acceptance Rate Chart Data
    const proposalData = {
      labels: ['Enterprise', 'Mid-Market', 'SMB', 'Team Average'],
      datasets: [
        {
          label: 'Sent',
          data: [126, 245, 257, 628],
          backgroundColor: '#94a3b8',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: 'Accepted',
          data: [98, 178, 183, 459],
          backgroundColor: '#1459e8',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }
      ]
    };
    
    // Revenue by Product Chart Data
    const productRevenueData = {
      labels: ['Enterprise Plan', 'Professional Plan', 'Standard Plan', 'Basic Plan', 'Add-on Services'],
      datasets: [{
        data: [42, 28, 18, 7, 5],
        backgroundColor: ['#1459e8', '#3366ff', '#6b8bff', '#07caff', '#5e17eb'],
        borderWidth: 1,
        borderColor: '#ffffff'
      }]
    };
    
    // Monthly Revenue Trend Chart Data
    const revenueTrendData = {
      labels: monthLabels,
      datasets: [
        {
          label: 'Monthly Revenue',
          data: [685000, 742000, 798000, 823000, 765000, 854000, 912000, 968000, 1025000, 1124000, 1218000, 1325000],
          borderColor: '#1459e8',
          backgroundColor: 'rgba(20, 89, 232, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#1459e8',
          pointHoverRadius: 6
        },
        {
          label: 'Target',
          data: [700000, 725000, 750000, 775000, 800000, 825000, 850000, 900000, 950000, 1000000, 1050000, 1100000],
          borderColor: '#6b8bff',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          fill: false,
          tension: 0,
          borderWidth: 2,
          pointRadius: 0
        }
      ]
    };
    
    // Revenue Trend Full Chart Data
    const revenueTrendFullData = {
      labels: monthLabels,
      datasets: [
        {
          label: 'Enterprise',
          data: [285000, 312000, 328000, 343000, 315000, 364000, 392000, 428000, 455000, 494000, 538000, 585000],
          borderColor: '#1459e8',
          backgroundColor: 'rgba(20, 89, 232, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#1459e8'
        },
        {
          label: 'Professional',
          data: [215000, 235000, 246000, 252000, 235000, 255000, 275000, 285000, 305000, 335000, 355000, 385000],
          borderColor: '#6b8bff',
          backgroundColor: 'rgba(107, 139, 255, 0.05)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#6b8bff'
        },
        {
          label: 'Standard',
          data: [125000, 135000, 142000, 145000, 135000, 150000, 155000, 165000, 170000, 185000, 205000, 225000],
          borderColor: '#07caff',
          backgroundColor: 'rgba(7, 202, 255, 0.03)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#07caff'
        },
        {
          label: 'Basic',
          data: [60000, 60000, 82000, 83000, 80000, 85000, 90000, 90000, 95000, 110000, 120000, 130000],
          borderColor: '#5e17eb',
          backgroundColor: 'rgba(94, 23, 235, 0.03)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#5e17eb'
        }
      ]
    };
    
    setChartData({
      dealSize: dealSizeData,
      closeRate: closeRateData,
      salesCycle: salesCycleData,
      demoClose: demoCloseData,
      proposal: proposalData,
      productRevenue: productRevenueData,
      revenueTrend: revenueTrendData,
      revenueTrendFull: revenueTrendFullData
    });
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
  
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label;
            const value = context.parsed;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };
  
  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label;
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value} demos)`;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };
  
  const revenueTrendOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 3.5,
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
        beginAtZero: true,
        ticks: {
          callback: (value) => '$' + (value / 1000) + 'K'
        }
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
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label;
            const value = context.parsed.y;
            return `${label}: $${value.toLocaleString()}`;
          }
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
  
  const revenueTrendFullOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 3.5,
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
        beginAtZero: true,
        stacked: true,
        ticks: {
          callback: (value) => '$' + (value / 1000) + 'K'
        }
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
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label;
            const value = context.parsed.y;
            return `${label}: $${value.toLocaleString()}`;
          }
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
            CDP360 BOFU
          </h1>
          
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md flex-shrink-0 hidden sm:inline-block">
            Conversion
          </span>
          
          <div className="flex-grow"></div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <select className="appearance-none bg-white border-2 border-blue-100 rounded-lg text-gray-800 py-1 md:py-2 pl-2 md:pl-4 pr-6 md:pr-8 cursor-pointer transition-all focus:outline-none focus:border-blue-500 hover:border-blue-300 text-xs md:text-sm">
                <option value="7d">Last 7 days</option>
                <option value="30d" selected>Last 30 days</option>
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
        <FunnelNavigation currentStage="bofu" />
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
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'deals' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('deals')}
          >
            Deal Analysis
          </div>
          <div 
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'sales' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('sales')}
          >
            Sales Performance
          </div>
          <div 
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'revenue' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('revenue')}
          >
            Revenue Insights
          </div>
          <div 
            className={`py-3 px-6 font-semibold cursor-pointer transition duration-300 rounded-lg ${activeTab === 'leads-list' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'}`}
            onClick={() => handleTabChange('leads-list')}
          >
            Leads Database
          </div>
        </div>
        
        {/* Overview Tab */}
        <div id="overview-content" className={`${activeTab === 'overview' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-12 gap-6">
            {/* Sales Qualified Leads */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">👥</div>
                  <span className="font-semibold text-lg text-gray-800">Sales Qualified Leads</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4 opacity-0 animate-in" id="sql-count">{Math.round(metrics.sqlCount)}</div>
                <div className="text-gray-500 text-sm mb-2">Total SQLs this period</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 9.2% vs previous period
                </div>
              </div>
            </div>
            
            {/* Opportunity-to-Close Rate */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🎯</div>
                  <span className="font-semibold text-lg text-gray-800">Opportunity-to-Close Rate</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4 opacity-0 animate-in" id="close-rate">{Math.round(metrics.closeRate)}%</div>
                <div className="text-gray-500 text-sm mb-2">Average closing success rate</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 3.5% vs previous period
                </div>
              </div>
            </div>
            
            {/* Average Deal Size */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">💰</div>
                  <span className="font-semibold text-lg text-gray-800">Average Deal Size</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4 opacity-0 animate-in" id="avg-deal-size">${Math.round(metrics.avgDealSize).toLocaleString()}</div>
                <div className="text-gray-500 text-sm mb-2">Average revenue per deal</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 12.8% vs previous period
                </div>
              </div>
            </div>
            
            {/* Sales Cycle Length */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">⏱️</div>
                  <span className="font-semibold text-lg text-gray-800">Sales Cycle Length</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4 opacity-0 animate-in" id="sales-cycle">{Math.round(metrics.salesCycle)} days</div>
                <div className="text-gray-500 text-sm mb-2">Average days to close</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↓</span> 4.3% vs previous period
                </div>
              </div>
            </div>
            
            {/* Sales Funnel */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🛒</div>
                  <span className="font-semibold text-lg text-gray-800">Sales Funnel</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Sales Qualified Leads</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="100%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">1,208</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Demos/Consultations</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="78%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">942 (78%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Proposals Sent</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-purple-700 to-purple-500 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="52%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">628 (66.7%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Opportunities</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-teal-600 to-teal-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="38%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">459 (73.1%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2/5 text-sm text-gray-800 font-medium">Closed Won</div>
                  <div className="w-2/5 h-6 bg-blue-50 rounded-lg shadow-inner overflow-hidden relative">
                    <div className="funnel-bar absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-lg shadow-md w-0 transition-all duration-1500 ease-out" data-width="22%"></div>
                  </div>
                  <div className="w-1/5 text-right text-sm font-semibold text-gray-800">266 (58%)</div>
                </div>
              </div>
            </div>
            
            {/* Monthly Revenue Trend */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📈</div>
                  <span className="font-semibold text-lg text-gray-800">Monthly Revenue Trend</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.revenueTrend && (
                  <Line data={chartData.revenueTrend} options={revenueTrendOptions} />
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Deals Tab */}
        <div id="deals-content" className={`${activeTab === 'deals' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-12 gap-6">
            {/* Deal Size Distribution */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📊</div>
                  <span className="font-semibold text-lg text-gray-800">Deal Size Distribution</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.dealSize && (
                  <Bar data={chartData.dealSize} options={{
                    ...barChartOptions,
                    scales: {
                      ...barChartOptions.scales,
                      x: {
                        ...barChartOptions.scales.x,
                        title: {
                          display: true,
                          text: 'Deal Size Range'
                        }
                      },
                      y: {
                        ...barChartOptions.scales.y,
                        title: {
                          display: true,
                          text: 'Number of Deals'
                        }
                      }
                    },
                    plugins: {
                      ...barChartOptions.plugins,
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => `Deals: ${context.parsed.y}`
                        }
                      }
                    }
                  }} />
                )}
              </div>
            </div>
            
            {/* Sales Cycle Length by Deal Size */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">⏳</div>
                  <span className="font-semibold text-lg text-gray-800">Sales Cycle by Deal Size</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.salesCycle && (
                  <Line data={chartData.salesCycle} options={{
                    ...lineChartOptions,
                    scales: {
                      ...lineChartOptions.scales,
                      x: {
                        ...lineChartOptions.scales.x,
                        title: {
                          display: true,
                          text: 'Deal Size Range'
                        }
                      },
                      y: {
                        ...lineChartOptions.scales.y,
                        title: {
                          display: true,
                          text: 'Days to Close'
                        }
                      }
                    },
                    plugins: {
                      ...lineChartOptions.plugins,
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => `Avg. Time: ${context.parsed.y} days`
                        }
                      }
                    }
                  }} />
                )}
              </div>
            </div>
            
            {/* Top Deals Table */}
            <div className="col-span-12 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🏆</div>
                  <span className="font-semibold text-lg text-gray-800">Top Deals Closed</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Company', 'Product/Service', 'Deal Size', 'Sales Rep', 'Close Date'],
                  [
                    ['Enterprise Solutions Inc.', 'Annual Enterprise Plan', '$145,500', 'Sarah Chen', 'Apr 24, 2025'],
                    ['Global Tech Partners', 'Managed Services Plus', '$98,750', 'Marcus Johnson', 'Apr 18, 2025'],
                    ['Innovative Systems LLC', 'Platform Integration', '$86,200', 'Priya Patel', 'Apr 27, 2025'],
                    ['Quantum Data Corp', 'Analytics Suite', '$72,800', 'David Rodriguez', 'Apr 15, 2025'],
                    ['NextGen Industries', 'Professional Services', '$68,500', 'Sarah Chen', 'Apr 30, 2025']
                  ]
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sales Performance Tab */}
        <div id="sales-content" className={`${activeTab === 'sales' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-12 gap-6">
            {/* Close Rate by Sales Rep */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">👑</div>
                  <span className="font-semibold text-lg text-gray-800">Close Rate by Sales Rep</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.closeRate && (
                  <Bar data={chartData.closeRate} options={{
                    ...barChartOptions,
                    scales: {
                      ...barChartOptions.scales,
                      y: {
                        ...barChartOptions.scales.y,
                        beginAtZero: true,
                        suggestedMax: 70,
                        ticks: {
                          callback: (value) => value + '%'
                        }
                      }
                    },
                    plugins: {
                      ...barChartOptions.plugins,
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => `Close Rate: ${context.parsed.y}%`
                        }
                      }
                    }
                  }} />
                )}
              </div>
            </div>
            
            {/* Demo-to-Close Ratio */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🎦</div>
                  <span className="font-semibold text-lg text-gray-800">Demo-to-Close Ratio</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.demoClose && (
                  <Doughnut data={chartData.demoClose} options={doughnutChartOptions} />
                )}
              </div>
            </div>
            
            {/* Sales Performance by Rep */}
            <div className="col-span-12 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🌟</div>
                  <span className="font-semibold text-lg text-gray-800">Sales Rep Performance</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div>
                {renderTable(
                  ['Sales Rep', 'Deals Closed', 'Revenue', 'Avg. Deal Size', 'Close Rate', 'Avg. Sales Cycle'],
                  [
                    ['Sarah Chen', '47', '$682,450', '$14,520', '62.5%', '18 days'],
                    ['Marcus Johnson', '42', '$598,200', '$14,243', '58.4%', '21 days'],
                    ['Priya Patel', '38', '$542,800', '$14,284', '55.2%', '24 days'],
                    ['David Rodriguez', '35', '$482,350', '$13,781', '54.8%', '22 days'],
                    ['Emily Wong', '34', '$452,780', '$13,317', '53.9%', '26 days']
                  ]
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Revenue Insights Tab */}
        <div id="revenue-content" className={`${activeTab === 'revenue' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-12 gap-6">
            {/* Monthly Revenue Metrics */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">💵</div>
                  <span className="font-semibold text-lg text-gray-800">Monthly Revenue</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4">$1.32M</div>
                <div className="text-gray-500 text-sm mb-2">Current month revenue</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 8.7% vs previous month
                </div>
              </div>
            </div>
            
            {/* Quarterly Revenue Metrics */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📅</div>
                  <span className="font-semibold text-lg text-gray-800">Quarterly Revenue</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4">$3.67M</div>
                <div className="text-gray-500 text-sm mb-2">Q2 2025 total revenue</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 12.4% vs Q1 2025
                </div>
              </div>
            </div>
            
            {/* Annual Run Rate */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🔄</div>
                  <span className="font-semibold text-lg text-gray-800">Annual Run Rate</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4">$15.9M</div>
                <div className="text-gray-500 text-sm mb-2">Based on current quarter</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 15.2% vs previous ARR
                </div>
              </div>
            </div>
            
            {/* Revenue per Customer */}
            <div className="col-span-12 md:col-span-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">👤</div>
                  <span className="font-semibold text-lg text-gray-800">Revenue per Customer</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="flex flex-col h-auto min-h-32 bg-gradient-to-br from-white/50 to-white/90 rounded-lg p-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent my-4">$24.8K</div>
                <div className="text-gray-500 text-sm mb-2">Average annual value</div>
                <div className="mt-auto flex items-center text-green-500 bg-green-50 py-2 px-1 rounded-lg text-sm font-semibold border border-green-100">
                  <span className="mr-2">↑</span> 7.3% vs previous year
                </div>
              </div>
            </div>
            
            {/* Proposal Acceptance Rate */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📝</div>
                  <span className="font-semibold text-lg text-gray-800">Proposal Acceptance Rate</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.proposal && (
                  <Bar data={chartData.proposal} options={{
                    ...barChartOptions,
                    plugins: {
                      ...barChartOptions.plugins,
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const datasetLabel = context.dataset.label;
                            const value = context.parsed.y;
                            return `${datasetLabel}: ${value}`;
                          },
                          afterBody: (context) => {
                            const index = context[0].dataIndex;
                            const sent = chartData.proposal.datasets[0].data[index];
                            const accepted = chartData.proposal.datasets[1].data[index];
                            const rate = ((accepted / sent) * 100).toFixed(1);
                            return `Acceptance Rate: ${rate}%`;
                          }
                        }
                      }
                    }
                  }} />
                )}
              </div>
            </div>
            
            {/* Revenue by Product */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🧩</div>
                  <span className="font-semibold text-lg text-gray-800">Revenue by Product</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-64">
                {chartData.productRevenue && (
                  <Pie data={chartData.productRevenue} options={pieChartOptions} />
                )}
              </div>
            </div>
            
            {/* Revenue Trend */}
            <div className="col-span-12 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">📈</div>
                  <span className="font-semibold text-lg text-gray-800">Revenue Trend</span>
                </div>
                <div className="text-blue-400 cursor-pointer hover:text-blue-500 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded-full">⋮</div>
              </div>
              <div className="h-80">
                {chartData.revenueTrendFull && (
                  <Line data={chartData.revenueTrendFull} options={revenueTrendFullOptions} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Leads Database Tab */}
        <div id="leads-list-content" className={`${activeTab === 'leads-list' ? 'block' : 'hidden'}`}>
          <BofuLeadsTab />
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