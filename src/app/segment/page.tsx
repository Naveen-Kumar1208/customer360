"use client";

import { useState, useEffect, type ReactNode } from 'react';
import { Search, Users, Filter, Download, Eye, Edit, Trash2, Copy, Play, AlertCircle, BarChart2, Target, Brain, UserPlus, ArrowRight, ChevronDown, Mail, Smartphone, Bell, Calendar, Clock, ChevronRight, Plus, Info, Share2, ChevronUp, X, Clipboard, MessageCircle, FileText, Zap, Wifi, Globe, Settings, ChevronLeft } from 'lucide-react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";

// Mock Data
const mockContacts = [
  {
    id: 1,
    name: 'Raj Kumar',
    email: 'raj.kumar@example.com',
    status: 'Active',
    source: 'Website',
    tags: ['VIP', 'Mobile App User'],
    icon: <Globe className="text-[#e85b5e]" size={18} />,
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    status: 'Active',
    source: 'WhatsApp',
    tags: ['New User'],
    icon: <MessageCircle className="text-green-500" size={18} />,
  },
  {
    id: 3,
    name: 'Aditya Patel',
    email: 'aditya.patel@example.com',
    status: 'Inactive',
    source: 'Email Campaign',
    tags: ['Churned'],
    icon: <Mail className="text-[#e85b5e]" size={18} />,
  },
  {
    id: 4,
    name: 'Meera Desai',
    email: 'meera.desai@example.com',
    status: 'Active',
    source: 'Referral',
    tags: ['Paid User', 'Power User'],
    icon: <Share2 className="text-purple-500" size={18} />,
  },
  {
    id: 5,
    name: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    status: 'Active',
    source: 'Website',
    tags: ['Free Tier'],
    icon: <Globe className="text-[#e85b5e]" size={18} />,
  },
];

const mockSegments = [
  { id: 1, name: 'High-Value Customers', type: 'Manual', contacts: 250, lastUpdated: '2024-03-15', status: 'Active' },
  { id: 2, name: 'Engaged Users', type: 'Smart', contacts: 180, lastUpdated: '2024-03-14', status: 'Active' },
  { id: 3, name: 'At-Risk Customers', type: 'Smart', contacts: 45, lastUpdated: '2024-03-13', status: 'Active' },
  { id: 4, name: 'New Signups', type: 'Manual', contacts: 120, lastUpdated: '2024-03-12', status: 'Active' },
  { id: 5, name: 'VIP Customers', type: 'Lookalike', contacts: 75, lastUpdated: '2024-03-11', status: 'Active' },
];

const smartSegmentsData = [
  {
    id: 1,
    name: 'Likely to Convert',
    status: 'Active',
    trend: '+15%',
    trendColor: 'text-green-600',
    contacts: 2341,
    confidence: 'High Confidence',
    confidenceColor: 'bg-green-50 text-green-700',
    statusColor: 'bg-green-50 text-green-700',
    icon: <Brain className="text-purple-600" size={28} />,
    recommendation: 'Offer 10% discount',
    journey: [
      { icon: <Globe className="text-[#e85b5e]" size={22} />, label: 'Website Visit', value: '82%', desc: 'Visited pricing page' },
      { icon: <Mail className="text-[#e85b5e]" size={22} />, label: 'Email Open', value: '76%', desc: 'Opened promotional email' },
      { icon: <MessageCircle className="text-green-500" size={22} />, label: 'WhatsApp Engagement', value: '42%', desc: 'Responded to message' },
      { icon: <Wifi className="text-purple-500" size={22} />, label: 'App Activity', value: '38%', desc: 'Used app within 7 days' },
    ],
    creation: [
      { icon: <Brain className="text-purple-500" size={20} />, title: 'AI Analysis', desc: 'Identified patterns from customer behavior data' },
      { icon: <Filter className="text-[#e85b5e]" size={20} />, title: 'Smart Filters Applied', desc: 'Browsing habits, purchase history, engagement level' },
      { icon: <Target className="text-green-500" size={20} />, title: 'Prediction Model', desc: 'Applied machine learning for high confidence scoring' },
    ],
  },
  {
    id: 2,
    name: 'Churn Risk - 30 Days',
    status: 'Monitoring',
    trend: '+7%',
    trendColor: 'text-green-600',
    contacts: 876,
    confidence: 'Medium Confidence',
    confidenceColor: 'bg-yellow-50 text-yellow-800',
    statusColor: 'bg-yellow-50 text-yellow-800',
  },
  {
    id: 3,
    name: 'Upsell Candidates',
    status: 'Active',
    trend: '+19%',
    trendColor: 'text-green-600',
    contacts: 1204,
    confidence: 'High Confidence',
    confidenceColor: 'bg-green-50 text-green-700',
    statusColor: 'bg-green-50 text-green-700',
  },
  {
    id: 4,
    name: 'Dormant - Ready to Activate',
    status: 'Idle',
    trend: '-3%',
    trendColor: 'text-red-600',
    contacts: 3678,
    confidence: 'Medium Confidence',
    confidenceColor: 'bg-yellow-50 text-yellow-800',
    statusColor: 'bg-slate-100 text-slate-600',
  },
];

// Tab Button Component
type TabButtonProps = {
  label: string;
  icon?: ReactNode;
  active: boolean;
  onClick: () => void;
};
function TabButton({ label, icon, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
        active
          ? 'border-[#e85b5e] text-[#e85b5e]'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// AllContactsView
function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function AllContactsView() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Users className="bg-[#e85b5e]/10 text-[#e85b5e] rounded-full p-1" size={32} />
            <span className="text-xl font-semibold text-slate-900">All Contacts</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#e85b5e]/10 text-[#e85b5e] font-semibold">1,543</span>
          </div>
          <div className="text-slate-500 text-sm">Manage your entire customer database</div>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2 bg-[#e85b5e] hover:bg-[#c7494c] text-white rounded-lg font-medium text-sm shadow transition">
          <UserPlus size={18} />
          <span>Create New Segment</span>
        </button>
      </div>
      {/* Filters and search */}
      <div className="flex flex-wrap items-center gap-2 px-6 py-4 border-b border-slate-100 bg-slate-50">
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#e85b5e]/10 text-[#e85b5e] text-sm font-medium flex items-center gap-1">Active <X size={14} className="ml-1 cursor-pointer" /></span>
          <span className="px-3 py-1 rounded-lg bg-[#e85b5e]/10 text-[#e85b5e] text-sm font-medium flex items-center gap-1">Source: Website <X size={14} className="ml-1 cursor-pointer" /></span>
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e85b5e] focus:border-[#e85b5e]/20 shadow-sm transition-all duration-200"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          </div>
          <button className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium">
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e85b5e]/10 flex items-center justify-center text-[#e85b5e] font-bold text-base">
                    {getInitials(contact.name)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{contact.name}</div>
                    <div className="text-xs text-slate-500">{contact.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-700 text-sm">{contact.email}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2 text-sm">
                  {contact.icon}
                  <span>{contact.source}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1 ${contact.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}> 
                    <span className={`w-2 h-2 rounded-full ${contact.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  {contact.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">{tag}</span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#e85b5e] transition" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#e85b5e] transition" title="Add Person">
                      <UserPlus size={18} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#e85b5e] transition" title="Message">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Save as Segment link */}
      <div className="px-6 py-2 text-right">
        <a href="#" className="text-[#e85b5e] text-sm font-medium hover:underline">+ Save as Segment</a>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 text-sm">
        <div>Showing 5 of 1,543 contacts</div>
        <div className="flex items-center gap-2">
          <select className="border border-slate-200 rounded-lg px-2 py-1 text-sm">
            <option>10 per page</option>
            <option>25 per page</option>
            <option>50 per page</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-200" disabled>{'< Previous'}</button>
          <button className="px-3 py-1 rounded-lg bg-[#e85b5e] text-white font-semibold">1</button>
          <button className="px-3 py-1 rounded-lg text-slate-700 hover:bg-slate-200">2</button>
          <button className="px-3 py-1 rounded-lg text-slate-700 hover:bg-slate-200">3</button>
          <button className="px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-200">{'Next >'}</button>
        </div>
      </div>
    </div>
  );
}

// SegmentsView
function SegmentsView({ onCreateSegment }: { onCreateSegment: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Segments</h2>
          <button 
            onClick={onCreateSegment}
            className="flex items-center space-x-1 text-sm text-[#e85b5e] bg-[#e85b5e]/10 hover:bg-[#e85b5e]/20 px-3 py-1.5 rounded-lg transition-colors duration-150"
          >
            <Plus size={16} />
            <span>Create Segment</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contacts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mockSegments.map((segment) => (
              <tr key={segment.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{segment.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    segment.type === 'Manual' ? 'bg-[#e85b5e]/10 text-[#e85b5e]' :
                    segment.type === 'Smart' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {segment.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{segment.contacts}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{segment.lastUpdated}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {segment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <button className="text-slate-400 hover:text-slate-600">
                      <Eye size={16} />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Edit size={16} />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Copy size={16} />
                    </button>
                    <button className="text-slate-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// SmartSegmentsView
function SmartSegmentsView() {
  const [selected, setSelected] = useState<number | null>(null);
  const segment = selected !== null ? smartSegmentsData.find(s => s.id === selected) : null;

  if (segment) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow p-8">
        {/* Segment Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-purple-100 rounded-xl p-2">{segment.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-slate-900">{segment.name}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${segment.confidenceColor}`}>{segment.confidence}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${segment.statusColor}`}>{segment.status}</span>
            </div>
            <div className="text-green-600 font-semibold text-sm">{segment.trend} trend</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Contacts count and AI Recommendation */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="bg-purple-50 rounded-xl p-6 flex flex-col items-center">
              <div className="text-4xl font-bold text-slate-900">{segment.contacts.toLocaleString()}</div>
              <div className="text-slate-500 text-sm">contacts in this segment</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2 text-purple-700 font-semibold"><Brain size={18} /> AI Recommendation</div>
              <div className="bg-white rounded-lg px-4 py-2 text-slate-700 font-medium border border-purple-100">{segment.recommendation}</div>
              <div className="mt-2 text-right">
                <button className="text-purple-600 text-xs font-medium flex items-center gap-1 hover:underline"><Clipboard size={14} /> Copy to Campaign</button>
              </div>
            </div>
          </div>
          {/* Middle: How this segment was created */}
          <div className="col-span-1 md:col-span-2 bg-white rounded-xl p-6 border border-slate-100 flex flex-col">
            <div className="flex items-center gap-2 mb-3 text-slate-700 font-semibold"><Info size={18} /> How This Segment Was Created</div>
            <div className="flex flex-col gap-4">
              {segment.creation?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div>{item.icon}</div>
                  <div>
                    <div className="font-semibold text-slate-800">{item.title}</div>
                    <div className="text-slate-500 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg transition"><Play size={20} /> Use Segment</button>
              <button className="flex-1 border border-slate-200 text-slate-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg transition"><Settings size={20} /> Refine</button>
            </div>
          </div>
        </div>
        {/* Customer Journey Insights */}
        <div className="mt-10">
          <div className="text-lg font-semibold text-slate-700 mb-4">Customer Journey Insights</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {segment.journey?.map((j, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col items-start shadow-sm">
                <div className="flex items-center gap-2 mb-2">{j.icon}<span className="font-medium text-slate-700">{j.label}</span></div>
                <div className="text-3xl font-bold text-slate-900">{j.value}</div>
                <div className="text-slate-500 text-sm">{j.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-right">
          <button className="text-purple-600 font-medium text-sm hover:underline" onClick={() => setSelected(null)}>&larr; Back to Smart Segments</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 rounded-xl p-2"><Brain className="text-purple-600" size={32} /></div>
          <div>
            <div className="text-2xl font-bold text-slate-900">AI-Generated Smart Segments</div>
            <div className="text-slate-500">Automatically generated based on your customer data and business goals</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-semibold">Powered by AI</span>
          <button className="ml-2 p-2 rounded-lg hover:bg-slate-100"><Settings size={20} className="text-slate-400" /></button>
        </div>
      </div>
      {/* Info Alert */}
      <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-lg px-4 py-3 mb-6">
        <AlertCircle className="text-purple-500" size={20} />
        <span className="text-purple-700 text-sm">Smart Segments are continuously updated as new data comes in. They help you target the right customers at the right time with minimal manual effort.</span>
      </div>
      {/* Segment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {smartSegmentsData.map((seg) => (
          <div
            key={seg.id}
            className={`rounded-2xl border-2 ${selected === seg.id ? 'border-purple-600' : 'border-slate-100'} bg-white shadow-sm p-6 flex flex-col gap-2 cursor-pointer hover:shadow-md transition`}
            onClick={() => setSelected(seg.id)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${seg.statusColor}`}>{seg.status}</span>
              <span className={`ml-auto font-semibold ${seg.trendColor}`}>{seg.trend}</span>
            </div>
            <div className="font-bold text-lg text-slate-900 mb-1">{seg.name}</div>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2"><Users size={16} /> {seg.contacts.toLocaleString()} contacts</div>
            <div className={`w-fit px-3 py-1 rounded-full text-xs font-semibold ${seg.confidenceColor}`}>{seg.confidence}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmartSegmentDetailStatic() {
  const segment = smartSegmentsData[0];
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow p-8 mt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-6 mb-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="bg-purple-100 rounded-xl p-2"><Brain className="text-purple-600" size={32} /></div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-slate-900">{segment.name}</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">High Confidence</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">Active</span>
            </div>
          </div>
        </div>
        <div className="text-green-600 font-semibold text-lg">+15% trend</div>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Contacts count */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-slate-100 p-8 flex flex-col items-center">
            <div className="text-5xl font-bold text-slate-900">2,341</div>
            <div className="text-slate-500 text-base mt-1">contacts in this segment</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-2 text-purple-700 font-semibold"><Brain size={18} /> AI Recommendation</div>
            <div className="bg-slate-50 rounded-lg px-4 py-2 text-slate-700 font-medium border border-purple-100">Offer 10% discount</div>
            <div className="mt-2 text-right">
              <button className="text-purple-600 text-xs font-medium flex items-center gap-1 hover:underline"><Clipboard size={14} /> Copy to Campaign</button>
            </div>
          </div>
        </div>
        {/* How this segment was created */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
          <div className="bg-white rounded-xl border border-slate-100 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold"><Info size={18} /> How This Segment Was Created</div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-purple-100 p-2 rounded-full"><Brain className="text-purple-500" size={20} /></span>
                <div>
                  <div className="font-semibold text-slate-800">AI Analysis</div>
                  <div className="text-slate-500 text-sm">Identified patterns from customer behavior data</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-[#e85b5e]/10 p-2 rounded-full"><Filter className="text-[#e85b5e]" size={20} /></span>
                <div>
                  <div className="font-semibold text-slate-800">Smart Filters Applied</div>
                  <div className="text-slate-500 text-sm">Browsing habits, purchase history, engagement level</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-green-100 p-2 rounded-full"><Target className="text-green-500" size={20} /></span>
                <div>
                  <div className="font-semibold text-slate-800">Prediction Model</div>
                  <div className="text-slate-500 text-sm">Applied machine learning for high confidence scoring</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg transition"><Play size={20} /> Use Segment</button>
            <button className="flex-1 border border-slate-200 text-slate-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg transition"><Settings size={20} /> Refine</button>
          </div>
        </div>
      </div>
      {/* Customer Journey Insights */}
      <div>
        <div className="text-lg font-semibold text-slate-700 mb-4">Customer Journey Insights</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col items-start shadow-sm">
            <div className="flex items-center gap-2 mb-2"><Globe className="text-[#e85b5e]" size={22} /><span className="font-medium text-slate-700">Website Visit</span></div>
            <div className="text-3xl font-bold text-slate-900">82%</div>
            <div className="text-slate-500 text-sm">Visited pricing page</div>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col items-start shadow-sm">
            <div className="flex items-center gap-2 mb-2"><Mail className="text-[#e85b5e]" size={22} /><span className="font-medium text-slate-700">Email Open</span></div>
            <div className="text-3xl font-bold text-slate-900">76%</div>
            <div className="text-slate-500 text-sm">Opened promotional email</div>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col items-start shadow-sm">
            <div className="flex items-center gap-2 mb-2"><MessageCircle className="text-green-500" size={22} /><span className="font-medium text-slate-700">WhatsApp Engagement</span></div>
            <div className="text-3xl font-bold text-slate-900">42%</div>
            <div className="text-slate-500 text-sm">Responded to message</div>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col items-start shadow-sm">
            <div className="flex items-center gap-2 mb-2"><Wifi className="text-purple-500" size={22} /><span className="font-medium text-slate-700">App Activity</span></div>
            <div className="text-3xl font-bold text-slate-900">38%</div>
            <div className="text-slate-500 text-sm">Used app within 7 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// CreateSegmentView
function CreateSegmentView({ step, segmentType, onSelectType, goBack }: { step: number; segmentType: string | null; onSelectType: (type: string) => void; goBack?: () => void }) {
  if (step === 1) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="text-xl font-bold mb-6">Choose Segment Type</div>
        <div className="flex gap-8">
          <SegmentTypeCard title="Manual" description="Build a segment by manually selecting filters and rules." icon={<Clipboard />} badge="Popular" onClick={() => onSelectType('manual')} color="red" />
          <SegmentTypeCard title="Smart" description="Let AI build a segment for you based on your goals." icon={<Brain />} badge="AI" onClick={() => onSelectType('smart')} color="purple" />
          <SegmentTypeCard title="Lookalike" description="Find contacts similar to your best customers." icon={<Target />} badge="New" onClick={() => onSelectType('lookalike')} color="green" />
        </div>
      </div>
    );
  }
  if (step === 2 && segmentType === 'manual') {
    return <ManualSegmentBuilder goBack={goBack || (() => onSelectType(''))} />;
  }
  if (step === 2 && segmentType === 'smart') {
    return <SmartSegmentBuilder goBack={goBack || (() => onSelectType(''))} />;
  }
  if (step === 2 && segmentType === 'lookalike') {
    return <LookalikeSegmentBuilder goBack={goBack || (() => onSelectType(''))} />;
  }
  return null;
}

type SegmentTypeCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  badge: string;
  onClick: () => void;
  color: string;
};
function SegmentTypeCard({ title, description, icon, badge, onClick, color }: SegmentTypeCardProps) {
  const colorMap: Record<string, string> = {
    red: 'bg-[#e85b5e]/10 text-[#e85b5e]',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
  };
  return (
    <button onClick={onClick} className="flex flex-col items-center p-6 rounded-xl border border-slate-200 bg-white shadow hover:shadow-lg transition-all w-56">
      <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-3 text-2xl ${colorMap[color]}`}>{icon}</div>
      <div className="font-bold text-lg mb-1">{title}</div>
      <div className="text-slate-500 text-sm mb-2 text-center">{description}</div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorMap[color]}`}>{badge}</span>
    </button>
  );
}

function ManualSegmentBuilder({ goBack }: { goBack: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
      <div className="flex items-center p-5 border-b border-slate-200 bg-gradient-to-r from-[#e85b5e]/10 to-slate-50">
        <button
          className="mr-4 p-2 rounded-full hover:bg-[#e85b5e]/20 text-[#e85b5e] transition"
          onClick={goBack}
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <Filter size={20} className="text-[#e85b5e] mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Create Manual Segment</h2>
          <p className="text-slate-500 mt-1">Build your segment by adding filters</p>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Segment Name</label>
          <input
            type="text"
            placeholder="E.g., Active Mobile Users"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:border-[#e85b5e] transition-all duration-200"
          />
        </div>
        <div className="border border-slate-200 rounded-xl p-5 mb-6 bg-white">
          <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
            <Filter size={18} className="text-[#e85b5e] mr-2" />
            Filter Builder
          </h3>
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none">
                <option>Behavior</option>
                <option>User Attribute</option>
                <option>Channel Activity</option>
                <option>Conversion</option>
              </select>
              <select className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none">
                <option>Visited Page</option>
                <option>Clicked Button</option>
                <option>Viewed Product</option>
                <option>Added to Cart</option>
              </select>
              <input
                type="text"
                placeholder="Pricing Page"
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none"
              />
              <button className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg p-2.5 transition-colors duration-150">
                <Trash2 size={20} />
              </button>
            </div>
            <div className="pl-6 flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full border-2 border-[#e85b5e] flex items-center justify-center">
                <span className="text-[#e85b5e] font-medium text-sm">+</span>
              </div>
              <span className="text-slate-600 font-medium">AND</span>
            </div>
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none">
                <option>Channel Activity</option>
                <option>Behavior</option>
                <option>User Attribute</option>
                <option>Conversion</option>
              </select>
              <select className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none">
                <option>Email Opened</option>
                <option>Email Clicked</option>
                <option>WhatsApp Received</option>
                <option>SMS Delivered</option>
              </select>
              <select className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Custom Date Range</option>
              </select>
              <button className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg p-2.5 transition-colors duration-150">
                <Trash2 size={20} />
              </button>
            </div>
            <div className="pl-6 flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full border-2 border-[#e85b5e] flex items-center justify-center">
                <span className="text-[#e85b5e] font-medium text-sm">+</span>
              </div>
              <span className="text-slate-600 font-medium">AND</span>
            </div>
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none">
                <option>User Attribute</option>
                <option>Behavior</option>
                <option>Channel Activity</option>
                <option>Conversion</option>
              </select>
              <select className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none">
                <option>Device</option>
                <option>Location</option>
                <option>Tags</option>
                <option>Custom Field</option>
              </select>
              <select className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e85b5e] focus:outline-none">
                <option>Mobile</option>
                <option>Desktop</option>
                <option>Tablet</option>
                <option>Any</option>
              </select>
              <button className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg p-2.5 transition-colors duration-150">
                <Trash2 size={20} />
              </button>
            </div>
            <button className="flex items-center px-4 py-2 bg-[#e85b5e]/10 hover:bg-[#e85b5e]/20 text-[#e85b5e] hover:text-[#c7494c] rounded-lg text-sm font-medium transition-colors duration-150 border border-[#e85b5e]/30">
              <span className="mr-2">+</span> Add Filter
            </button>
          </div>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 mb-6 bg-white">
          <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
            <Smartphone size={18} className="text-[#e85b5e] mr-2" />
            Channel Filters
          </h3>
          <p className="text-sm text-slate-500 mb-4">Ensure your segment only includes users available on the selected channels</p>
          <div className="grid grid-cols-4 gap-4">
            <ChannelCheckbox label="WhatsApp Users Only" icon={<Smartphone size={18} className="text-green-600" />} />
            <ChannelCheckbox label="Email Verified Users" icon={<Mail size={18} className="text-[#e85b5e]" />} checked={true} />
            <ChannelCheckbox label="SMS Subscribers" icon="SMS" />
            <ChannelCheckbox label="Push Enabled" icon={<Bell size={18} className="text-purple-600" />} />
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#e85b5e]/10 to-[#e85b5e]/20 rounded-xl p-5 mb-6 border border-[#e85b5e]/30">
          <div className="flex items-start">
            <div className="mt-1 mr-4 bg-white p-3 rounded-full border border-[#e85b5e]/30">
              <Users size={24} className="text-[#e85b5e]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#e85b5e] mb-1">Estimated Audience</h3>
              <p className="text-sm text-[#c7494c] mb-2">Based on your current filters</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-[#c7494c]">4,328</span>
                <span className="ml-2 text-[#e85b5e]">contacts match these criteria</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-150">
            Cancel
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-[#e85b5e] to-[#c7494c] rounded-lg text-sm font-medium text-white hover:from-[#c7494c] hover:to-[#b5434c] transition-all duration-200 shadow-sm hover:shadow">
            Save Segment
          </button>
        </div>
      </div>
    </div>
  );
}

type ChannelCheckboxProps = {
  label: string;
  icon: ReactNode;
  checked?: boolean;
};
function ChannelCheckbox({ label, icon, checked = false }: ChannelCheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} readOnly className="accent-[#e85b5e]" />
      <span className="flex items-center gap-1 text-slate-700">{icon}{label}</span>
    </label>
  );
}

function SmartSegmentBuilder({ goBack }: { goBack: () => void }) {
  return (
    <div className="bg-white rounded-lg shadow max-w-4xl mx-auto">
      <div className="flex items-center p-4 border-b border-gray-200">
        <button
          className="mr-4 p-2 rounded-full hover:bg-purple-100 text-purple-600 transition"
          onClick={goBack}
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <Brain size={20} className="text-purple-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-800">Create Smart Segment</h2>
        <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">AI Powered</span>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Segment Name</label>
          <input
            type="text"
            placeholder="E.g., High Conversion Potential"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#e85b5e] focus:border-[#e85b5e]"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-4">What do you want this segment to do?</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="border border-gray-200 p-4 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer">
              <input type="radio" name="segmentGoal" className="sr-only" />
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-5 w-5 border-2 border-purple-600 rounded-full flex items-center justify-center">
                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-1">Convert to purchase</h4>
                  <p className="text-sm text-gray-500">Identify users who are most likely to make a purchase soon</p>
                </div>
              </div>
            </label>
            <label className="border border-gray-200 p-4 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer">
              <input type="radio" name="segmentGoal" className="sr-only" />
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-1">Re-engage dormant users</h4>
                  <p className="text-sm text-gray-500">Find inactive users who are most likely to return</p>
                </div>
              </div>
            </label>
            <label className="border border-gray-200 p-4 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer">
              <input type="radio" name="segmentGoal" className="sr-only" />
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-1">Likely to upgrade</h4>
                  <p className="text-sm text-gray-500">Identify users ready to move to a higher tier</p>
                </div>
              </div>
            </label>
            <label className="border border-gray-200 p-4 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer">
              <input type="radio" name="segmentGoal" className="sr-only" />
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-1">High churn risk</h4>
                  <p className="text-sm text-gray-500">Find users who might stop using your product</p>
                </div>
              </div>
            </label>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <Brain size={20} className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-purple-800 mb-1">AI Suggestion</h4>
                <p className="text-sm text-purple-700">
                  Based on your goal, I'll create a segment of users who have visited your product page multiple times,
                  added items to cart but haven't purchased yet, and have opened your emails in the last 14 days.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">AI-suggested filters</h4>
            <div className="space-y-2 mb-4">
              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700 flex-1">Viewed product pages more than 3 times</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">AI Suggested</span>
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700 flex-1">Added to cart in last 30 days</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">AI Suggested</span>
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700 flex-1">Opened email in last 14 days</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">AI Suggested</span>
              </div>
              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-700 flex-1">No purchase in history</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">AI Suggested</span>
              </div>
            </div>
            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
              <Edit size={16} className="mr-1" /> Customize Filters
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-4">Channel Filters</h3>
          <p className="text-sm text-gray-500 mb-3">Ensure your segment only includes users available on the selected channels</p>
          <div className="grid grid-cols-4 gap-4">
            <label className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <input type="checkbox" className="h-4 w-4 text-[#e85b5e] rounded" checked />
              <span className="text-sm text-gray-700">WhatsApp Users Only</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <input type="checkbox" className="h-4 w-4 text-[#e85b5e] rounded" checked />
              <span className="text-sm text-gray-700">Email Verified Users</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <input type="checkbox" className="h-4 w-4 text-[#e85b5e] rounded" />
              <span className="text-sm text-gray-700">SMS Subscribers</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <input type="checkbox" className="h-4 w-4 text-[#e85b5e] rounded" />
              <span className="text-sm text-gray-700">Push Enabled</span>
            </label>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="mt-1 mr-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <Users size={20} className="text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium text-purple-800 mb-1">AI-Estimated Audience</h3>
              <p className="text-sm text-purple-700 mb-2">Based on suggested criteria</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-purple-900">2,146</span>
                <span className="ml-2 text-purple-700">contacts likely to convert</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-purple-600 rounded-md text-sm font-medium text-white hover:bg-purple-700">
            Create Smart Segment
          </button>
        </div>
      </div>
    </div>
  );
}

function LookalikeSegmentBuilder({ goBack }: { goBack: () => void }) {
  const baseSegments = [
    { id: 1, name: 'Paid Users - South India', contacts: 4328 },
    { id: 2, name: 'High Value Customers', contacts: 867 },
    { id: 3, name: 'Mobile App Power Users', contacts: 2156 },
    { id: 4, name: 'Recent Converters', contacts: 936 },
  ];
  return (
    <div className="bg-white rounded-lg shadow max-w-4xl mx-auto">
      <div className="flex items-center p-4 border-b border-gray-200">
        <button
          className="mr-4 p-2 rounded-full hover:bg-green-100 text-green-600 transition"
          onClick={goBack}
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <Target size={20} className="text-green-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-800">Create Lookalike Segment</h2>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Segment Name</label>
          <input
            type="text"
            placeholder="E.g., Lookalike - Paid Users"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#e85b5e] focus:border-[#e85b5e]"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-4">Step 1: Select Base Segment</h3>
          <p className="text-sm text-gray-500 mb-4">Choose an existing segment to find similar users</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {baseSegments.map(segment => (
              <label key={segment.id} className="border border-gray-200 p-4 rounded-lg hover:border-green-300 hover:bg-green-50 cursor-pointer">
                <input type="radio" name="baseSegment" className="sr-only" checked={segment.id === 1} />
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className={`h-5 w-5 border-2 rounded-full flex items-center justify-center ${segment.id === 1 ? 'border-green-600' : 'border-gray-300'}`}>{segment.id === 1 && <div className="h-3 w-3 bg-green-600 rounded-full"></div>}</div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-1">{segment.name}</h4>
                    <p className="text-sm text-gray-500">{segment.contacts.toLocaleString()} contacts</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-4">Step 2: Choose Traits to Match</h3>
          <p className="text-sm text-gray-500 mb-4">Select which characteristics to use for finding similar users</p>
          <div className="space-y-3 mb-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="h-4 w-4 text-green-600 rounded" checked />
              <span className="text-sm text-gray-700">Demographic (location, age, language)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="h-4 w-4 text-green-600 rounded" checked />
              <span className="text-sm text-gray-700">Engagement patterns (session frequency, time spent)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="h-4 w-4 text-green-600 rounded" checked />
              <span className="text-sm text-gray-700">Funnel behavior (pages visited, actions taken)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="h-4 w-4 text-green-600 rounded" />
              <span className="text-sm text-gray-700">Purchase history (products, order value)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="h-4 w-4 text-green-600 rounded" />
              <span className="text-sm text-gray-700">Channel preferences (email, WhatsApp, SMS)</span>
            </label>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-4">Step 3: Set Match Threshold</h3>
          <p className="text-sm text-gray-500 mb-4">Define how closely the lookalike audience should match the base segment</p>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Broad audience (lower similarity)</span>
              <span className="text-sm text-gray-500">Precise audience (higher similarity)</span>
            </div>
            <input
              type="range"
              min="60"
              max="95"
              value="80"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-2 text-center">
              <span className="text-sm font-medium text-gray-700">80% similarity threshold</span>
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-md">
            <div className="flex items-start">
              <AlertCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-700">
                Higher thresholds yield smaller, more targeted audiences. Lower thresholds create larger audiences with more variety.
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-4">Step 4: Choose Output Size</h3>
          <p className="text-sm text-gray-500 mb-4">Select the size of your lookalike audience</p>
          <div className="grid grid-cols-3 gap-4">
            <label className="border border-gray-200 p-4 rounded-lg hover:border-green-300 hover:bg-green-50 cursor-pointer">
              <input type="radio" name="audienceSize" className="sr-only" />
              <div className="text-center">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                  <span className="text-lg font-bold text-green-600">S</span>
                </div>
                <h4 className="text-md font-medium text-gray-800 mb-1">Small</h4>
                <p className="text-sm text-gray-500">~5,000 contacts</p>
                <p className="text-xs text-green-600 mt-2">High precision</p>
              </div>
            </label>
            <label className="border-2 border-green-500 p-4 rounded-lg bg-green-50 cursor-pointer">
              <input type="radio" name="audienceSize" className="sr-only" checked />
              <div className="text-center">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                  <span className="text-lg font-bold text-green-600">M</span>
                </div>
                <h4 className="text-md font-medium text-gray-800 mb-1">Medium</h4>
                <p className="text-sm text-gray-500">~15,000 contacts</p>
                <p className="text-xs text-green-600 mt-2">Balanced approach</p>
              </div>
            </label>
            <label className="border border-gray-200 p-4 rounded-lg hover:border-green-300 hover:bg-green-50 cursor-pointer">
              <input type="radio" name="audienceSize" className="sr-only" />
              <div className="text-center">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                  <span className="text-lg font-bold text-green-600">L</span>
                </div>
                <h4 className="text-md font-medium text-gray-800 mb-1">Large</h4>
                <p className="text-sm text-gray-500">~40,000 contacts</p>
                <p className="text-xs text-green-600 mt-2">Maximum reach</p>
              </div>
            </label>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="mt-1 mr-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Target size={20} className="text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium text-green-800 mb-1">Estimated Lookalike Audience</h3>
              <p className="text-sm text-green-700 mb-2">Based on your selected criteria</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-green-900">15,742</span>
                <span className="ml-2 text-green-700">contacts match 80% similarity</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700">
            Create Lookalike Segment
          </button>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function SegmentPage() {
  return (
    <StaticExportLayout>
      <ContactsSegmentsModule />
    </StaticExportLayout>
  );
}

function ContactsSegmentsModule() {
  const [activeTab, setActiveTab] = useState<'all' | 'segments' | 'smart' | 'createSegment'>('segments');
  const [createSegmentStep, setCreateSegmentStep] = useState<number>(0);
  const [segmentType, setSegmentType] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleTabChange = (tab: 'all' | 'segments' | 'smart') => {
    setActiveTab(tab);
    setCreateSegmentStep(0);
    setSegmentType(null);
  };
  const handleCreateSegment = () => {
    setActiveTab('createSegment');
    setCreateSegmentStep(1);
  };
  const handleSegmentTypeSelect = (type: string) => {
    setSegmentType(type);
    setCreateSegmentStep(2);
  };
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className={`bg-white border-b border-slate-200 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#e85b5e] to-[#c7494c] bg-clip-text text-transparent">Contacts / Segments</h1>
              <p className="text-slate-500 mt-1">Build, manage, and leverage high-converting audience segments</p>
            </div>
            <div className="flex items-center space-x-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 w-64 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e85b5e] focus:border-[#e85b5e]/20 shadow-sm transition-all duration-200"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <button className="flex items-center space-x-1 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors duration-150">
                    <Calendar size={16} />
                    <span>Last 30 days</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
                <div className="relative">
                  <button className="flex items-center space-x-1 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors duration-150">
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                </div>
                <button className="flex items-center space-x-1 text-sm text-[#e85b5e] bg-[#e85b5e]/10 hover:bg-[#e85b5e]/20 px-3 py-1.5 rounded-lg transition-colors duration-150">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex border-b border-slate-200">
            <TabButton label="All Contacts" icon={<Users size={18} />} active={activeTab === 'all'} onClick={() => handleTabChange('all')} />
            <TabButton label="Segments" icon={<BarChart2 size={18} />} active={activeTab === 'segments'} onClick={() => handleTabChange('segments')} />
            <TabButton label="Smart Segments" icon={<Brain size={18} />} active={activeTab === 'smart'} onClick={() => handleTabChange('smart')} />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {activeTab === 'all' && <AllContactsView />}
        {activeTab === 'segments' && <SegmentsView onCreateSegment={handleCreateSegment} />}
        {activeTab === 'smart' && <>
          <SmartSegmentsView />
          <SmartSegmentDetailStatic />
        </>}
        {activeTab === 'createSegment' && (
          <CreateSegmentView 
            step={createSegmentStep} 
            segmentType={segmentType} 
            onSelectType={handleSegmentTypeSelect} 
            goBack={() => setCreateSegmentStep(1)}
          />
        )}
      </div>
    </div>
  );
} 