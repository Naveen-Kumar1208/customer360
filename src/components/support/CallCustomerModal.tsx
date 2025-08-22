"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  X, 
  PhoneCall,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  Building2,
  Mail,
  Calendar,
  Play,
  Pause,
  Square,
  MicIcon,
  Volume2
} from 'lucide-react';

interface CallCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: any;
}

export const CallCustomerModal: React.FC<CallCustomerModalProps> = ({
  isOpen,
  onClose,
  ticket
}) => {
  const [callState, setCallState] = useState<'preparing' | 'calling' | 'connected' | 'ended'>('preparing');
  const [callDuration, setCallDuration] = useState(0);
  const [callNotes, setCallNotes] = useState('');
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(ticket?.customer?.phone || '');
  const [callOutcome, setCallOutcome] = useState('');
  const [followUpRequired, setFollowUpRequired] = useState(false);

  if (!isOpen || !ticket) return null;

  const startCall = () => {
    setCallState('calling');
    setTimeout(() => {
      setCallState('connected');
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      // Auto-end call after demo (remove in real implementation)
      setTimeout(() => {
        setCallState('ended');
        clearInterval(interval);
      }, 10000);
    }, 3000);
  };

  const endCall = () => {
    setCallState('ended');
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && callState === 'preparing') {
      onClose();
    }
  };

  const handleSaveAndClose = () => {
    // In real implementation, save call log to ticket
    console.log('Saving call log:', {
      duration: callDuration,
      notes: callNotes,
      outcome: callOutcome,
      followUpRequired
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold">Call Customer</h2>
              <p className="text-sm text-gray-600">{ticket.ticketNumber}</p>
            </div>
          </div>
          {callState === 'preparing' && (
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {ticket.customer.firstName.charAt(0)}{ticket.customer.lastName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{ticket.customer.fullName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{ticket.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <span>{ticket.customer.company?.name}</span>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {ticket.priority}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {callState === 'preparing' && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PhoneCall className="w-5 h-5" />
                    Call Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={selectedPhoneNumber}
                      onChange={(e) => setSelectedPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-blue-800">Call Context</h4>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      <strong>Subject:</strong> {ticket.subject}
                    </p>
                    <p className="text-sm text-blue-700">
                      <strong>Issue:</strong> {ticket.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {(callState === 'calling' || callState === 'connected') && (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold ${
                        callState === 'calling' ? 'animate-pulse' : ''
                      }`}>
                        {ticket.customer.firstName.charAt(0)}{ticket.customer.lastName.charAt(0)}
                      </div>
                      {callState === 'calling' && (
                        <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{ticket.customer.fullName}</h3>
                      <p className="text-gray-600">{selectedPhoneNumber}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-900">
                        {callState === 'calling' ? 'Calling...' : 'Connected'}
                      </p>
                      {callState === 'connected' && (
                        <div className="flex items-center justify-center gap-2 text-2xl font-mono text-green-600">
                          <Clock className="w-6 h-6" />
                          <span>{formatDuration(callDuration)}</span>
                        </div>
                      )}
                    </div>
                    
                    {callState === 'connected' && (
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" size="lg" className="rounded-full">
                          <MicIcon className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full">
                          <Volume2 className="w-5 h-5" />
                        </Button>
                        <Button 
                          onClick={endCall}
                          size="lg" 
                          className="rounded-full bg-red-600 hover:bg-red-700"
                        >
                          <Phone className="w-5 h-5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {callState === 'ended' && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Call Completed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="text-sm text-green-700">Call Duration</p>
                      <p className="text-lg font-semibold text-green-800">{formatDuration(callDuration)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Status</p>
                      <p className="text-lg font-semibold text-green-800">Completed</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="callOutcome">Call Outcome</Label>
                    <select
                      id="callOutcome"
                      value={callOutcome}
                      onChange={(e) => setCallOutcome(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select outcome...</option>
                      <option value="resolved">Issue Resolved</option>
                      <option value="escalated">Escalated to Technical Team</option>
                      <option value="follow_up">Follow-up Required</option>
                      <option value="no_answer">No Answer</option>
                      <option value="voicemail">Left Voicemail</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="callNotes">Call Notes</Label>
                    <Textarea
                      id="callNotes"
                      value={callNotes}
                      onChange={(e) => setCallNotes(e.target.value)}
                      placeholder="Enter details about the call, what was discussed, and any action items..."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="followUp"
                      checked={followUpRequired}
                      onChange={(e) => setFollowUpRequired(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="followUp" className="text-sm">
                      Schedule follow-up call
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          {callState === 'preparing' && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={startCall}
                disabled={!selectedPhoneNumber}
                className="bg-green-600 hover:bg-green-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                Start Call
              </Button>
            </>
          )}
          
          {callState === 'ended' && (
            <>
              <Button variant="outline" onClick={onClose}>
                Discard
              </Button>
              <Button 
                onClick={handleSaveAndClose}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Save Call Log
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};