"use client";

import React, { useState, useEffect } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Save,
  Eye,
  Play,
  Users,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  GitBranch,
  Target,
  Filter,
  Plus,
  Settings,
  BarChart3,
  Zap,
  Pause,
  ArrowRight,
  ArrowDown,
  CheckCircle,
  AlertCircle,
  X,
  Trash2
} from "lucide-react";

import Link from "next/link";
import CustomerLifecycleTemplate, { CustomerLifecycleJourneyTemplate, JourneyStageCategories } from "@/components/journey-templates/CustomerLifecycleTemplate";
// import AutomationConfig from "@/components/journey-builder/AutomationConfig"; // Hidden but kept for future use
import SegmentationBuilder from "@/components/journey-builder/SegmentationBuilder";
import ChannelTemplateModal from "@/components/journey-builder/ChannelTemplateModal";
import { useRouter } from "next/navigation";

interface FlowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay' | 'split' | 'segmentation';
  title: string;
  description: string;
  position: { x: number; y: number };
  config: any;
  connections: string[];
  category?: string;
}

interface Journey {
  name: string;
  description: string;
  segment: string;
  nodes: FlowNode[];
}

const nodeTypes = [
  {
    type: 'trigger',
    icon: Zap,
    title: 'Trigger',
    description: 'Start point for the journey',
    color: 'bg-blue-500',
    examples: ['Customer signup', 'Purchase made', 'Page visit', 'Email opened']
  },
  {
    type: 'segmentation',
    icon: Users,
    title: 'Segmentation',
    description: 'Segment customers by criteria',
    color: 'bg-purple-500',
    examples: ['Location based', 'Behavior based', 'Demographics', 'Engagement level']
  },
  {
    type: 'condition',
    icon: GitBranch,
    title: 'Condition',
    description: 'Decision point based on customer behavior',
    color: 'bg-purple-500',
    examples: ['Email clicked?', 'Purchase value > $100?', 'Location = US?', 'First time buyer?']
  },
  {
    type: 'action',
    icon: Target,
    title: 'Action',
    description: 'Send message or perform action',
    color: 'bg-green-500',
    examples: ['Send email', 'Send SMS', 'Send WhatsApp', 'Add to segment']
  },
  {
    type: 'delay',
    icon: Clock,
    title: 'Wait/Delay',
    description: 'Wait for specified time',
    color: 'bg-orange-500',
    examples: ['Wait 1 day', 'Wait 1 week', 'Wait for event', 'Wait until date']
  },
  {
    type: 'split',
    icon: ArrowRight,
    title: 'Split Path',
    description: 'Divide customers into multiple paths',
    color: 'bg-pink-500',
    examples: ['A/B test split', 'Random split', 'Percentage split', 'Attribute split']
  }
];

// Helper function to generate unique journey ID  
function generateJourneyId(): string {
  // Use a more predictable ID pattern for static generation
  const randomId = Math.floor(Math.random() * 900) + 100; // 3-digit number from 100-999
  return `JB-${randomId}`;
}

// Helper function to save journey to localStorage
function saveJourneyToStorage(journey: Journey & { id: string; status: string; createdDate: string; lastModified: string }) {
  try {
    const existingJourneys = JSON.parse(localStorage.getItem('saved_journeys') || '[]');
    const updatedJourneys = [...existingJourneys, journey];
    localStorage.setItem('saved_journeys', JSON.stringify(updatedJourneys));
    return true;
  } catch (error) {
    console.error('Failed to save journey:', error);
    return false;
  }
}

// Helper function to get channel statistics
function getChannelStats(nodes: FlowNode[]): string[] {
  const channels = new Set<string>();
  nodes.forEach(node => {
    if (node.config?.channel) {
      channels.add(node.config.channel);
    }
  });
  return Array.from(channels);
}

// Helper function to find non-overlapping position
function findNonOverlappingPosition(
  desiredPosition: { x: number; y: number },
  existingNodes: FlowNode[],
  nodeWidth: number,
  nodeHeight: number,
  minSpacing: number
): { x: number; y: number } {
  const { x, y } = desiredPosition;
  
  // Check if current position overlaps with any existing node
  const isOverlapping = (testX: number, testY: number) => {
    return existingNodes.some(node => {
      const nodeX = node.position.x;
      const nodeY = node.position.y;
      
      // Check if rectangles overlap (with minimum spacing)
      return (
        testX < nodeX + nodeWidth + minSpacing &&
        testX + nodeWidth + minSpacing > nodeX &&
        testY < nodeY + nodeHeight + minSpacing &&
        testY + nodeHeight + minSpacing > nodeY
      );
    });
  };
  
  // If no overlap, return original position
  if (!isOverlapping(x, y)) {
    return { x, y };
  }
  
  // Find the best alternative position
  const searchRadius = 150;
  const step = 30;
  
  // Try positions in expanding squares around the desired position
  for (let radius = step; radius <= searchRadius; radius += step) {
    // Try positions at this radius
    for (let angle = 0; angle < 360; angle += 45) {
      const rad = (angle * Math.PI) / 180;
      const testX = x + Math.cos(rad) * radius;
      const testY = y + Math.sin(rad) * radius;
      
      // Ensure position is within bounds
      if (testX >= 0 && testY >= 0 && !isOverlapping(testX, testY)) {
        return { x: testX, y: testY };
      }
    }
  }
  
  // If no good position found, place it in a grid pattern
  const gridX = Math.floor(existingNodes.length / 4) * (nodeWidth + minSpacing);
  const gridY = (existingNodes.length % 4) * (nodeHeight + minSpacing);
  
  return { x: gridX, y: gridY };
}

export default function CreateJourneyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [journey, setJourney] = useState<Journey>({
    name: '',
    description: '',
    segment: '',
    nodes: []
  });
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [previewSegment, setPreviewSegment] = useState<any>(null);
  const [showJourneyPreview, setShowJourneyPreview] = useState(false);
  const [deletedNodes, setDeletedNodes] = useState<FlowNode[]>([]);
  const [dragPreview, setDragPreview] = useState<{ x: number; y: number } | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showChannelTemplateModal, setShowChannelTemplateModal] = useState(false);
  const [channelTemplateConfig, setChannelTemplateConfig] = useState<{
    channel: 'email' | 'sms' | 'whatsapp' | 'push';
    nodeId: string;
    nodeCategory?: string;
    nodeTitle?: string;
    nodeDescription?: string;
  } | null>(null);

  const handleDeleteNode = (nodeId: string) => {
    const nodeToDelete = journey.nodes.find(node => node.id === nodeId);
    if (nodeToDelete && window.confirm(`Are you sure you want to delete "${nodeToDelete.title}"?`)) {
      // Store for potential undo
      setDeletedNodes(prev => [...prev, nodeToDelete]);
      
      setJourney(prev => ({
        ...prev,
        nodes: prev.nodes.filter(node => node.id !== nodeId)
      }));
      // Clear selection if the deleted node was selected
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
      }
    }
  };

  // Keyboard event handler for deleting nodes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') { // Only Delete key, not Backspace
        if (selectedNode && currentStep === 3) { // Only in flow builder step
          // Only delete if we're not typing in an input field
          const activeElement = document.activeElement;
          if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
            e.preventDefault();
            handleDeleteNode(selectedNode.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, currentStep, journey.nodes]);

  const stepNames = [
    'Journey Setup',
    'Template Selection',
    'Customer Segment',
    'Flow Builder',
    // 'Automation & Rules', // Hidden but kept for future use
    'Review & Launch'
  ];

  const handleAddNode = (type: string, position: { x: number; y: number }) => {
    const newNode: FlowNode = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      title: `New ${type}`,
      description: 'Configure this step',
      position,
      config: {},
      connections: []
    };
    
    setJourney(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  };

  const handleUpdateNode = (nodeId: string, updates: Partial<FlowNode>) => {
    setJourney(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === nodeId ? { ...node, ...updates } : node
      )
    }));
  };

  const handleConnectNodes = (fromNodeId: string, toNodeId: string) => {
    setJourney(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === fromNodeId
          ? { ...node, connections: [...node.connections, toNodeId] }
          : node
      )
    }));
  };

  const handleDisconnectNodes = (fromNodeId: string, toNodeId: string) => {
    setJourney(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === fromNodeId
          ? { ...node, connections: node.connections.filter(id => id !== toNodeId) }
          : node
      )
    }));
  };

  const handleNodeDragStart = (e: React.MouseEvent, node: FlowNode) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const canvasRect = e.currentTarget.closest('.canvas-container')?.getBoundingClientRect();
    
    if (canvasRect) {
      setDragOffset({
        x: e.clientX - (canvasRect.left + node.position.x),
        y: e.clientY - (canvasRect.top + node.position.y)
      });
    }
    
    setDraggedNode(node.id);
    setSelectedNode(node);
  };

  const handleNodeDrag = (e: React.MouseEvent) => {
    if (!draggedNode) return;
    
    const canvasContainer = document.querySelector('.canvas-container');
    if (!canvasContainer) return;
    
    const rect = canvasContainer.getBoundingClientRect();
    const scrollLeft = canvasContainer.scrollLeft;
    const scrollTop = canvasContainer.scrollTop;
    
    let x = e.clientX - rect.left - dragOffset.x + scrollLeft;
    let y = e.clientY - rect.top - dragOffset.y + scrollTop;
    
    // Snap to grid
    const gridSize = 20;
    x = Math.round(x / gridSize) * gridSize;
    y = Math.round(y / gridSize) * gridSize;
    
    // Ensure minimum bounds
    x = Math.max(0, x);
    y = Math.max(0, y);
    
    // Update node position
    handleUpdateNode(draggedNode, { position: { x, y } });
    
    // Update selected node if it's the one being dragged
    if (selectedNode?.id === draggedNode) {
      setSelectedNode(prev => prev ? { ...prev, position: { x, y } } : null);
    }
  };

  const handleNodeDragEnd = () => {
    setDraggedNode(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleUseTemplate = () => {
    setJourney(prev => ({
      ...prev,
      name: 'Customer Lifecycle Journey',
      description: 'Complete customer journey from signup to loyalty and re-engagement',
      nodes: CustomerLifecycleJourneyTemplate
    }));
    setCurrentStep(3); // Skip to flow builder
  };

  const handleSegmentSelect = (segment: any) => {
    setSelectedSegmentId(segment.id);
    setJourney(prev => ({
      ...prev,
      segment: segment.name
    }));
    // Show some feedback that segment was selected
    console.log('Selected segment:', segment.name);
  };

  const handleSegmentPreview = (segment: any) => {
    setPreviewSegment(segment);
    // Could open a modal or show inline preview
    console.log('Preview segment:', segment);
  };

  const handleChannelClick = (channel: 'email' | 'sms' | 'whatsapp' | 'push', nodeId: string) => {
    const node = journey.nodes.find(n => n.id === nodeId);
    if (node) {
      setChannelTemplateConfig({
        channel,
        nodeId,
        nodeCategory: node.category,
        nodeTitle: node.title,
        nodeDescription: node.description
      });
      setShowChannelTemplateModal(true);
    }
  };

  const handleTemplateSelect = (template: any) => {
    if (channelTemplateConfig) {
      // Update the node with the selected template
      handleUpdateNode(channelTemplateConfig.nodeId, {
        config: {
          ...journey.nodes.find(n => n.id === channelTemplateConfig.nodeId)?.config,
          channel: channelTemplateConfig.channel,
          template: template.id,
          templateName: template.name,
          subject: template.subject,
          content: template.content
        }
      });
      
      // Update selected node if it's the same node
      if (selectedNode?.id === channelTemplateConfig.nodeId) {
        setSelectedNode(prev => prev ? {
          ...prev,
          config: {
            ...prev.config,
            channel: channelTemplateConfig.channel,
            template: template.id,
            templateName: template.name,
            subject: template.subject,
            content: template.content
          }
        } : null);
      }
    }
    
    setShowChannelTemplateModal(false);
    setChannelTemplateConfig(null);
  };

  const handleCloseTemplateModal = () => {
    setShowChannelTemplateModal(false);
    setChannelTemplateConfig(null);
  };

  const handleLaunchJourney = () => {
    // Validate required fields
    if (!journey.name.trim()) {
      alert('Please enter a journey name');
      return;
    }

    if (journey.nodes.length === 0) {
      alert('Please add at least one step to your journey');
      return;
    }

    // Create the journey object with all required fields
    const journeyId = generateJourneyId();
    const currentDate = new Date().toISOString().split('T')[0];
    const channels = getChannelStats(journey.nodes);
    
    const savedJourney = {
      id: journeyId,
      name: journey.name,
      description: journey.description || 'No description provided',
      status: 'Running',
      segment: journey.segment || 'All Customers',
      nodes: journey.nodes,
      canvasNodes: journey.nodes.map(node => ({
        ...node,
        status: 'pending' // Default status for new nodes
      })),
      createdDate: currentDate,
      lastModified: 'Just now',
      createdBy: 'Current User', // Could be replaced with actual user data
      targetSegment: journey.segment || 'All Customers',
      totalUsers: 0,
      activeUsers: 0,
      completionRate: 0,
      conversionRate: 0,
      totalConversions: 0,
      channels: channels
    };

    // Save to localStorage
    const success = saveJourneyToStorage(savedJourney);
    
    if (success) {
      console.log('Journey saved successfully:', savedJourney);
      // Navigate to journey list
      router.push('/journey-builder');
    } else {
      console.error('Failed to save journey:', savedJourney);
      alert('Failed to save journey. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Journey Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="journeyName">Journey Name *</Label>
                <Input
                  id="journeyName"
                  value={journey.name}
                  onChange={(e) => setJourney(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Welcome Onboarding Flow"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="journeyDescription">Description</Label>
                <Textarea
                  id="journeyDescription"
                  value={journey.description}
                  onChange={(e) => setJourney(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the purpose and goals of this journey..."
                  className="mt-1"
                  rows={3}
                />
              </div>

            </CardContent>
          </Card>
        );

      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose a Template</CardTitle>
                <p className="text-muted-foreground">
                  Start with a pre-built template or create from scratch
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed">
                    <div className="text-center">
                      <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Start from Scratch</h3>
                      <p className="text-muted-foreground mb-4">
                        Build your journey step by step with complete customization
                      </p>
                      <Button variant="outline" onClick={() => setCurrentStep(2)}>
                        Create Custom Journey
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow border-2 border-blue-200">
                    <div className="text-center">
                      <Target className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Customer Lifecycle Template</h3>
                      <p className="text-muted-foreground mb-4">
                        Complete 7-stage journey: signup → segmentation → welcome → behavior → conversion → loyalty → re-engagement
                      </p>
                      <Button onClick={handleUseTemplate}>
                        Use This Template
                      </Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <CustomerLifecycleTemplate />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {journey.segment && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">
                      Selected segment: {journey.segment}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
            <SegmentationBuilder 
              onSegmentSelect={handleSegmentSelect}
              onSegmentPreview={handleSegmentPreview}
              selectedSegmentId={selectedSegmentId}
            />
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[800px]">
            {/* Node Palette */}
            <Card className="lg:col-span-1 max-h-[80vh] overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Flow Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 overflow-y-auto">
                {nodeTypes.map((nodeType) => (
                  <div
                    key={nodeType.type}
                    className="p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={() => setDraggedNodeType(nodeType.type)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${nodeType.color}`}>
                        <nodeType.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{nodeType.title}</h4>
                        <p className="text-xs text-muted-foreground">{nodeType.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm mb-2">Quick Tips:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Drag elements to the canvas</li>
                    <li>• Click to configure each step</li>
                    <li>• Connect steps with arrows</li>
                    <li>• Test your flow before launch</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Canvas */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>Journey Canvas</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowJourneyPreview(true)}
                    disabled={journey.nodes.length === 0}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div
                  className="min-h-[650px] max-h-[80vh] bg-gray-50 relative overflow-auto canvas-container"
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedNodeType) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const scrollLeft = e.currentTarget.scrollLeft;
                      const scrollTop = e.currentTarget.scrollTop;
                      
                      // Calculate position relative to the scrollable content
                      let x = e.clientX - rect.left + scrollLeft;
                      let y = e.clientY - rect.top + scrollTop;
                      
                      // Snap to grid (optional - makes positioning more predictable)
                      const gridSize = 20;
                      x = Math.round(x / gridSize) * gridSize;
                      y = Math.round(y / gridSize) * gridSize;
                      
                      // Ensure minimum spacing and avoid overlaps
                      const minSpacing = 60; // Minimum space between nodes (reduced from 180)
                      const nodeWidth = 200; // Approximate node width
                      const nodeHeight = 120; // Approximate node height
                      
                      // Check for overlaps and adjust position
                      const adjustedPosition = findNonOverlappingPosition(
                        { x, y }, 
                        journey.nodes, 
                        nodeWidth, 
                        nodeHeight, 
                        minSpacing
                      );
                      
                      handleAddNode(draggedNodeType, adjustedPosition);
                      setDraggedNodeType(null);
                      setDragPreview(null);
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (draggedNodeType) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const scrollLeft = e.currentTarget.scrollLeft;
                      const scrollTop = e.currentTarget.scrollTop;
                      
                      let x = e.clientX - rect.left + scrollLeft;
                      let y = e.clientY - rect.top + scrollTop;
                      
                      // Snap to grid
                      const gridSize = 20;
                      x = Math.round(x / gridSize) * gridSize;
                      y = Math.round(y / gridSize) * gridSize;
                      
                      setDragPreview({ x, y });
                    }
                  }}
                  onDragLeave={() => setDragPreview(null)}
                  onMouseMove={handleNodeDrag}
                  onMouseUp={handleNodeDragEnd}
                >
                  {/* Content Wrapper to ensure proper scrollable area */}
                  <div className="absolute inset-0 min-w-full min-h-full" style={{ 
                    width: Math.max(800, Math.max(...journey.nodes.map(n => n.position.x + 300))),
                    height: Math.max(650, Math.max(...journey.nodes.map(n => n.position.y + 200)))
                  }}>
                    {/* Grid Background */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0'
                  }} />
                  
                  {/* Default Start Node */}
                  {journey.nodes.length === 0 && (
                    <div className="absolute top-8 left-8">
                      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-xs">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="h-5 w-5" />
                          <span className="font-medium">Start Journey</span>
                        </div>
                        <p className="text-sm opacity-90">
                          Drag elements from the left panel to build your customer journey
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Rendered Nodes */}
                  {journey.nodes.map((node, index) => {
                    const nodeType = nodeTypes.find(nt => nt.type === node.type);
                    const categoryConfig = node.category ? JourneyStageCategories[node.category] : null;
                    const isSelected = selectedNode?.id === node.id;
                    
                    return (
                      <div key={node.id}>
                        {/* Connection Lines */}
                        {node.connections && node.connections.length > 0 && (
                          node.connections.map(connectionId => {
                            const targetNode = journey.nodes.find(n => n.id === connectionId);
                            if (!targetNode) return null;
                            
                            const startX = node.position.x + 100;
                            const startY = node.position.y + 40;
                            const endX = targetNode.position.x + 100;
                            const endY = targetNode.position.y;
                            
                            return (
                              <svg
                                key={`line-${node.id}-${connectionId}`}
                                className="absolute pointer-events-none"
                                style={{ left: 0, top: 0, width: '100%', height: '100%' }}
                              >
                                <defs>
                                  <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="7"
                                    refX="9"
                                    refY="3.5"
                                    orient="auto"
                                  >
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                                  </marker>
                                </defs>
                                <line
                                  x1={startX}
                                  y1={startY}
                                  x2={endX}
                                  y2={endY}
                                  stroke="#9CA3AF"
                                  strokeWidth="2"
                                  markerEnd="url(#arrowhead)"
                                />
                              </svg>
                            );
                          })
                        )}
                        
                        {/* Node */}
                        <div
                          className={`absolute p-4 rounded-lg shadow-md max-w-xs border-2 transition-all ${
                            draggedNode === node.id 
                              ? 'cursor-grabbing opacity-80 shadow-lg' 
                              : 'cursor-grab'
                          } ${
                            isSelected 
                              ? 'ring-2 ring-blue-500 border-blue-300 bg-blue-50' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                          style={{
                            left: Math.max(10, node.position.x),
                            top: Math.max(10, node.position.y),
                            zIndex: isSelected ? 10 : 1
                          }}
                          onClick={() => setSelectedNode(node)}
                          onMouseDown={(e) => handleNodeDragStart(e, node)}
                        >
                          {/* Delete button overlay */}
                          {isSelected && (
                            <button
                              className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNode(node.id);
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              title="Delete node"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                          
                          {/* Category Badge */}
                          {node.category && (
                            <div className="absolute -top-2 -right-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs px-2 py-1 ${categoryConfig?.color} text-white border-none`}
                              >
                                {node.category}
                              </Badge>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`p-1 rounded ${nodeType?.color || categoryConfig?.color || 'bg-gray-500'}`}>
                              {nodeType?.icon ? (
                                <nodeType.icon className="h-4 w-4 text-white" />
                              ) : categoryConfig?.icon ? (
                                <categoryConfig.icon className="h-4 w-4 text-white" />
                              ) : (
                                <Target className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <span className="font-medium text-sm">{node.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{node.description}</p>
                          
                          {/* Config Preview */}
                          {((node.config && Object.keys(node.config).length > 0) || node.type === 'action') && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <div className="flex flex-wrap gap-1">
                                {node.config.channel && (
                                  <Badge 
                                    variant="secondary" 
                                    className="text-xs cursor-pointer hover:bg-blue-500 hover:text-white transition-colors border-2 border-transparent hover:border-blue-300"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleChannelClick(node.config.channel as 'email' | 'sms' | 'whatsapp' | 'push', node.id);
                                    }}
                                    title="Click to select template"
                                  >
                                    {node.config.channel === 'email' && '📧'}
                                    {node.config.channel === 'sms' && '📱'}
                                    {node.config.channel === 'whatsapp' && '💬'}
                                    {node.config.channel === 'push' && '🔔'}
                                    {' ' + node.config.channel}
                                  </Badge>
                                )}
                                {node.type === 'action' && !node.config.channel && (
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs cursor-pointer hover:bg-blue-500 hover:text-white transition-colors border-dashed"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedNode(node);
                                    }}
                                    title="Click to select channel"
                                  >
                                    + Select Channel
                                  </Badge>
                                )}
                                {node.config.templateName && (
                                  <Badge variant="outline" className="text-xs">
                                    {node.config.templateName}
                                  </Badge>
                                )}
                                {node.config.duration && (
                                  <Badge variant="secondary" className="text-xs">
                                    {node.config.duration} {node.config.unit}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Drag Preview */}
                  {dragPreview && draggedNodeType && (
                    <div
                      className="absolute p-4 rounded-lg shadow-md max-w-xs border-2 border-dashed border-blue-400 bg-blue-50 opacity-70 pointer-events-none"
                      style={{
                        left: dragPreview.x,
                        top: dragPreview.y,
                        zIndex: 100
                      }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="p-1 rounded bg-blue-500">
                          <Target className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-sm">New {draggedNodeType}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Drop to place here</p>
                    </div>
                  )}
                  
                  {/* Empty State Message */}
                  {journey.nodes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🎨</div>
                        <h3 className="text-lg font-medium mb-2">Start Building Your Journey</h3>
                        <p className="text-muted-foreground text-sm">
                          Drag and drop elements from the left panel to create your customer flow
                        </p>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties Panel */}
            <Card className="lg:col-span-1 max-h-[80vh] overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Properties</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                {selectedNode ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={selectedNode.title}
                        onChange={(e) => {
                          handleUpdateNode(selectedNode.id, { title: e.target.value });
                          setSelectedNode({ ...selectedNode, title: e.target.value });
                        }}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={selectedNode.description}
                        onChange={(e) => {
                          handleUpdateNode(selectedNode.id, { description: e.target.value });
                          setSelectedNode({ ...selectedNode, description: e.target.value });
                        }}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label>Category</Label>
                      <select
                        value={selectedNode.category || ''}
                        onChange={(e) => {
                          handleUpdateNode(selectedNode.id, { category: e.target.value });
                          setSelectedNode({ ...selectedNode, category: e.target.value });
                        }}
                        className="mt-1 w-full px-3 py-2 border rounded-md"
                      >
                        <option value="">Select category</option>
                        {Object.entries(JourneyStageCategories).map(([category, config]) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {selectedNode.type === 'action' && (
                      <div>
                        <Label>Channel & Template</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <Button 
                            variant={selectedNode.config.channel === 'email' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => handleChannelClick('email', selectedNode.id)}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                          <Button 
                            variant={selectedNode.config.channel === 'sms' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => handleChannelClick('sms', selectedNode.id)}
                          >
                            <Smartphone className="h-4 w-4 mr-2" />
                            SMS
                          </Button>
                          <Button 
                            variant={selectedNode.config.channel === 'whatsapp' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => handleChannelClick('whatsapp', selectedNode.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            WhatsApp
                          </Button>
                          <Button 
                            variant={selectedNode.config.channel === 'push' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => handleChannelClick('push', selectedNode.id)}
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Push
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Click a channel to select template
                        </p>
                        
                        {/* Template Information */}
                        {selectedNode.config.templateName && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <Label className="text-sm font-medium">Selected Template</Label>
                            <p className="text-sm text-muted-foreground mt-1">{selectedNode.config.templateName}</p>
                            {selectedNode.config.subject && (
                              <div className="mt-2">
                                <Label className="text-xs text-muted-foreground">Subject</Label>
                                <p className="text-sm">{selectedNode.config.subject}</p>
                              </div>
                            )}
                            {selectedNode.config.content && (
                              <div className="mt-2">
                                <Label className="text-xs text-muted-foreground">Content Preview</Label>
                                <div className="text-sm bg-white p-2 rounded border max-h-20 overflow-y-auto">
                                  {selectedNode.config.content.substring(0, 100)}...
                                </div>
                              </div>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => handleChannelClick(selectedNode.config.channel as 'email' | 'sms' | 'whatsapp' | 'push', selectedNode.id)}
                            >
                              Change Template
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {selectedNode.type === 'delay' && (
                      <div>
                        <Label>Wait Duration</Label>
                        <div className="flex space-x-2 mt-1">
                          <Input 
                            placeholder="1" 
                            className="w-20"
                            value={selectedNode.config.duration || ''}
                            onChange={(e) => {
                              const duration = Number.parseInt(e.target.value) || 0;
                              handleUpdateNode(selectedNode.id, { 
                                config: { ...selectedNode.config, duration } 
                              });
                              setSelectedNode({ 
                                ...selectedNode, 
                                config: { ...selectedNode.config, duration } 
                              });
                            }}
                          />
                          <select 
                            className="px-3 py-2 border rounded-md"
                            value={selectedNode.config.unit || 'hours'}
                            onChange={(e) => {
                              handleUpdateNode(selectedNode.id, { 
                                config: { ...selectedNode.config, unit: e.target.value } 
                              });
                              setSelectedNode({ 
                                ...selectedNode, 
                                config: { ...selectedNode.config, unit: e.target.value } 
                              });
                            }}
                          >
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    {/* Connections Section */}
                    <div>
                      <Label>Connections</Label>
                      <div className="mt-1 space-y-2">
                        {selectedNode.connections && selectedNode.connections.length > 0 ? (
                          selectedNode.connections.map((connectionId) => {
                            const targetNode = journey.nodes.find(n => n.id === connectionId);
                            return (
                              <div key={connectionId} className="flex items-center justify-between p-2 border rounded">
                                <span className="text-sm">{targetNode?.title || 'Unknown'}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDisconnectNodes(selectedNode.id, connectionId)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs text-muted-foreground">No connections</p>
                        )}
                        
                        {/* Add Connection */}
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleConnectNodes(selectedNode.id, e.target.value);
                              e.target.value = '';
                            }
                          }}
                          className="w-full px-3 py-2 border rounded-md text-sm"
                        >
                          <option value="">Connect to...</option>
                          {journey.nodes
                            .filter(node => node.id !== selectedNode.id && !selectedNode.connections.includes(node.id))
                            .map(node => (
                              <option key={node.id} value={node.id}>
                                {node.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleDeleteNode(selectedNode.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Node
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Press Delete key to delete selected node
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Settings className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Select a node to configure its properties</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      // case 4: Automation & Rules - Hidden but kept for future use
      // return (
      //   <AutomationConfig />
      // );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review & Launch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-900">Journey Ready</h4>
                  </div>
                  <p className="text-sm text-green-800">
                    Your journey is configured and ready to launch. Review the summary below.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Journey Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{journey.name || 'Untitled Journey'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target Segment:</span>
                        <span>{journey.segment || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Flow Steps:</span>
                        <span>{journey.nodes.length} steps</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Launch Options</h4>
                    <div className="space-y-3">
                      <Button className="w-full" onClick={handleLaunchJourney}>
                        <Play className="h-4 w-4 mr-2" />
                        Launch Journey
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowJourneyPreview(true)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview First
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Save as Draft
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/journey-builder">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Journey</h1>
                <p className="text-muted-foreground">
                  Design automated customer engagement flows
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowJourneyPreview(true)}
                disabled={journey.nodes.length === 0 && !journey.name}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {stepNames.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center space-x-2 min-w-fit">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index < currentStep
                        ? 'bg-green-600 text-white'
                        : index === currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < stepNames.length - 1 && (
                  <div
                    className={`h-0.5 w-8 ${
                      index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="flex-1">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentStep < stepNames.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(stepNames.length - 1, currentStep + 1))}
                  disabled={currentStep === 2 && !journey.segment}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleLaunchJourney}>
                  <Play className="h-4 w-4 mr-2" />
                  Launch Journey
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Journey Preview Modal */}
        {showJourneyPreview && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowJourneyPreview(false);
              }
            }}
          >
            <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-bold">Journey Preview</h2>
                  <p className="text-muted-foreground">
                    {journey.name || 'Untitled Journey'} - Complete flow overview
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowJourneyPreview(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-auto max-h-[70vh]">
                <div className="space-y-6">
                  {/* Journey Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{journey.nodes.length}</div>
                          <p className="text-sm text-muted-foreground">Total Steps</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{journey.segment || 'Not selected'}</div>
                          <p className="text-sm text-muted-foreground">Target Segment</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {journey.nodes.filter(n => n.type === 'action').length}
                          </div>
                          <p className="text-sm text-muted-foreground">Action Steps</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Flow Steps */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Journey Flow</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {/* Flow Statistics */}
                      <div className="mb-4 p-3 bg-white rounded border">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-blue-600">
                              {journey.nodes.filter(n => n.type === 'trigger').length}
                            </div>
                            <div className="text-muted-foreground">Triggers</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-green-600">
                              {journey.nodes.filter(n => n.type === 'action').length}
                            </div>
                            <div className="text-muted-foreground">Actions</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-purple-600">
                              {journey.nodes.filter(n => n.type === 'condition').length}
                            </div>
                            <div className="text-muted-foreground">Conditions</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-orange-600">
                              {journey.nodes.filter(n => n.type === 'delay').length}
                            </div>
                            <div className="text-muted-foreground">Delays</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                      {journey.nodes.map((node, index) => {
                        const nodeType = nodeTypes.find(nt => nt.type === node.type);
                        const categoryConfig = node.category ? JourneyStageCategories[node.category] : null;
                        
                        return (
                          <div key={node.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            {/* Step Number */}
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                              {index + 1}
                            </div>
                            
                            {/* Node Icon */}
                            <div className={`p-2 rounded ${nodeType?.color || categoryConfig?.color || 'bg-gray-500'}`}>
                              {nodeType?.icon ? (
                                <nodeType.icon className="h-4 w-4 text-white" />
                              ) : categoryConfig?.icon ? (
                                <categoryConfig.icon className="h-4 w-4 text-white" />
                              ) : (
                                <Target className="h-4 w-4 text-white" />
                              )}
                            </div>
                            
                            {/* Node Details */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{node.title}</h4>
                                <Badge variant="outline">{node.type}</Badge>
                                {node.category && (
                                  <Badge variant="secondary">{node.category}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{node.description}</p>
                              
                              {/* Config Preview */}
                              {node.config && Object.keys(node.config).length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {node.config.channel && (
                                    <Badge variant="outline" className="text-xs">
                                      {node.config.channel}
                                    </Badge>
                                  )}
                                  {node.config.templateName && (
                                    <Badge variant="secondary" className="text-xs">
                                      {node.config.templateName}
                                    </Badge>
                                  )}
                                  {node.config.duration && (
                                    <Badge variant="outline" className="text-xs">
                                      {node.config.duration} {node.config.unit}
                                    </Badge>
                                  )}
                                  {node.config.subject && (
                                    <Badge variant="outline" className="text-xs">
                                      {node.config.subject}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {/* Arrow to next step */}
                            {index < journey.nodes.length - 1 && (
                              <div className="flex-shrink-0">
                                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  </div>

                  {/* Empty State */}
                  {journey.nodes.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🎨</div>
                      <h3 className="text-lg font-medium mb-2">No Journey Steps</h3>
                      <p className="text-muted-foreground">
                        Add steps to your journey to see the preview
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-2 p-6 border-t">
                <Button variant="outline" onClick={() => setShowJourneyPreview(false)}>
                  Close
                </Button>
                <Button onClick={() => setShowJourneyPreview(false)}>
                  Continue Editing
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Channel Template Modal */}
        {showChannelTemplateModal && channelTemplateConfig && (
          <ChannelTemplateModal
            isOpen={showChannelTemplateModal}
            onClose={handleCloseTemplateModal}
            channel={channelTemplateConfig.channel}
            nodeCategory={channelTemplateConfig.nodeCategory}
            nodeTitle={channelTemplateConfig.nodeTitle}
            nodeDescription={channelTemplateConfig.nodeDescription}
            onTemplateSelect={handleTemplateSelect}
          />
        )}
      </StaticExportLayout>
    </>
  );
}