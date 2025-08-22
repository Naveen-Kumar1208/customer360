import { useState, useCallback, useEffect } from 'react';

export interface LushaUsageData {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  billingCycle: {
    startDate: string;
    endDate: string;
    renewalDate: string;
  };
  usageByType: {
    person: {
      used: number;
      limit: number;
    };
    company: {
      used: number;
      limit: number;
    };
    prospecting: {
      used: number;
      limit: number;
    };
  };
  dailyUsage: Array<{
    date: string;
    usage: number;
    type: 'person' | 'company' | 'prospecting';
  }>;
  monthlyUsage: Array<{
    month: string;
    usage: number;
  }>;
}

interface UseLushaUsageState {
  usage: LushaUsageData | null;
  loading: boolean;
  error: string | null;
}

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const useLushaUsage = () => {
  const [state, setState] = useState<UseLushaUsageState>({
    usage: null,
    loading: false,
    error: null
  });

  const fetchUsage = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch('/api/lusha/usage', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform Lusha API response to our format
      const transformedData: LushaUsageData = {
        totalCredits: data.totalCredits || 1000,
        usedCredits: data.usedCredits || 0,
        remainingCredits: data.remainingCredits || (data.totalCredits - data.usedCredits) || 1000,
        billingCycle: {
          startDate: data.billingCycle?.startDate || new Date().toISOString(),
          endDate: data.billingCycle?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          renewalDate: data.billingCycle?.renewalDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        usageByType: {
          person: {
            used: data.usageByType?.person?.used || 0,
            limit: data.usageByType?.person?.limit || 500,
          },
          company: {
            used: data.usageByType?.company?.used || 0,
            limit: data.usageByType?.company?.limit || 300,
          },
          prospecting: {
            used: data.usageByType?.prospecting?.used || 0,
            limit: data.usageByType?.prospecting?.limit || 200,
          },
        },
        dailyUsage: data.dailyUsage || [],
        monthlyUsage: data.monthlyUsage || [],
      };

      setState(prev => ({ 
        ...prev, 
        usage: transformedData, 
        loading: false 
      }));
      
      return transformedData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch usage data';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false 
      }));
      throw error;
    }
  }, []);

  const getUsagePercentage = useCallback(() => {
    if (!state.usage) return 0;
    return (state.usage.usedCredits / state.usage.totalCredits) * 100;
  }, [state.usage]);

  const getRemainingDays = useCallback(() => {
    if (!state.usage) return 0;
    const renewalDate = new Date(state.usage.billingCycle.renewalDate);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [state.usage]);

  const getDailyAverage = useCallback(() => {
    if (!state.usage || !state.usage.dailyUsage.length) return 0;
    const totalDailyUsage = state.usage.dailyUsage.reduce((sum, day) => sum + day.usage, 0);
    return Math.round(totalDailyUsage / state.usage.dailyUsage.length);
  }, [state.usage]);

  const getProjectedUsage = useCallback(() => {
    if (!state.usage) return 0;
    const dailyAvg = getDailyAverage();
    const remainingDays = getRemainingDays();
    return Math.round(state.usage.usedCredits + (dailyAvg * remainingDays));
  }, [state.usage, getDailyAverage, getRemainingDays]);

  const isNearLimit = useCallback((threshold = 80) => {
    return getUsagePercentage() >= threshold;
  }, [getUsagePercentage]);

  const willExceedLimit = useCallback(() => {
    if (!state.usage) return false;
    return getProjectedUsage() > state.usage.totalCredits;
  }, [state.usage, getProjectedUsage]);

  const getUsageByType = useCallback((type: 'person' | 'company' | 'prospecting') => {
    if (!state.usage) return { used: 0, limit: 0, percentage: 0 };
    const typeUsage = state.usage.usageByType[type];
    return {
      ...typeUsage,
      percentage: (typeUsage.used / typeUsage.limit) * 100
    };
  }, [state.usage]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Auto-refresh usage data
  useEffect(() => {
    fetchUsage();
    
    const interval = setInterval(fetchUsage, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [fetchUsage]);

  return {
    ...state,
    fetchUsage,
    getUsagePercentage,
    getRemainingDays,
    getDailyAverage,
    getProjectedUsage,
    isNearLimit,
    willExceedLimit,
    getUsageByType,
    clearError,
    // Utility functions
    formatCredits: (credits: number) => credits.toLocaleString(),
    formatPercentage: (percentage: number) => `${Math.round(percentage)}%`,
  };
};

export default useLushaUsage;