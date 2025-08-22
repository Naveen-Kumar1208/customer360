'use client';

import React, { useState, useEffect } from 'react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ColdBucketLeadsTab } from '@/components/products/cold/ColdBucketLeadsTab';
import { FunnelNavigation } from '@/components/products/FunnelNavigation';


export default function ColdBucketPage() {
  // Loading state
  const [loading, setLoading] = useState(true);
  
  // Initialize data and animations on component mount
  useEffect(() => {
    // Hide loading overlay after everything is loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <>
      <StaticExportLayout>
        <div className="relative overflow-x-hidden text-gray-800">
          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 bg-gradient-to-br from-white to-gray-50 flex justify-center items-center z-50 transition-opacity duration-500">
              <div className="w-16 h-16 border-4 border-gray-100 border-t-gray-500 rounded-full animate-spin shadow-lg"></div>
            </div>
          )}
          
          <div className="bg-white bg-opacity-60 shadow-xl rounded-lg">
        {/* Dashboard Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <Link href="/products" className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0">
              <ArrowLeft size={18} />
            </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent flex-shrink-0">
            CDP360 Cold Bucket
          </h1>
          
          <span className="bg-gradient-to-r from-gray-600 to-gray-400 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md flex-shrink-0 hidden sm:inline-block">
            Re-engagement
          </span>
          
          <div className="flex-grow"></div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <select className="appearance-none bg-white border-2 border-gray-100 rounded-lg text-gray-800 py-1 md:py-2 pl-2 md:pl-4 pr-6 md:pr-8 cursor-pointer transition-all focus:outline-none focus:border-gray-500 hover:border-gray-300 text-xs md:text-sm">
                <option value="7d">Last 7 days</option>
                <option value="30d" selected>Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="ytd">Year to date</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs pointer-events-none">▼</div>
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border-2 border-gray-100 rounded-lg text-gray-800 py-1 md:py-2 pl-2 md:pl-4 pr-6 md:pr-8 cursor-pointer transition-all focus:outline-none focus:border-gray-500 hover:border-gray-300 text-xs md:text-sm">
                <option value="prev" selected>vs Previous</option>
                <option value="yoy">vs Last Year</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs pointer-events-none">▼</div>
            </div>
          </div>
        </div>

        {/* Funnel Navigation */}
        <FunnelNavigation currentStage="cold" />
      </div>
        
        {/* Cold Leads Database Content */}
        <ColdBucketLeadsTab />
          </div>
          
          <style jsx global>{`
            /* Custom animations and styles */
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes pulse {
              0% { box-shadow: 0 5px 15px rgba(107, 114, 128, 0.3); }
              50% { box-shadow: 0 8px 20px rgba(107, 114, 128, 0.5); }
              100% { box-shadow: 0 5px 15px rgba(107, 114, 128, 0.3); }
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