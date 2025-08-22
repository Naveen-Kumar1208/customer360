"use client";

import React, { useState, forwardRef, useEffect } from 'react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlusCircle, Download, Save, ArrowLeft, BookOpen, Play, BarChart2, HelpCircle, MoreHorizontal } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import type { ConnectDropTarget } from 'react-dnd';

// Custom icon components
const UserPlus = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
);

const ShoppingBag = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const Globe = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const Bell = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const Mail = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MessageSquare = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const MessageCircle = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const GitBranch = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"></line>
    <circle cx="18" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <path d="M18 9a9 9 0 0 1-9 9"></path>
  </svg>
);

const Users = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Clock = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Calendar = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const X = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ArrowRight = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const Sparkles = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
  </svg>
);

// Sample data for charts
const dailyMetricsData = [
  {day: '05/10', opens: 750, clicks: 320, conversions: 90},
  {day: '05/11', opens: 850, clicks: 420, conversions: 150},
  {day: '05/12', opens: 600, clicks: 280, conversions: 70},
  {day: '05/13', opens: 900, clicks: 450, conversions: 200},
  {day: '05/14', opens: 800, clicks: 380, conversions: 160},
  {day: '05/15', opens: 700, clicks: 350, conversions: 130},
  {day: '05/16', opens: 950, clicks: 480, conversions: 210},
];

// Template library data
const templateLibrary = {
  email: [
    {
      id: 1,
      name: 'Welcome Series - Day 1',
      category: 'Onboarding',
      subject: 'Welcome to {{company_name}}! Let\'s get you started',
      content: `Hi {{first_name}},\n\nWelcome to {{company_name}}! We're thrilled to have you join our community.\n\nTo get the most out of your experience, here are a few things you can do right away:\n\n✅ Complete your profile\n✅ Explore our featured products\n✅ Join our community forum\n\nNeed help? Just reply to this email and we'll get back to you within 24 hours.\n\nBest regards,\nThe {{company_name}} Team`,
      previewImage: '/api/placeholder/300/200',
      metrics: { openRate: '68%', clickRate: '24%', conversionRate: '12%' }
    },
    {
      id: 2,
      name: 'Abandoned Cart Recovery',
      category: 'E-commerce',
      subject: 'You left something behind! Complete your order',
      content: `Hi {{first_name}},\n\nWe noticed you left some great items in your cart. Don't worry, we've saved them for you!\n\n{{cart_items}}\n\nComplete your purchase now and get FREE shipping on orders over $50.\n\n[Complete Order Button]\n\nThis offer expires in 24 hours.\n\nHappy shopping!\n{{company_name}}`,
      previewImage: '/api/placeholder/300/200',
      metrics: { openRate: '45%', clickRate: '18%', conversionRate: '8%' }
    },
    {
      id: 3,
      name: 'Product Recommendation',
      category: 'Marketing',
      subject: 'You might love these products, {{first_name}}',
      content: `Hi {{first_name}},\n\nBased on your recent activity, we think you'll love these products:\n\n{{recommended_products}}\n\n[Shop Now Button]\n\nPlus, use code SAVE15 for 15% off your next order!\n\nBest,\n{{company_name}} Team`,
      previewImage: '/api/placeholder/300/200',
      metrics: { openRate: '52%', clickRate: '16%', conversionRate: '6%' }
    }
  ],
  sms: [
    {
      id: 1,
      name: 'Order Confirmation',
      category: 'Transactional',
      content: 'Hi {{first_name}}! Your order #{{order_number}} has been confirmed. Track it here: {{tracking_link}}',
      metrics: { deliveryRate: '99%', clickRate: '35%', conversionRate: '28%' }
    },
    {
      id: 2,
      name: 'Flash Sale Alert',
      category: 'Promotional',
      content: '🔥 FLASH SALE: 50% off everything! Use code FLASH50. Ends in 2 hours: {{shop_link}}',
      metrics: { deliveryRate: '98%', clickRate: '28%', conversionRate: '15%' }
    },
    {
      id: 3,
      name: 'Cart Abandonment',
      category: 'E-commerce',
      content: 'Hey {{first_name}}, you forgot something! Complete your order & get free shipping: {{cart_link}}',
      metrics: { deliveryRate: '99%', clickRate: '22%', conversionRate: '9%' }
    }
  ],
  whatsapp: [
    {
      id: 1,
      name: 'Order Update',
      category: 'Transactional',
      content: 'Hello {{first_name}}! 📦 Your order is on its way! Expected delivery: {{delivery_date}}. Track here: {{tracking_link}}',
      metrics: { deliveryRate: '97%', readRate: '92%', clickRate: '45%' }
    },
    {
      id: 2,
      name: 'Welcome Message',
      category: 'Onboarding',
      content: 'Hi {{first_name}}! 👋 Welcome to {{company_name}}! We\'re excited to have you. Need help? Just reply to this message!',
      metrics: { deliveryRate: '98%', readRate: '89%', clickRate: '32%' }
    },
    {
      id: 3,
      name: 'Special Offer',
      category: 'Promotional',
      content: '🎉 Exclusive offer for you, {{first_name}}! Get 25% off your next purchase. Use: SAVE25 {{shop_link}}',
      metrics: { deliveryRate: '96%', readRate: '85%', clickRate: '28%' }
    }
  ]
};

interface Template {
  subject?: string;
  content: string;
  previewImage?: string | null;
}

interface TemplateEditorProps {
  onClose: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 h-3/4 p-6">
        <h2 className="text-xl font-semibold mb-4">Template Editor</h2>
        {/* Add template editor content */}
      </div>
    </div>
  );
};

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 h-3/4 p-6">
        <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
        {/* Add AI assistant content */}
      </div>
    </div>
  );
};

// DnD item types
const SIDEBAR_ITEM = 'SIDEBAR_ITEM';

// Node type definition
interface NodeType {
  id: number;
  label: string;
  icon: React.ReactNode;
  type: 'entry' | 'action' | 'condition' | 'delay' | 'exit';
  branches?: { label: string; nodes: NodeType[] }[];
}

// Sidebar option component
const SidebarOption = forwardRef(({ item, onClick }: { item: any, onClick: (item: any) => void }, ref: React.Ref<HTMLDivElement>) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: SIDEBAR_ITEM,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [item]);

  // Combine drag and forwarded ref
  const setRefs = (node: HTMLDivElement | null) => {
    drag(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return (
    <div
      ref={setRefs}
      className={
        `${item.className} ${isDragging ? 'opacity-50' : ''}`
      }
      style={{ cursor: 'grab' }}
      onClick={() => onClick(item)}
    >
      {item.icon}
      <span className="text-sm font-medium text-gray-800 ml-2">{item.label}</span>
    </div>
  );
});


const AutomationBuilder = () => {
  const [currentView, setCurrentView] = useState('list'); // list, builder, analytics
  const [showSmartAssistant, setShowSmartAssistant] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [templateType, setTemplateType] = useState<'email' | 'sms' | 'whatsapp'>('email');
  const [currentTemplate, setCurrentTemplate] = useState<{
    subject: string;
    content: string;
    previewImage: string | null;
  }>({
    subject: '',
    content: '',
    previewImage: null
  });
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [templateLibraryView, setTemplateLibraryView] = useState('library'); // library, editor
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [editNode, setEditNode] = useState<NodeType | null>(null);
  const [showNodeMenu, setShowNodeMenu] = useState<number | null>(null);
  const [templateModalNode, setTemplateModalNode] = useState<NodeType | null>(null);
  const [templateTab, setTemplateTab] = useState<'library' | 'create'>('library');
  const [templateCategory, setTemplateCategory] = useState('All Categories');

  // Drop target for canvas
  const [{ isOver }, drop] = useDrop(() => ({
    accept: SIDEBAR_ITEM,
    drop: (item: any, monitor) => {
      // Only add to main nodes if not dropped on a nested target
      if (!monitor.didDrop()) {
        setNodes((prev) => [...prev, createNode(item)]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), []);

  // Helper to create a new node
  const createNode = (item: any): NodeType => {
    if (item.type === 'condition') {
      // For all conditions, create two branches
      return {
        id: Date.now() + Math.random(),
        label: item.label,
        icon: item.icon,
        type: item.type,
        branches: [
          { label: item.label === 'If/Else Branch' ? 'If' : 'Match', nodes: [] },
          { label: item.label === 'If/Else Branch' ? 'Else' : 'No Match', nodes: [] },
        ],
      };
    }
    return {
      id: Date.now() + Math.random(),
      label: item.label,
      icon: item.icon,
      type: item.type,
    };
  };

  const handleSidebarOptionClick = (item: any) => {
    // Only add to main canvas when clicked, not when dragging to branches
    setNodes((prev) => [...prev, createNode(item)]);
  };

  // Sidebar options data
  const entryPoints = [
    { label: 'Sign Up', icon: <UserPlus size={20} />, type: 'entry', className: 'group bg-green-50 border border-green-200 rounded-lg p-2.5 flex items-center hover:bg-green-100 transition-colors shadow-sm mb-2' },
    { label: 'Purchase', icon: <ShoppingBag size={20} />, type: 'entry', className: 'group bg-white border border-gray-200 rounded-lg p-2.5 flex items-center hover:bg-gray-100 transition-colors shadow-sm mb-2' },
    { label: 'Website Visit', icon: <Globe size={20} />, type: 'entry', className: 'group bg-white border border-gray-200 rounded-lg p-2.5 flex items-center hover:bg-gray-100 transition-colors shadow-sm mb-2' },
    { label: 'App Open', icon: <Bell size={20} />, type: 'entry', className: 'group bg-white border border-gray-200 rounded-lg p-2.5 flex items-center hover:bg-gray-100 transition-colors shadow-sm mb-2' },
  ];
  const actions = [
    { label: 'Send Email', icon: <Mail size={20} />, type: 'action', className: 'group bg-white border border-blue-200 rounded-lg p-2.5 flex items-center hover:bg-blue-50 transition-all shadow-sm mb-2' },
    { label: 'Send SMS', icon: <MessageSquare size={20} />, type: 'action', className: 'group bg-white border border-blue-200 rounded-lg p-2.5 flex items-center hover:bg-blue-50 transition-all shadow-sm mb-2' },
    { label: 'Send WhatsApp', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.72 11.06a4.72 4.72 0 1 1-4.72-4.72 4.72 4.72 0 0 1 4.72 4.72z"/><path d="M2.05 21.94l1.43-5.19A9 9 0 1 1 21.94 2.05a9 9 0 0 1-15.65 9.36l-5.19 1.43z"/></svg>, type: 'action', className: 'group bg-white border border-green-200 rounded-lg p-2.5 flex items-center hover:bg-green-50 transition-all shadow-sm mb-2' },
    { label: 'Push Notification', icon: <Bell size={20} />, type: 'action', className: 'group bg-white border border-blue-200 rounded-lg p-2.5 flex items-center hover:bg-blue-50 transition-all shadow-sm mb-2' },
    { label: 'In-App Message', icon: <MessageCircle size={20} />, type: 'action', className: 'group bg-white border border-blue-200 rounded-lg p-2.5 flex items-center hover:bg-blue-50 transition-all shadow-sm mb-2' },
  ];
  const conditions = [
    { label: 'If/Else Branch', icon: <GitBranch size={20} />, type: 'condition', className: 'group bg-purple-50 border border-purple-200 rounded-lg p-2.5 flex items-center hover:bg-purple-100 transition-colors shadow-sm mb-2' },
    { label: 'Segment Filter', icon: <Users size={20} />, type: 'condition', className: 'group bg-purple-50 border border-purple-200 rounded-lg p-2.5 flex items-center hover:bg-purple-100 transition-colors shadow-sm mb-2' },
  ];
  const delays = [
    { label: 'Wait 24 Hours', icon: <Clock size={20} />, type: 'delay', className: 'group bg-yellow-50 border border-yellow-200 rounded-lg p-2.5 flex items-center hover:bg-yellow-100 transition-colors shadow-sm mb-2' },
    { label: 'Wait 3 Days', icon: <Calendar size={20} />, type: 'delay', className: 'group bg-yellow-50 border border-yellow-200 rounded-lg p-2.5 flex items-center hover:bg-yellow-100 transition-colors shadow-sm mb-2' },
    { label: 'Wait Until', icon: <Clock size={20} />, type: 'delay', className: 'group bg-yellow-50 border border-yellow-200 rounded-lg p-2.5 flex items-center hover:bg-yellow-100 transition-colors shadow-sm mb-2' },
  ];
  const exits = [
    { label: 'End Journey', icon: <X size={20} />, type: 'exit', className: 'group bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-center hover:bg-red-100 transition-colors shadow-sm mb-2' },
    { label: 'Move to Another Journey', icon: <ArrowRight size={20} />, type: 'exit', className: 'group bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-center hover:bg-red-100 transition-colors shadow-sm mb-2' },
  ];

  const handleTemplateClick = (type: 'email' | 'sms' | 'whatsapp') => {
    setTemplateType(type);
    setShowTemplateEditor(true);
    setTemplateLibraryView('library');
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentTemplate({
      subject: template.subject || '',
      content: template.content,
      previewImage: template.previewImage || null
    });
    setTemplateLibraryView('editor');
  };

  const generateAIImage = () => {
    setShowImageGenerator(true);
    // Simulate AI image generation
    setTimeout(() => {
      setCurrentTemplate(prev => ({
        ...prev,
        previewImage: '/api/placeholder/400/300'
      }));
      setShowImageGenerator(false);
    }, 2000);
  };

  // Function to handle view changes
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  // Sample data for automations list
  const automations = [
    {
      id: 1,
      name: 'Welcome Series',
      description: 'Onboarding automation for new users',
      status: 'Active',
      lastModified: '2025-05-10',
      metrics: {
        conversion: '24%',
        engagement: '68%',
        revenue: '$12,450'
      }
    },
    {
      id: 2,
      name: 'Abandoned Cart Recovery',
      description: 'Re-engage users who left items in cart',
      status: 'Active',
      lastModified: '2025-05-15',
      metrics: {
        conversion: '15%',
        engagement: '42%',
        revenue: '$8,320'
      }
    },
    {
      id: 3,
      name: 'Re-engagement Campaign',
      description: 'Target inactive users after 30 days',
      status: 'Inactive',
      lastModified: '2025-04-28',
      metrics: {
        conversion: '8%',
        engagement: '31%',
        revenue: '$3,150'
      }
    }
  ];

  // Render the automation list view
  const renderAutomationsList = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Customer Automation Builder</h1>
          <div className="flex space-x-3">
            <button 
              className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-colors text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm" 
              onClick={() => handleViewChange('builder')}
            >
              <PlusCircle size={16} className="mr-2" />
              Create New Automation
            </button>
            <button className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow-sm">
              <Download size={16} className="mr-2" />
              Import Automations
            </button>
            <button className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow-sm">
              <Download size={16} className="mr-2" />
              Export Automations
            </button>
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search automations..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors px-4 py-2.5 rounded-md text-sm font-medium shadow-sm">
              <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filters
            </button>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2.5 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 shadow-sm">
                <option>Sort: Last Modified</option>
                <option>Sort: Name</option>
                <option>Sort: Status</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Automation Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metrics
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {automations.map((automation) => (
                <tr key={automation.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleViewChange('builder')}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">{automation.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{automation.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      automation.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {automation.status === 'Active' && (
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 inline-block my-auto"></span>
                      )}
                      {automation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {automation.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center text-xs">
                        <span className="text-gray-500 w-14">Conv:</span> 
                        <div className="flex-1 mx-2">
                          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: automation.metrics.conversion.replace('%', '') + '%' }}
                            ></div>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900 tabular-nums">{automation.metrics.conversion}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-gray-500 w-14">Eng:</span> 
                        <div className="flex-1 mx-2">
                          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: automation.metrics.engagement.replace('%', '') + '%' }}
                            ></div>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900 tabular-nums">{automation.metrics.engagement}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-gray-500 w-14">Rev:</span> 
                        <span className="font-medium text-gray-900 tabular-nums">{automation.metrics.revenue}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render the automation builder view
  const renderAutomationBuilder = () => {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Customer Automation Builder</h1>
          <div className="flex space-x-3">
            <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm">
              <PlusCircle size={16} className="mr-2" />
              Create New Automation
            </button>
            <button className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow-sm">
              <Download size={16} className="mr-2" />
              Import Automations
            </button>
            <button className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow-sm">
              <Download size={16} className="mr-2" />
              Export Automations
            </button>
          </div>
        </div>
        
        <div className="flex h-full">
          {/* Left sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto">
            {/* ENTRY POINTS */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 px-2">Entry Points</h3>
              <div className="space-y-2">
                {entryPoints.map((item) => (
                  <SidebarOption key={item.label} item={item} onClick={handleSidebarOptionClick} />
                ))}
              </div>
            </div>
            {/* ACTIONS */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 px-2">Actions</h3>
              <div className="space-y-2">
                {actions.map((item) => (
                  <SidebarOption key={item.label} item={item} onClick={handleSidebarOptionClick} />
                ))}
              </div>
            </div>
            {/* CONDITIONS */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 px-2">Conditions</h3>
              <div className="space-y-2">
                {conditions.map((item) => (
                  <SidebarOption key={item.label} item={item} onClick={handleSidebarOptionClick} />
                ))}
              </div>
            </div>
            {/* DELAYS */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 px-2">Delays</h3>
              <div className="space-y-2">
                {delays.map((item) => (
                  <SidebarOption key={item.label} item={item} onClick={handleSidebarOptionClick} />
                ))}
              </div>
            </div>
            {/* EXITS */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 px-2">Exits</h3>
              <div className="space-y-2">
                {exits.map((item) => (
                  <SidebarOption key={item.label} item={item} onClick={handleSidebarOptionClick} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Main canvas */}
          <div ref={node => { if (node) drop(node); }} className={`flex-1 relative overflow-auto p-8 bg-white ${isOver ? 'ring-2 ring-indigo-400' : ''}`}>
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">New Automation</h2>
                <p className="text-sm text-gray-500">Automation description</p>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all" onClick={() => setShowSmartAssistant(true)}>
                  <Sparkles size={16} />
                  <span className="ml-2">Smart Automation</span>
                </button>
                <button className="flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all">
                  <Play size={16} />
                  <span className="ml-2">Activate</span>
                </button>
                <button className="flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all" onClick={() => setCurrentView('analytics')}>
                  <BarChart2 size={16} />
                  <span className="ml-2">Analytics</span>
                </button>
                <button className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 w-10 h-10 rounded-md text-sm shadow-sm transition-all">
                  <HelpCircle size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8">
              {renderNodes(nodes)}
            </div>
          </div>
          
          {/* Smart Automation Assistant */}
          {showSmartAssistant && (
            <div className="absolute right-8 bottom-20 w-96 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-10">
              {/* Add smart assistant content */}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render the analytics view
  const renderAnalytics = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Automation Analytics</h1>
          <div className="flex space-x-3">
            <button className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow-sm" onClick={() => handleViewChange('list')}>
              <ArrowLeft size={16} className="mr-2" />
              Back to List
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Metrics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyMetricsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="opens" stroke="#8884d8" />
                <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
                <Line type="monotone" dataKey="conversions" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // Render the template library view
  const renderTemplateLibrary = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Template Library</h1>
          <div className="flex space-x-3">
            <button className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow-sm" onClick={() => handleViewChange('list')}>
              <ArrowLeft size={16} className="mr-2" />
              Back to List
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Email Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templateLibrary.email.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-md font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.category}</p>
                <p className="text-sm text-gray-700 mt-2">{template.subject}</p>
                <div className="mt-4">
                  <img src={template.previewImage} alt={template.name} className="w-full h-32 object-cover rounded-md" />
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-xs text-gray-500">Open Rate: {template.metrics.openRate}</span>
                  <span className="text-xs text-gray-500">Click Rate: {template.metrics.clickRate}</span>
                  <span className="text-xs text-gray-500">Conversion Rate: {template.metrics.conversionRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Helper for branch label visuals
  const getBranchLabelStyle = (label: string) => {
    if (label === 'If' || label === 'Match') {
      return {
        badge: 'bg-green-100 text-green-700',
        icon: (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
        ),
      };
    }
    if (label === 'Else' || label === 'No Match') {
      return {
        badge: 'bg-red-100 text-red-700',
        icon: (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
        ),
      };
    }
    return { badge: 'bg-gray-100 text-gray-700', icon: null };
  };

  // Helper to get node style based on label/type
  const getNodeStyle = (label: string) => {
    if (label === 'Sign Up' || label === 'Purchase' || label === 'Website Visit' || label === 'App Open') {
      return {
        container: 'bg-green-50 border border-green-100 shadow-[0_0_16px_0_rgba(34,197,94,0.15)] rounded-2xl px-8 py-6 flex items-center space-x-4 mb-2',
        icon: 'bg-green-100 text-green-600',
        text: 'text-gray-900 font-semibold',
      };
    }
    if (label === 'Send Email' || label === 'Send SMS' || label === 'Send WhatsApp' || label === 'Push Notification' || label === 'In-App Message') {
      return {
        container: 'bg-blue-50 border border-blue-100 shadow-[0_0_16px_0_rgba(59,130,246,0.10)] rounded-2xl px-8 py-6 flex items-center space-x-4 mb-2',
        icon: 'bg-blue-100 text-blue-600',
        text: 'text-gray-900 font-semibold',
      };
    }
    if (label === 'If/Else Branch' || label === 'Segment Filter') {
      return {
        container: 'bg-purple-50 border border-purple-100 shadow-[0_0_16px_0_rgba(168,85,247,0.10)] rounded-2xl px-8 py-6 flex items-center space-x-4 mb-2',
        icon: 'bg-purple-100 text-purple-600',
        text: 'text-gray-900 font-semibold',
      };
    }
    if (label.startsWith('Wait')) {
      return {
        container: 'bg-yellow-50 border border-yellow-100 shadow-[0_0_16px_0_rgba(251,191,36,0.10)] rounded-2xl px-8 py-6 flex items-center space-x-4 mb-2',
        icon: 'bg-yellow-100 text-yellow-600',
        text: 'text-gray-900 font-semibold',
      };
    }
    if (label === 'End Journey' || label === 'Move to Another Journey') {
      return {
        container: 'bg-red-50 border border-red-100 shadow-[0_0_16px_0_rgba(239,68,68,0.10)] rounded-2xl px-8 py-6 flex items-center space-x-4 mb-2',
        icon: 'bg-red-100 text-red-600',
        text: 'text-gray-900 font-semibold',
      };
    }
    return {
      container: 'bg-gray-50 border border-gray-200 rounded-2xl px-8 py-6 flex items-center space-x-4 mb-2',
      icon: 'bg-gray-100 text-gray-600',
      text: 'text-gray-900 font-semibold',
    };
  };

  const handleDeleteNode = (id: number) => {
    // Helper function to recursively delete node from branches
    const deleteFromNodes = (nodes: NodeType[]): NodeType[] => {
      return nodes.filter((n) => {
        if (n.id === id) return false;
        if (n.branches) {
          n.branches = n.branches.map(branch => ({
            ...branch,
            nodes: deleteFromNodes(branch.nodes)
          }));
        }
        return true;
      });
    };
    
    setNodes((prev) => deleteFromNodes(prev));
    setShowNodeMenu(null);
  };

  const handleEditNode = (node: NodeType) => {
    setEditNode(node);
    setShowNodeMenu(null);
  };

  const handleSaveEditNode = (label: string) => {
    if (!editNode) return;
    setNodes((prev) => prev.map((n) => n.id === editNode.id ? { ...n, label } : n));
    setEditNode(null);
  };

  // BranchDropZone component for branch drop targets
  const BranchDropZone = ({ branch, onDropNode, children }: {
    branch: { label: string; nodes: NodeType[] };
    onDropNode: (newNodes: NodeType[]) => void;
    children: React.ReactNode;
  }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: SIDEBAR_ITEM,
      drop: (item: any) => {
        onDropNode([...branch.nodes, createNode(item)]);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }), [branch.nodes]);
    return (
      <div
        ref={node => { if (node) drop(node); }}
        className={`w-full ${isOver ? 'ring-2 ring-indigo-400' : ''}`}
      >
        {children}
      </div>
    );
  };

  // Recursive node renderer
  const renderNodes = (nodes: NodeType[]) => (
    <React.Fragment>
      <div className="flex flex-col items-center space-y-8">
        {nodes.map((node, idx) => {
          const style = getNodeStyle(node.label);
          // Condition node: render split branches
          if (node.type === 'condition' && node.branches) {
            return (
              <React.Fragment key={node.id}>
                <div className={style.container + ' relative'} style={{ minWidth: 260, maxWidth: 320 }}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${style.icon}`}>{node.icon}</div>
                  <span className={`text-lg ${style.text}`}>{node.label}</span>
                  {/* Node actions button and menu (reuse from before) */}
                  <button
                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100"
                    onClick={(e) => { e.stopPropagation(); setShowNodeMenu(node.id === showNodeMenu ? null : node.id); }}
                    tabIndex={0}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  {showNodeMenu === node.id && (
                    <div className="absolute top-8 right-2 bg-white border border-gray-200 rounded shadow-lg z-10 w-28">
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={(e) => { e.stopPropagation(); handleEditNode(node); }}
                      >Edit</button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={(e) => { e.stopPropagation(); handleDeleteNode(node.id); }}
                      >Delete</button>
                    </div>
                  )}
                </div>
                {/* Connector lines and branches */}
                <div className="relative flex w-full justify-center items-start" style={{ minHeight: 120 }}>
                  {/* Horizontal connector from node to branches */}
                  <div className="absolute left-1/2 top-0" style={{ transform: 'translateX(-50%)', width: '60%', height: 28 }}>
                    <div className="w-full h-1 bg-gradient-to-r from-indigo-200 via-gray-300 to-indigo-200 rounded-full" />
                    {/* Vertical lines to each branch */}
                    <div className="absolute left-0 top-0 w-1 h-10 bg-gradient-to-b from-indigo-200 via-gray-300 to-gray-200 rounded-full" style={{ left: '10%' }} />
                    <div className="absolute right-0 top-0 w-1 h-10 bg-gradient-to-b from-indigo-200 via-gray-300 to-gray-200 rounded-full" style={{ right: '10%' }} />
                  </div>
                  {/* Branch columns */}
                  <div className="flex flex-1 justify-center gap-16 w-full pt-8">
                    {node.branches.map((branch, bIdx) => (
                      <div key={branch.label} className="flex flex-col items-start flex-1" style={{ minWidth: 300, maxWidth: 500 }}>
                        <div className={`mb-3 font-semibold text-xs flex items-center px-3 py-1.5 rounded-full ${getBranchLabelStyle(branch.label).badge}`}
                          style={{ boxShadow: '0 2px 6px 0 rgba(0,0,0,0.08)' }}>
                          {getBranchLabelStyle(branch.label).icon}
                          {branch.label}
                        </div>
                        <BranchDropZone
                          branch={branch}
                          onDropNode={(newNodes) => {
                            setNodes((prev) =>
                              prev.map((n) =>
                                n.id === node.id
                                  ? {
                                      ...n,
                                      branches: n.branches?.map((br, i) =>
                                        i === bIdx ? { ...br, nodes: newNodes } : br
                                      ),
                                    }
                                  : n
                              )
                            );
                          }}
                        >
                          <div className="w-full rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-50 shadow-lg border border-gray-200 p-4 transition-all duration-200 hover:shadow-xl hover:ring-2 hover:ring-indigo-200" style={{ minHeight: '200px' }}>
                            {renderNodes(branch.nodes)}
                            {branch.nodes.length === 0 && (
                              <div className="text-center py-8 text-gray-400">
                                <div className="mb-2">Drop actions here for {branch.label} path</div>
                                <div className="text-xs">or click the button below</div>
                              </div>
                            )}
                            <button
                              className="mt-4 w-full py-2 px-4 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors font-medium"
                              onClick={() => {
                                setNodes((prev) =>
                                  prev.map((n) =>
                                    n.id === node.id
                                      ? {
                                          ...n,
                                          branches: n.branches?.map((br, i) =>
                                            i === bIdx
                                              ? { ...br, nodes: [...br.nodes, createNode(actions[0])] }
                                              : br
                                          ),
                                        }
                                      : n
                                  )
                                );
                              }}
                            >+ Add Action to {branch.label}</button>
                          </div>
                        </BranchDropZone>
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            );
          }
          // Regular node
          return (
            <React.Fragment key={node.id}>
              <div
                className={style.container + ' relative cursor-pointer hover:ring-2 hover:ring-indigo-200'}
                style={{ minWidth: 260, maxWidth: 320 }}
                onClick={() => {
                  if (node.type === 'action') handleActionNodeClick(node);
                }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${style.icon}`}>{node.icon}</div>
                <span className={`text-lg ${style.text}`}>{node.label}</span>
                {/* Node actions button and menu (reuse from before) */}
                <button
                  className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100"
                  onClick={(e) => { e.stopPropagation(); setShowNodeMenu(node.id === showNodeMenu ? null : node.id); }}
                  tabIndex={0}
                >
                  <MoreHorizontal size={18} />
                </button>
                {showNodeMenu === node.id && (
                  <div className="absolute top-8 right-2 bg-white border border-gray-200 rounded shadow-lg z-10 w-28">
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={(e) => { e.stopPropagation(); handleEditNode(node); }}
                    >Edit</button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={(e) => { e.stopPropagation(); handleDeleteNode(node.id); }}
                    >Delete</button>
                  </div>
                )}
              </div>
              {idx < nodes.length - 1 && node.type !== 'condition' && (
                <div className="flex flex-col items-center">
                  <div className="h-8 w-0.5 bg-gray-200" />
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  </div>
                  <div className="h-8 w-0.5 bg-gray-200" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );

  // Action node click handler
  const handleActionNodeClick = (node: NodeType) => {
    setTemplateModalNode(node);
    setTemplateTab('library');
  };

  // ActionTemplateModal component
  const ActionTemplateModal = ({ node, onClose }: { node: NodeType, onClose: () => void }) => {
    // Filter templates by type and category
    const templates = templateLibrary[node.label.toLowerCase().includes('email') ? 'email' : node.label.toLowerCase().includes('sms') ? 'sms' : 'whatsapp'] || [];
    const filteredTemplates = templateCategory === 'All Categories'
      ? templates
      : templates.filter((t: any) => t.category === templateCategory);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-[800px] max-w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-xl">
            <div className="flex items-center text-white text-lg font-semibold">
              <span className="mr-2"><Mail size={22} /></span>
              {node.label} Templates
            </div>
            <button className="text-white text-2xl" onClick={onClose}>&times;</button>
          </div>
          {/* Tabs */}
          <div className="flex px-6 pt-4 space-x-2">
            <button
              className={`px-4 py-2 rounded-t-md font-medium ${templateTab === 'library' ? 'bg-white text-indigo-600 shadow' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setTemplateTab('library')}
            >Template Library</button>
            <button
              className={`px-4 py-2 rounded-t-md font-medium ${templateTab === 'create' ? 'bg-white text-indigo-600 shadow' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => setTemplateTab('create')}
            >Create Custom</button>
          </div>
          {/* Content */}
          <div className="px-6 pb-6 pt-2">
            {templateTab === 'library' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div></div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Filter by:</span>
                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                      value={templateCategory}
                      onChange={e => setTemplateCategory(e.target.value)}
                    >
                      <option>All Categories</option>
                      <option>Onboarding</option>
                      <option>E-commerce</option>
                      <option>Marketing</option>
                      <option>Transactional</option>
                      <option>Promotional</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredTemplates.map((tpl: any) => (
                    <div key={tpl.name} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col cursor-pointer hover:shadow-md" onClick={() => setSelectedTemplate(tpl)}>
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mr-2">{tpl.category}</span>
                        <span className="font-semibold text-gray-900">{tpl.name}</span>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">Subject: {tpl.subject}</div>
                      <div className="text-xs text-gray-500 mb-1">{tpl.content.slice(0, 120)}...</div>
                      <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                        <span>Open: {tpl.metrics.openRate || tpl.metrics.deliveryRate}</span>
                        <span>Click: {tpl.metrics.clickRate}</span>
                        <span>Conv: {tpl.metrics.conversionRate || tpl.metrics.conversionRate}</span>
                      </div>
                    </div>
                  ))}
                  {filteredTemplates.length === 0 && <div className="text-gray-400 text-center py-8">No templates found.</div>}
                </div>
              </>
            )}
            {templateTab === 'create' && (
              <div className="flex gap-8 mt-2">
                {/* Left: Form */}
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Subject Line</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Enter email subject..." />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea className="w-full border border-gray-300 rounded px-3 py-2 min-h-[120px]" placeholder="Enter email content..." />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Template Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                      <span className="text-gray-400 mb-2">Add an image to your template</span>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 rounded bg-gray-200 text-gray-700">Upload Image</button>
                        <button className="px-4 py-2 rounded bg-indigo-600 text-white">Generate AI Image</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right: Preview & Variables */}
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Preview</label>
                    <div className="border border-gray-200 rounded-lg p-4 min-h-[120px] bg-gray-50">
                      <div className="text-xs text-gray-500 mb-1">Subject: <span className="text-gray-700 font-medium">No subject</span></div>
                      <div className="text-gray-400">Start typing your email content...</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Available Variables</label>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="bg-gray-100 rounded px-2 py-1 text-xs">{'{{first_name}}'}</span>
                      <span className="bg-gray-100 rounded px-2 py-1 text-xs">{'{{last_name}}'}</span>
                      <span className="bg-gray-100 rounded px-2 py-1 text-xs">{'{{company_name}}'}</span>
                      <span className="bg-gray-100 rounded px-2 py-1 text-xs">{'{{email}}'}</span>
                      <span className="bg-gray-100 rounded px-2 py-1 text-xs">{'{{cart_items}}'}</span>
                      <span className="bg-gray-100 rounded px-2 py-1 text-xs">{'{{recommended_products}}'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50">
      {currentView === 'list' && renderAutomationsList()}
      {currentView === 'builder' && renderAutomationBuilder()}
      {currentView === 'analytics' && renderAnalytics()}
      {currentView === 'templateLibrary' && renderTemplateLibrary()}
      
      {/* Template Editor Modal */}
      {showTemplateEditor && <TemplateEditor onClose={() => setShowTemplateEditor(false)} />}
      
      {/* AI Assistant Modal */}
      {showAIAssistant && <AIAssistant onClose={() => setShowAIAssistant(false)} />}
      
      {/* Edit node modal */}
      {editNode && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Edit Node</h2>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={editNode.label}
              onChange={(e) => setEditNode({ ...editNode, label: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 rounded bg-gray-100" onClick={() => setEditNode(null)}>Cancel</button>
              <button className="px-4 py-2 rounded bg-indigo-600 text-white" onClick={() => handleSaveEditNode(editNode.label)}>Save</button>
            </div>
          </div>
        </div>
      )}
      
      {/* ActionTemplateModal */}
      {templateModalNode && (
        <ActionTemplateModal
          node={templateModalNode}
          onClose={() => setTemplateModalNode(null)}
        />
      )}
    </div>
  );
};

export default function AutomationPage() {
  return (
    <StaticExportLayout>
      <DndProvider backend={HTML5Backend}>
        <AutomationBuilder />
      </DndProvider>
    </StaticExportLayout>
  );
} 