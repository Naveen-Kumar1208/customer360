"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  MessageCircle,
  Sparkles,
  HelpCircle,
  BarChart3,
  Users,
  Target,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const predefinedQuestions = [
  "How do I create a new campaign?",
  "What are the AI models available?",
  "How to segment customers?",
  "Explain campaign performance metrics",
  "How to set up automation?",
  "What channels are most effective?"
];

const aiResponses = {
  "campaign": {
    keywords: ["campaign", "create", "new campaign", "ai campaign"],
    response: "To create a new campaign, go to AI Campaigns → Create AI Campaign. You'll go through 4 steps: 1) Campaign Details, 2) AI Model Selection, 3) Audience & Channels, 4) Budget & Timeline. Our AI will help optimize your campaign automatically!",
    suggestions: ["Show me AI models", "What are the best channels?", "How to set campaign budget?"]
  },
  "models": {
    keywords: ["ai model", "models", "propensity", "churn", "machine learning"],
    response: "We offer 5 AI models: Propensity Scoring v2.1 (94% accuracy), Churn Prediction v3.0 (89% accuracy), Next Best Action v1.5 (87% accuracy), Lookalike Modeling v1.8 (82% accuracy), and Sentiment Analysis v2.3 (76% accuracy). Each model is optimized for different campaign types.",
    suggestions: ["Which model for retention?", "How does propensity scoring work?", "Model accuracy comparison"]
  },
  "segmentation": {
    keywords: ["segment", "audience", "customers", "targeting"],
    response: "Customer segmentation is available in the Segments section. You can segment by: High Value Customers (15.4K), New Customers (8.7K), Dormant Customers (22.1K), Frequent Users (12.3K), and Price Sensitive (18.9K). Use behavioral data, demographics, and purchase history for precise targeting.",
    suggestions: ["How to create custom segments?", "What data is used for segmentation?", "Segment performance metrics"]
  },
  "metrics": {
    keywords: ["metrics", "performance", "analytics", "roi", "conversion"],
    response: "Track key metrics in the Dashboard: Conversion rates, ROI, engagement rates, channel effectiveness, customer lifetime value, and churn rates. AI campaigns typically show 125% better ROI than manual campaigns. Use the Analytics section for detailed performance insights.",
    suggestions: ["How to improve conversion rates?", "Channel performance comparison", "ROI calculation methods"]
  },
  "automation": {
    keywords: ["automation", "workflow", "trigger", "journey"],
    response: "Set up automation in the Automation section. Create workflows based on customer behaviors, time-based triggers, or AI predictions. Common automations: Welcome series, abandoned cart recovery, renewal reminders, and cross-sell sequences.",
    suggestions: ["Create welcome automation", "Set up renewal reminders", "Behavior-based triggers"]
  },
  "channels": {
    keywords: ["channel", "email", "sms", "whatsapp", "effectiveness"],
    response: "Available channels: Email (72% effective, $0.08/msg), SMS (68% effective, $0.12/msg), WhatsApp (85% effective, $0.15/msg), Push Notifications (78% effective, $0.03/msg), Voice Calls (92% effective, $1.25/msg). WhatsApp and Voice show highest effectiveness.",
    suggestions: ["Best channel for my campaign type?", "Channel cost optimization", "Multi-channel strategies"]
  },
  "default": {
    keywords: [],
    response: "I'm your AI assistant for the Customer 360 platform! I can help you with campaigns, customer segmentation, AI models, automation, analytics, and more. What would you like to know?",
    suggestions: predefinedQuestions.slice(0, 3)
  }
};

function findBestResponse(query: string): typeof aiResponses.default {
  const lowerQuery = query.toLowerCase();
  
  for (const [key, response] of Object.entries(aiResponses)) {
    if (key === 'default') continue;
    
    const hasKeyword = response.keywords.some(keyword => 
      lowerQuery.includes(keyword.toLowerCase())
    );
    
    if (hasKeyword) {
      return response;
    }
  }
  
  return aiResponses.default;
}

export function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI assistant for Customer 360. I can help you with campaigns, analytics, automation, and more. What can I help you with today?",
      isUser: false,
      timestamp: new Date(),
      suggestions: predefinedQuestions.slice(0, 3)
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = findBestResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="lg"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={cn(
        "w-96 shadow-2xl transition-all duration-300",
        isMinimized ? "h-16" : "h-[600px]"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
              <p className="text-xs text-blue-100">Customer 360 Helper</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-[548px] p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    message.isUser 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-900"
                  )}>
                    <p>{message.text}</p>
                    {message.suggestions && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs px-2 py-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t bg-gray-50">
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick("Show campaign analytics")}>
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analytics
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick("How to segment customers?")}>
                  <Users className="h-3 w-3 mr-1" />
                  Segments
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick("Create new campaign")}>
                  <Target className="h-3 w-3 mr-1" />
                  Campaigns
                </Badge>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick("Setup automation")}>
                  <Zap className="h-3 w-3 mr-1" />
                  Automation
                </Badge>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Customer 360..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}