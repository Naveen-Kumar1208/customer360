"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Key, Settings, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface LushaSetupInstructionsProps {
  className?: string;
}

export function LushaSetupInstructions({ className }: LushaSetupInstructionsProps) {
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const testConfiguration = async () => {
    setTestLoading(true);
    try {
      const response = await fetch('/api/lusha/test-config');
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({
        configured: false,
        error: 'Failed to test configuration'
      });
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-800">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Lusha API Configuration Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-yellow-800">
            <p className="mb-4">
              To use Lusha API features, you need to configure your API key. Follow these steps:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">1</Badge>
                <div>
                  <h4 className="font-medium">Get Your Lusha API Key</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Visit your Lusha dashboard and navigate to the API section to generate or retrieve your API key.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Lusha Dashboard
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">2</Badge>
                <div>
                  <h4 className="font-medium">Set Environment Variable</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Add your API key to your environment variables:
                  </p>
                  <div className="mt-2 p-3 bg-gray-900 text-green-400 rounded-md text-sm font-mono">
                    LUSHA_API_KEY=your_actual_lusha_api_key_here
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">3</Badge>
                <div>
                  <h4 className="font-medium">For Local Development</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Create or update your <code>.env.local</code> file in the project root:
                  </p>
                  <div className="mt-2 p-3 bg-gray-100 text-gray-800 rounded-md text-sm font-mono">
                    # .env.local<br/>
                    LUSHA_API_KEY=your_actual_lusha_api_key_here
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">4</Badge>
                <div>
                  <h4 className="font-medium">For Production</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Set the environment variable in your hosting platform (Vercel, Netlify, etc.)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Note:</strong> Never commit API keys to your repository. Always use environment variables 
              and add .env.local to your .gitignore file.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Lusha API Key Format
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Expected Format</h4>
            <p className="text-sm text-gray-600 mb-3">
              Lusha API keys typically follow this format:
            </p>
            <div className="p-3 bg-gray-100 rounded-md text-sm font-mono">
              xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * This is an example format. Your actual API key format may vary.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Authentication Method</h4>
            <p className="text-sm text-gray-600">
              Lusha uses API key authentication with the <code>api_key</code> header:
            </p>
            <div className="mt-2 p-3 bg-gray-900 text-green-400 rounded-md text-sm font-mono">
              headers: &#123;<br/>
              &nbsp;&nbsp;"api_key": "your_lusha_api_key",<br/>
              &nbsp;&nbsp;"Content-Type": "application/json"<br/>
              &#125;
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <CheckCircle className="mr-2 h-5 w-5" />
            After Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-green-800 text-sm">
              Once you've set up your API key, restart your development server and test your configuration.
            </p>
            
            <div className="flex space-x-3">
              <Button 
                size="sm" 
                onClick={testConfiguration}
                disabled={testLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {testLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Configuration'
                )}
              </Button>
            </div>
            
            {testResult && (
              <Alert className={testResult.configured ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <AlertDescription>
                  <div className="space-y-2">
                    <div className={`font-medium ${testResult.configured ? 'text-green-800' : 'text-red-800'}`}>
                      {testResult.message}
                    </div>
                    {testResult.configured ? (
                      <div className="text-sm text-green-700">
                        ✓ API Key Length: {testResult.keyLength} characters<br/>
                        ✓ Key Preview: {testResult.keyPreview}
                      </div>
                    ) : (
                      <div className="text-sm text-red-700">
                        {testResult.instructions?.development}
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LushaSetupInstructions;