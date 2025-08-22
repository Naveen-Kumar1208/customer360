"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface FunnelNavigationProps {
  currentStage: 'tofu' | 'mofu' | 'bofu' | 'cold' | 'invalid';
}

export const FunnelNavigation: React.FC<FunnelNavigationProps> = ({ currentStage }) => {
  const stages = [
    { id: 'tofu', name: 'TOFU', description: 'Awareness', path: '/products/tofu' },
    { id: 'mofu', name: 'MOFU', description: 'Engagement', path: '/products/mofu' },
    { id: 'bofu', name: 'BOFU', description: 'Decision', path: '/products/bofu' },
    { id: 'cold', name: 'Cold Bucket', description: 'Inactive', path: '/products/cold' },
    { id: 'invalid', name: 'Invalid Leads', description: 'Invalid', path: '/products/invalid' }
  ];

  const getStageColors = (stageId: string, isActive: boolean) => {
    const colors = {
      tofu: {
        bg: isActive ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-100 to-gray-200',
        text: isActive ? 'text-white' : 'text-gray-600',
        border: isActive ? 'border-blue-200 shadow-blue-100' : 'border-gray-200',
        ring: isActive ? 'ring-blue-500/20' : '',
        hover: !isActive ? 'hover:from-blue-50 hover:to-blue-100 hover:text-blue-700' : ''
      },
      mofu: {
        bg: isActive ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-gray-100 to-gray-200',
        text: isActive ? 'text-white' : 'text-gray-600',
        border: isActive ? 'border-purple-200 shadow-purple-100' : 'border-gray-200',
        ring: isActive ? 'ring-purple-500/20' : '',
        hover: !isActive ? 'hover:from-purple-50 hover:to-purple-100 hover:text-purple-700' : ''
      },
      bofu: {
        bg: isActive ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-gray-100 to-gray-200',
        text: isActive ? 'text-white' : 'text-gray-600',
        border: isActive ? 'border-green-200 shadow-green-100' : 'border-gray-200',
        ring: isActive ? 'ring-green-500/20' : '',
        hover: !isActive ? 'hover:from-green-50 hover:to-green-100 hover:text-green-700' : ''
      },
      cold: {
        bg: isActive ? 'bg-gradient-to-br from-gray-500 to-gray-600' : 'bg-gradient-to-br from-gray-100 to-gray-200',
        text: isActive ? 'text-white' : 'text-gray-600',
        border: isActive ? 'border-gray-300 shadow-gray-100' : 'border-gray-200',
        ring: isActive ? 'ring-gray-500/20' : '',
        hover: !isActive ? 'hover:from-gray-50 hover:to-gray-100 hover:text-gray-700' : ''
      },
      invalid: {
        bg: isActive ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-gray-100 to-gray-200',
        text: isActive ? 'text-white' : 'text-gray-600',
        border: isActive ? 'border-red-200 shadow-red-100' : 'border-gray-200',
        ring: isActive ? 'ring-red-500/20' : '',
        hover: !isActive ? 'hover:from-red-50 hover:to-red-100 hover:text-red-700' : ''
      }
    };
    return colors[stageId as keyof typeof colors] || colors.tofu;
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-gray-200/60 p-6 mb-6 shadow-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Sales Funnel Navigation</h2>
        <p className="text-sm text-gray-500">Track progress through your customer journey</p>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-1 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          {stages.map((stage, index) => {
            const isActive = currentStage === stage.id;
            const colors = getStageColors(stage.id, isActive);
            
            return (
              <React.Fragment key={stage.id}>
                <Link 
                  href={stage.path}
                  className={`relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform ${
                    colors.bg
                  } ${colors.text} ${colors.border} ${colors.ring} ${colors.hover} ${
                    isActive ? 'shadow-lg scale-105 ring-4' : 'hover:scale-102 hover:shadow-md'
                  } border min-w-[120px]`}
                >
                  <div className="flex flex-col items-center w-full">
                    {/* Stage indicator */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                      isActive ? 'bg-white/20' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-semibold">{stage.name}</span>
                    <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'} font-medium`}>
                      {stage.description}
                    </span>
                  </div>
                  
                  {/* Active indicator glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
                  )}
                </Link>
                
                {/* Connector */}
                {index < stages.length - 1 && (
                  <div className="flex items-center px-2">
                    <div className="w-8 h-px bg-gradient-to-r from-gray-300 to-gray-400"></div>
                    <ChevronRight className="w-4 h-4 text-gray-400 -ml-1" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-2">
          {stages.map((stage, index) => {
            const isActive = currentStage === stage.id;
            const isPassed = stages.findIndex(s => s.id === currentStage) > index;
            
            return (
              <div key={stage.id} className="flex items-center">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-blue-500 scale-150' : 
                  isPassed ? 'bg-green-400' : 'bg-gray-300'
                }`}></div>
                {index < stages.length - 1 && (
                  <div className={`w-8 h-px transition-all duration-300 ${
                    isPassed ? 'bg-green-400' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};