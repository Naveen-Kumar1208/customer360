"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Clock,
  Phone,
  Video,
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  Bell,
  Users,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface ScheduledMeeting {
  id: string;
  title: string;
  stakeholder: string;
  date: string;
  time: string;
  duration: number;
  type: "phone" | "video" | "in-person";
  status: "upcoming" | "in-progress" | "completed" | "cancelled";
  agenda?: string;
  location?: string;
  reminder: number;
  recurring: string;
}

interface ScheduledMeetingsProps {
  onEditMeeting?: (meeting: ScheduledMeeting) => void;
  onCancelMeeting?: (meetingId: string) => void;
  onJoinMeeting?: (meeting: ScheduledMeeting) => void;
}

export function ScheduledMeetings({ 
  onEditMeeting, 
  onCancelMeeting, 
  onJoinMeeting 
}: ScheduledMeetingsProps) {
  // Sample scheduled meetings data
  const [meetings] = useState<ScheduledMeeting[]>([
    {
      id: "1",
      title: "Quarterly Business Review",
      stakeholder: "Sarah Johnson",
      date: "2024-01-16",
      time: "10:00",
      duration: 60,
      type: "video",
      status: "upcoming",
      agenda: "Discuss Q4 performance and Q1 planning",
      reminder: 15,
      recurring: "quarterly"
    },
    {
      id: "2",
      title: "Product Demo",
      stakeholder: "Robert Davis",
      date: "2024-01-17",
      time: "14:00",
      duration: 45,
      type: "phone",
      status: "upcoming",
      agenda: "Demo new features and gather feedback",
      reminder: 30,
      recurring: "none"
    },
    {
      id: "3",
      title: "Contract Negotiation",
      stakeholder: "Emily Chen",
      date: "2024-01-15",
      time: "16:00",
      duration: 90,
      type: "in-person",
      status: "completed",
      agenda: "Finalize contract terms and pricing",
      location: "Conference Room A",
      reminder: 60,
      recurring: "none"
    },
    {
      id: "4",
      title: "Weekly Sync",
      stakeholder: "Sarah Johnson",
      date: "2024-01-18",
      time: "09:00",
      duration: 30,
      type: "video",
      status: "upcoming",
      agenda: "Weekly status update and next steps",
      reminder: 15,
      recurring: "weekly"
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <Trash2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const sortedMeetings = meetings.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  const upcomingMeetings = sortedMeetings.filter(m => m.status === 'upcoming');
  const completedMeetings = sortedMeetings.filter(m => m.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Meetings</p>
                <p className="text-2xl font-bold">{upcomingMeetings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Meetings</p>
                <p className="text-2xl font-bold">
                  {upcomingMeetings.filter(m => isToday(m.date)).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">
                  {upcomingMeetings.filter(m => {
                    const meetingDate = new Date(m.date);
                    const now = new Date();
                    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    return meetingDate >= now && meetingDate <= weekFromNow;
                  }).length}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Meetings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingMeetings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No upcoming meetings scheduled</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div 
                  key={meeting.id} 
                  className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                    isToday(meeting.date) ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(meeting.type)}
                          <h3 className="font-semibold">{meeting.title}</h3>
                        </div>
                        <Badge className={getStatusColor(meeting.status)}>
                          {getStatusIcon(meeting.status)}
                          <span className="ml-1">{meeting.status}</span>
                        </Badge>
                        {isToday(meeting.date) && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            Today
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            <strong>With:</strong> {meeting.stakeholder}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Date:</strong> {formatDate(meeting.date)}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Time:</strong> {formatTime(meeting.time)} ({meeting.duration} min)
                          </p>
                        </div>
                        <div className="space-y-1">
                          {meeting.location && (
                            <p className="text-sm text-gray-600">
                              <strong>Location:</strong> {meeting.location}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            <strong>Type:</strong> {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
                          </p>
                          {meeting.recurring !== 'none' && (
                            <p className="text-sm text-gray-600">
                              <strong>Recurring:</strong> {meeting.recurring}
                            </p>
                          )}
                        </div>
                      </div>

                      {meeting.agenda && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          <strong>Agenda:</strong> {meeting.agenda}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {meeting.status === 'upcoming' && (
                        <Button 
                          size="sm" 
                          onClick={() => onJoinMeeting?.(meeting)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Join Meeting
                        </Button>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditMeeting?.(meeting)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Meeting
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onCancelMeeting?.(meeting.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Meeting
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recent Meetings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedMeetings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent meetings</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedMeetings.slice(0, 3).map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(meeting.type)}
                    <div>
                      <h4 className="font-medium text-sm">{meeting.title}</h4>
                      <p className="text-xs text-gray-600">
                        {meeting.stakeholder} • {formatDate(meeting.date)} at {formatTime(meeting.time)}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.status}
                  </Badge>
                </div>
              ))}
              
              {completedMeetings.length > 3 && (
                <Button variant="ghost" size="sm" className="w-full">
                  View All Recent Meetings
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}