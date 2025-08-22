import { useState, useEffect, useCallback } from 'react';
import { lushaApiService } from '@/lib/services/lushaApi';

interface UseLushaConnectionState {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  apiKey: string | null;
}

export const useLushaConnection = () => {
  const [state, setState] = useState<UseLushaConnectionState>({
    isConnected: false,
    isLoading: false,
    error: null,
    apiKey: null
  });

  const testConnection = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const connected = await lushaApiService.testConnection();
      setState(prev => ({ 
        ...prev, 
        isConnected: connected, 
        isLoading: false,
        apiKey: connected ? 'ee0f1129-46b7-4e21-bc0f-49de9fb1b021' : null
      }));
      return connected;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Connection test failed';
      setState(prev => ({ 
        ...prev, 
        isConnected: false, 
        isLoading: false, 
        error: errorMessage,
        apiKey: null
      }));
      return false;
    }
  }, []);

  const updateApiKey = useCallback(async (newApiKey: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Create new service instance with new API key
      const newService = new (lushaApiService.constructor as any)(newApiKey);
      const connected = await newService.testConnection();
      
      if (connected) {
        // Update the global service instance
        Object.assign(lushaApiService, newService);
        setState(prev => ({ 
          ...prev, 
          isConnected: true, 
          isLoading: false,
          apiKey: newApiKey
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          isConnected: false, 
          isLoading: false,
          error: 'Invalid API key'
        }));
      }
      
      return connected;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update API key';
      setState(prev => ({ 
        ...prev, 
        isConnected: false, 
        isLoading: false, 
        error: errorMessage
      }));
      return false;
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      isLoading: false,
      error: null,
      apiKey: null
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Test connection on mount
  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    ...state,
    testConnection,
    updateApiKey,
    disconnect,
    clearError
  };
};

export default useLushaConnection;