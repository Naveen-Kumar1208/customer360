"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send,
  User,
  CheckCircle,
  Clock,
  Paperclip,
  Building2,
  Mail,
  Smile,
  Bold,
  Italic,
  List
} from 'lucide-react';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: any;
}

const quickReplies = [
  "Thank you for contacting our support team. I'll look into this issue for you.",
  "I understand your concern. Let me investigate this further and get back to you shortly.",
  "Could you please provide more details about when this issue started?",
  "I've escalated this to our technical team. We'll update you within 24 hours.",
  "The issue has been resolved. Please test and let us know if you need further assistance.",
  "Thank you for your patience. We're still working on this and will update you soon."
];

export const ReplyModal: React.FC<ReplyModalProps> = ({
  isOpen,
  onClose,
  ticket
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [newStatus, setNewStatus] = useState(ticket?.status || 'open');

  if (!isOpen || !ticket) return null;

  const handleQuickReplySelect = (message: string) => {
    setReplyMessage(message);
  };

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) return;

    setIsReplying(true);
    
    try {
      // Simulate sending reply
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Reply failed:', error);
    } finally {
      setIsReplying(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isReplying) {
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reply Sent!</h3>
            <p className="text-sm text-gray-600 text-center">
              Your reply has been sent to the customer successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">Reply to Ticket</h2>
              <p className="text-sm text-gray-600">{ticket.ticketNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isReplying}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Column - Conversation History */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {ticket.customer.firstName.charAt(0)}{ticket.customer.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{ticket.customer.fullName}</p>
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

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Ticket Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Subject</p>
                    <p className="text-sm text-gray-900">{ticket.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Description</p>
                    <p className="text-sm text-gray-900">{ticket.description}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Status</p>
                      <p className="text-gray-900 capitalize">{ticket.status.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Created</p>
                      <p className="text-gray-900">{timeAgo(ticket.createdAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Conversation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {ticket.messages.map((message: any) => (
                      <div key={message.id} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          message.sender === 'customer' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {message.sender === 'customer' ? 'C' : 'A'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium capitalize">{message.sender}</span>
                            <span className="text-xs text-gray-500">{timeAgo(message.timestamp)}</span>
                          </div>
                          <div className={`p-3 rounded-lg text-sm ${
                            message.sender === 'customer' ? 'bg-blue-50 text-blue-900' : 'bg-green-50 text-green-900'
                          }`}>
                            {message.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Reply Form */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Replies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 max-h-40 overflow-y-auto">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReplySelect(reply)}
                        className="p-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Compose Reply</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="customer"
                        name="replyType"
                        checked={!isInternal}
                        onChange={() => setIsInternal(false)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="customer" className="text-sm font-medium">
                        Reply to Customer
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="internal"
                        name="replyType"
                        checked={isInternal}
                        onChange={() => setIsInternal(true)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="internal" className="text-sm font-medium">
                        Internal Note
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2 p-2 border border-gray-200 rounded-md">
                      <Button variant="ghost" size="sm">
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <List className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder={isInternal ? "Add internal notes for other agents..." : "Type your reply to the customer..."}
                      rows={8}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        id="attachments"
                        multiple
                        onChange={handleFileAttachment}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('attachments')?.click()}
                      >
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attach Files
                      </Button>
                      {attachments.length > 0 && (
                        <span className="text-sm text-gray-600">{attachments.length} file(s)</span>
                      )}
                    </div>
                    
                    {attachments.length > 0 && (
                      <div className="space-y-2">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <button
                              onClick={() => removeAttachment(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isInternal && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Update Ticket Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="pending_customer">Pending Customer Response</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose} disabled={isReplying}>
            Cancel
          </Button>
          <Button
            onClick={handleReply}
            disabled={isReplying || !replyMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isReplying ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isInternal ? 'Adding Note...' : 'Sending Reply...'}
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {isInternal ? 'Add Internal Note' : 'Send Reply'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};