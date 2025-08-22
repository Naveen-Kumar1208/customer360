"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  X, 
  Save,
  User,
  CheckCircle,
  AlertTriangle,
  Building2,
  Mail,
  Calendar,
  MessageCircle
} from 'lucide-react';

interface ReopenTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: any;
}

const reopenReasons = [
  { value: 'issue_not_resolved', label: 'Issue Not Fully Resolved', description: 'The original problem persists or was not completely fixed' },
  { value: 'new_information', label: 'New Information Provided', description: 'Customer provided additional details or context' },
  { value: 'related_issue', label: 'Related Issue Discovered', description: 'A related or secondary issue has been identified' },
  { value: 'regression', label: 'Regression/Issue Returned', description: 'The problem reoccurred after being marked as resolved' },
  { value: 'customer_request', label: 'Customer Request', description: 'Customer specifically requested to reopen the ticket' },
  { value: 'follow_up_needed', label: 'Follow-up Required', description: 'Additional work or follow-up is needed' }
];

export const ReopenTicketModal: React.FC<ReopenTicketModalProps> = ({
  isOpen,
  onClose,
  ticket
}) => {
  const [isReopening, setIsReopening] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reopenReason, setReopenReason] = useState('');
  const [reopenNotes, setReopenNotes] = useState('');
  const [newPriority, setNewPriority] = useState(ticket?.priority || 'medium');
  const [assignToMe, setAssignToMe] = useState(true);
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  if (!isOpen || !ticket) return null;

  const handleReopen = async () => {
    if (!reopenReason || !reopenNotes.trim()) return;

    setIsReopening(true);
    
    try {
      // Simulate reopening ticket
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Reopen failed:', error);
    } finally {
      setIsReopening(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isReopening) {
      onClose();
    }
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${Math.floor(diff / (1000 * 60))}m ago`;
  };

  if (showSuccess) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ticket Reopened!</h3>
            <p className="text-sm text-gray-600 text-center">
              The support ticket has been successfully reopened and is now active.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedReason = reopenReasons.find(r => r.value === reopenReason);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-orange-600" />
            <div>
              <h2 className="text-xl font-semibold">Reopen Ticket</h2>
              <p className="text-sm text-gray-600">{ticket.ticketNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isReopening}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          <div className="space-y-6">
            {/* Current Ticket Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Current Ticket Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {ticket.customer.firstName.charAt(0)}{ticket.customer.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{ticket.customer.fullName}</h3>
                      <p className="text-sm text-gray-600">{ticket.subject}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{ticket.customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{ticket.customer.company?.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gray-100 text-gray-800 mb-1">
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                      <p className="text-xs text-gray-500">
                        {ticket.resolvedAt && `Resolved ${timeAgo(ticket.resolvedAt)}`}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Priority</p>
                      <p className="text-gray-600 capitalize">{ticket.priority}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Assigned Agent</p>
                      <p className="text-gray-600">{ticket.assignedAgent}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Created</p>
                      <p className="text-gray-600">{timeAgo(ticket.createdAt)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Last Updated</p>
                      <p className="text-gray-600">{timeAgo(ticket.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reopen Configuration */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Reopen Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reopenReason">Reason for Reopening *</Label>
                  <div className="grid gap-3">
                    {reopenReasons.map((reason) => (
                      <div
                        key={reason.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-orange-300 ${
                          reopenReason === reason.value ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                        }`}
                        onClick={() => setReopenReason(reason.value)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{reason.label}</h4>
                            <p className="text-xs text-gray-600 mt-1">{reason.description}</p>
                          </div>
                          {reopenReason === reason.value && (
                            <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedReason && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <h4 className="font-medium text-orange-800">{selectedReason.label}</h4>
                    </div>
                    <p className="text-sm text-orange-700">{selectedReason.description}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reopenNotes">Detailed Notes *</Label>
                  <Textarea
                    id="reopenNotes"
                    value={reopenNotes}
                    onChange={(e) => setReopenNotes(e.target.value)}
                    placeholder="Provide detailed information about why this ticket needs to be reopened. Include any new information, issues discovered, or customer feedback..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPriority">New Priority</Label>
                    <select
                      id="newPriority"
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Assignment Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="assignToMe"
                          checked={assignToMe}
                          onChange={(e) => setAssignToMe(e.target.checked)}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <Label htmlFor="assignToMe" className="text-sm">
                          Assign ticket to me
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="notifyCustomer"
                          checked={notifyCustomer}
                          onChange={(e) => setNotifyCustomer(e.target.checked)}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <Label htmlFor="notifyCustomer" className="text-sm">
                          Notify customer about reopening
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview of Changes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Summary of Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm line-through text-gray-400">{ticket.status.replace('_', ' ')}</span>
                      <span className="text-sm">→</span>
                      <Badge className="bg-blue-100 text-blue-800">open</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Priority:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm line-through text-gray-400">{ticket.priority}</span>
                      <span className="text-sm">→</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{newPriority}</Badge>
                    </div>
                  </div>
                  
                  {assignToMe && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Assigned Agent:</span>
                      <span className="text-sm font-medium">Current User</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reason:</span>
                    <span className="text-sm font-medium">{selectedReason?.label}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Customer Notification:</span>
                    <span className="text-sm font-medium">{notifyCustomer ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose} disabled={isReopening}>
            Cancel
          </Button>
          <Button
            onClick={handleReopen}
            disabled={isReopening || !reopenReason || !reopenNotes.trim()}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isReopening ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Reopening...
              </div>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reopen Ticket
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};