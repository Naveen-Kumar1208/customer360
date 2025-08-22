"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Calendar, Clock, Users, Save, X } from "lucide-react";

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
}

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholder: Stakeholder | null;
  onSchedule: (callData: any) => void;
}

export default function ScheduleCallModal({
  isOpen,
  onClose,
  stakeholder,
  onSchedule
}: ScheduleCallModalProps) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "30",
    type: "discovery",
    agenda: "",
    notes: "",
    includeTeam: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stakeholder) return;

    const callData = {
      id: `call-${Date.now()}`,
      stakeholderId: stakeholder.id,
      stakeholderName: stakeholder.name,
      stakeholderEmail: stakeholder.email,
      stakeholderPhone: stakeholder.phone,
      ...formData,
      scheduledBy: "Agent",
      scheduledAt: new Date(),
      status: "scheduled"
    };

    onSchedule(callData);
    
    // Reset form
    setFormData({
      date: "",
      time: "",
      duration: "30",
      type: "discovery",
      agenda: "",
      notes: "",
      includeTeam: false
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate time slots (9 AM to 6 PM in 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  if (!stakeholder) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Schedule Call</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stakeholder Info */}
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {stakeholder.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{stakeholder.name}</h3>
              <p className="text-sm text-gray-600">{stakeholder.role} • {stakeholder.company}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500">📧 {stakeholder.email}</span>
                <span className="text-xs text-gray-500">📞 {stakeholder.phone}</span>
              </div>
            </div>
          </div>

          {/* Call Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Call Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    min={today}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                  <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                    <SelectTrigger className="pl-9">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Call Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discovery">Discovery Call</SelectItem>
                    <SelectItem value="demo">Product Demo</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="proposal">Proposal Review</SelectItem>
                    <SelectItem value="check-in">Check-in</SelectItem>
                    <SelectItem value="closing">Closing Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Call Agenda */}
          <div className="space-y-2">
            <Label htmlFor="agenda">Call Agenda *</Label>
            <Textarea
              id="agenda"
              value={formData.agenda}
              onChange={(e) => handleInputChange("agenda", e.target.value)}
              placeholder="What will you discuss during this call?"
              rows={3}
              required
            />
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional Options</h3>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeTeam"
                checked={formData.includeTeam}
                onChange={(e) => handleInputChange("includeTeam", e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="includeTeam" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Include team members in this call</span>
              </Label>
            </div>
          </div>

          {/* Preparation Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Preparation Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any specific preparation notes or context for this call..."
              rows={2}
            />
          </div>

          {/* Call Summary */}
          {formData.date && formData.time && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Call Summary</h4>
              <div className="text-sm text-green-800 space-y-1">
                <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Time:</strong> {timeSlots.find(slot => slot.value === formData.time)?.label}</p>
                <p><strong>Duration:</strong> {formData.duration} minutes</p>
                <p><strong>Type:</strong> {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Call</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Schedule Call
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}