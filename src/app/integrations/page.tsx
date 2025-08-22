"use client";

import React from 'react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, Settings, ArrowRight } from "lucide-react";

// Integration logos - Official brand representations
const ZapierLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#FF4A00"/>
    <path d="M32 16H25.41L16 24L25.41 32H32L22.59 24L32 16Z" fill="white"/>
    <path d="M22.59 16H16L25.41 24L16 32H22.59L32 24L22.59 16Z" fill="white"/>
  </svg>
);

const GoogleDV360Logo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#FFFFFF"/>
    <g>
      <path d="M21.8 24.2v-5.1h13.6c.1.7.2 1.4.2 2.2 0 3-1 6.9-4.1 9.6-3 2.7-6.9 4.1-12 4.1-9.5 0-17.5-7.7-17.5-17.2S10.5.6 20 .6c5.1 0 8.8 2 11.5 4.6l-4.8 4.8c-1.6-1.5-3.8-2.7-6.7-2.7-5.5 0-9.8 4.4-9.8 9.9s4.3 9.9 9.8 9.9c3.6 0 5.6-1.4 6.9-2.7.9-.9 1.6-2.3 1.8-4.1h-8.7v.1h2z" fill="#4285F4"/>
      <path d="M44 36c0 6.6-5.4 12-12 12s-12-5.4-12-12 5.4-12 12-12 12 5.4 12 12z" fill="#EA4335"/>
      <text x="32" y="40" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">360</text>
    </g>
  </svg>
);

const InstagramLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="inst-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD521"/>
        <stop offset="50%" stopColor="#F50000"/>
        <stop offset="100%" stopColor="#B900B4"/>
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="12" fill="url(#inst-grad)"/>
    <rect x="11" y="11" width="26" height="26" rx="8" stroke="white" strokeWidth="2.5" fill="none"/>
    <circle cx="24" cy="24" r="6" stroke="white" strokeWidth="2.5" fill="none"/>
    <circle cx="31.5" cy="16.5" r="2" fill="white"/>
  </svg>
);

const WhatsAppLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#25D366"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M32.95 15.05A11.9 11.9 0 0024 11c-6.6 0-12 5.4-12 12 0 2.1.6 4.1 1.6 5.9L12 36l7.3-1.9c1.7.9 3.7 1.4 5.7 1.4 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.5-8.45zM24 33c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-3.8 1L15.5 29l-.3-.4A8.9 8.9 0 0114 24c0-5 4-9 9-9 2.4 0 4.6.9 6.3 2.7A8.9 8.9 0 0132 24c0 5-4 9-9 9zm5-6.7c-.3-.1-1.6-.8-1.8-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.8-.1-.3 0-.4.1-.5l.3-.4.3-.4c.1-.1.1-.3 0-.4-.1-.1-.7-1.5-.9-2.1-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.1 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" fill="white"/>
  </svg>
);

const FacebookLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#1877F2"/>
    <path d="M33 31L31.5 24H25.5V20.5C25.5 18.5 26.5 17 28.5 17H32V11C32 11 29 10.5 26.5 10.5C21 10.5 18 13.5 18 19.5V24H12V31H18V48C20.5 48.5 23 48.5 25.5 48V31H33Z" fill="white"/>
  </svg>
);

const CalendlyLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#006BFF"/>
    <path d="M16 12C16 10.9 16.9 10 18 10H30C31.1 10 32 10.9 32 12V14H34C35.1 14 36 14.9 36 16V36C36 37.1 35.1 38 34 38H14C12.9 38 12 37.1 12 36V16C12 14.9 12.9 14 14 14H16V12Z" fill="white"/>
    <rect x="16" y="12" width="16" height="4" rx="1" fill="#006BFF"/>
    <circle cx="20" cy="22" r="2" fill="#006BFF"/>
    <circle cx="28" cy="22" r="2" fill="#006BFF"/>
    <circle cx="20" cy="28" r="2" fill="#006BFF"/>
    <circle cx="24" cy="28" r="2" fill="#006BFF"/>
    <circle cx="28" cy="28" r="2" fill="#006BFF"/>
    <circle cx="24" cy="32" r="2" fill="#006BFF"/>
  </svg>
);

const TelegramLogo = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#2AABEE"/>
    <path d="M34.4 14.5L13.6 22.9C12.5 23.3 12.5 24.7 13.6 25.1L18.5 26.9L21.4 35.5C21.8 36.6 23.2 36.6 23.6 35.5L27.5 26.9L34.4 14.5Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  </svg>
);

const GoogleCloudLogo = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="#4285F4"/>
        <path d="M24 12C17.37 12 12 17.37 12 24C12 30.63 17.37 36 24 36C30.63 36 36 30.63 36 24C36 17.37 30.63 12 24 12ZM24 32C19.58 32 16 28.42 16 24C16 19.58 19.58 16 24 16C28.42 16 32 19.58 32 24C32 28.42 28.42 32 24 32Z" fill="white"/>
        <path d="M24 18L24 30" stroke="white" stroke-width="2"/>
        <path d="M18 24L30 24" stroke="white" stroke-width="2"/>
    </svg>
);

const AWSLogo = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="#232F3E"/>
        <path d="M24.2,34.5c-3.2,0-5.8-2.6-5.8-5.8s2.6-5.8,5.8-5.8s5.8,2.6,5.8,5.8S27.4,34.5,24.2,34.5z M24.2,24.8c-2.1,0-3.8,1.7-3.8,3.8s1.7,3.8,3.8,3.8s3.8-1.7,3.8-3.8S26.3,24.8,24.2,24.8z" fill="#FF9900"/>
        <path d="M14.4,22.4c-1.3,0-2.4-1.1-2.4-2.4s1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4S15.7,22.4,14.4,22.4z" fill="#FF9900"/>
        <path d="M34,22.4c-1.3,0-2.4-1.1-2.4-2.4s1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4S35.3,22.4,34,22.4z" fill="#FF9900"/>
    </svg>
);

const AzureLogo = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="#0078D4"/>
        <path d="M19.5 17.5L24 28L19.5 38.5L10 28L19.5 17.5Z" fill="white"/>
        <path d="M28.5 17.5L38 28L28.5 38.5" stroke="white" stroke-width="2" fill="none"/>
    </svg>
);

const MongoDBLogo = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill="#47A248"/>
        <path d="M24,13.2c-6.9,0-12.5,4.8-12.5,10.8c0,4.2,2.4,7.9,6,9.6l-2.3,4.9h17.6l-2.3-4.9c3.6-1.7,6-5.4,6-9.6C36.5,18,30.9,13.2,24,13.2z M24,31.5c-4.1,0-7.5-2.9-7.5-6.5s3.4-6.5,7.5-6.5s7.5,2.9,7.5,6.5S28.1,31.5,24,31.5z" fill="white"/>
    </svg>
);

const WorkatoLogo = ({ size }: { size: number }) => (

  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#6366F1"/>
    <path d="M14 14L24 24L34 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 24L24 34L34 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="14" cy="14" r="2" fill="white"/>
    <circle cx="24" cy="24" r="2" fill="white"/>
    <circle cx="34" cy="14" r="2" fill="white"/>
    <circle cx="14" cy="24" r="2" fill="white"/>
    <circle cx="24" cy="34" r="2" fill="white"/>
    <circle cx="34" cy="24" r="2" fill="white"/>
  </svg>
);

const integrations = [
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect Customer 360 with 5000+ apps and automate workflows',
    icon: <ZapierLogo size={64} />,
    status: 'connected',
    features: ['Automated workflows', 'Multi-step zaps', 'Custom triggers', 'Real-time sync'],
    lastSync: '2 minutes ago',
  },
  {
    id: 'google-dv360',
    name: 'Google Display & Video 360',
    description: 'Manage and optimize display and video advertising campaigns',
    icon: <GoogleDV360Logo size={64} />,
    status: 'connected',
    features: ['Campaign management', 'Audience targeting', 'Performance tracking', 'Creative optimization'],
    lastSync: '15 minutes ago',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Engage with customers through Instagram posts, stories, and ads',
    icon: <InstagramLogo size={64} />,
    status: 'disconnected',
    features: ['Post scheduling', 'Story automation', 'Audience insights', 'Ad management'],
    lastSync: null,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Send personalized messages and provide customer support via WhatsApp',
    icon: <WhatsAppLogo size={64} />,
    status: 'connected',
    features: ['Business messaging', 'Automated responses', 'Customer support', 'Message templates'],
    lastSync: '1 hour ago',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Manage Facebook pages, ads, and customer interactions',
    icon: <FacebookLogo size={64} />,
    status: 'disconnected',
    features: ['Page management', 'Ad campaigns', 'Audience insights', 'Messenger integration'],
    lastSync: null,
  },
  {
    id: 'calendly',
    name: 'Calendly',
    description: 'Sync meeting data and automate follow-ups with scheduled appointments',
    icon: <CalendlyLogo size={64} />,
    status: 'connected',
    features: ['Meeting scheduling', 'Calendar sync', 'Automated follow-ups', 'Event tracking'],
    lastSync: '30 minutes ago',
  },
  {
    id: 'workato',
    name: 'Workato',
    description: 'Enterprise automation platform for complex business processes',
    icon: <WorkatoLogo size={64} />,
    status: 'disconnected',
    features: ['Enterprise automation', 'Data integration', 'Business logic', 'API management'],
    lastSync: null,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Engage with customers through Telegram messages and channels',
    icon: <TelegramLogo size={64} />,
    status: 'disconnected',
    features: ['Channel messaging', 'Group automation', 'Customer support', 'Message templates'],
    lastSync: null,
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    description: 'Leverage Google Cloud services for data storage, analytics, and more',
    icon: <GoogleCloudLogo size={64} />,
    status: 'disconnected',
    features: ['Cloud storage', 'BigQuery analytics', 'AI/ML services', 'Compute Engine'],
    lastSync: null,
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    description: 'Utilize AWS for scalable cloud computing and data services',
    icon: <AWSLogo size={64} />,
    status: 'disconnected',
    features: ['S3 storage', 'Redshift data warehouse', 'EC2 compute', 'Lambda functions'],
    lastSync: null,
  },
  {
    id: 'microsoft-azure',
    name: 'Microsoft Azure',
    description: 'Integrate with Azure cloud services for enterprise solutions',
    icon: <AzureLogo size={64} />,
    status: 'disconnected',
    features: ['Blob storage', 'SQL database', 'Azure Functions', 'Machine Learning'],
    lastSync: null,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'Connect to your MongoDB databases for seamless data access',
    icon: <MongoDBLogo size={64} />,
    status: 'disconnected',
    features: ['Database queries', 'Real-time sync', 'Data-driven triggers', 'Customer profiles'],
    lastSync: null,
  },
];

export default function IntegrationsPage() {
  return (
    <StaticExportLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-2">Connect your favorite tools and services to Customer 360</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  {integration.icon}
                </div>
                <Badge
                  variant={integration.status === 'connected' ? 'default' : 'secondary'}
                  className={
                    integration.status === 'connected'
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }
                >
                  {integration.status === 'connected' ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </>
                  ) : (
                    'Not Connected'
                  )}
                </Badge>
              </div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">{integration.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Features</h4>
                <div className="space-y-1">
                  {integration.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {integration.lastSync && (
                <div className="text-xs text-gray-500 mb-4">
                  Last synced: {integration.lastSync}
                </div>
              )}

              <div className="flex gap-2">
                {integration.status === 'connected' ? (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Need more integrations?</h3>
              <p className="text-sm text-gray-600">
                We're constantly adding new integrations. Let us know what tools you'd like to connect.
              </p>
            </div>
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              <ExternalLink className="w-4 h-4 mr-2" />
              Request Integration
            </Button>
          </div>
        </Card>
      </div>
    </StaticExportLayout>
  );
}