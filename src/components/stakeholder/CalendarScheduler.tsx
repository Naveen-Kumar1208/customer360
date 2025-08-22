"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Phone,
  Video,
  MapPin,
  Bell,
  Repeat,
  Plus,
  Check,
  X
} from "lucide-react";

interface CalendarSchedulerProps {
  stakeholderName: string;
  onSchedule: (meetingData: any) => void;
  onCancel: () => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
  label: string;
}

interface ScheduledMeeting {
  id: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  title: string;
}

export function CalendarScheduler({ stakeholderName, onSchedule, onCancel }: CalendarSchedulerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [meetingDetails, setMeetingDetails] = useState({
    duration: "30",
    type: "phone",
    title: `Meeting with ${stakeholderName}`,
    agenda: "",
    reminder: "15",
    recurring: "none",
    location: ""
  });

  // Sample existing meetings for demonstration
  const [existingMeetings] = useState<ScheduledMeeting[]>([
    {
      id: "1",
      date: "2024-01-16",
      time: "10:00",
      duration: 30,
      type: "video",
      title: "Team Standup"
    },
    {
      id: "2", 
      date: "2024-01-17",
      time: "14:00",
      duration: 60,
      type: "phone",
      title: "Client Review"
    }
  ]);

  // Time slots available for booking
  const timeSlots: TimeSlot[] = [
    { time: "09:00", available: true, label: "9:00 AM" },
    { time: "09:30", available: true, label: "9:30 AM" },
    { time: "10:00", available: false, label: "10:00 AM" },
    { time: "10:30", available: true, label: "10:30 AM" },
    { time: "11:00", available: true, label: "11:00 AM" },
    { time: "11:30", available: true, label: "11:30 AM" },
    { time: "12:00", available: false, label: "12:00 PM" },
    { time: "13:00", available: true, label: "1:00 PM" },
    { time: "13:30", available: true, label: "1:30 PM" },
    { time: "14:00", available: false, label: "2:00 PM" },
    { time: "14:30", available: true, label: "2:30 PM" },
    { time: "15:00", available: true, label: "3:00 PM" },
    { time: "15:30", available: true, label: "3:30 PM" },
    { time: "16:00", available: true, label: "4:00 PM" },
    { time: "16:30", available: true, label: "4:30 PM" },
    { time: "17:00", available: true, label: "5:00 PM" }
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get calendar days for the current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const selectDate = (date: Date) => {
    // Don't allow selecting past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;

    setSelectedDate(date);
    setSelectedTime(""); // Reset selected time when date changes
  };

  const isDateSelected = (date: Date) => {
    return selectedDate && 
           date.toDateString() === selectedDate.toDateString();
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6; // Disable weekends
  };

  const hasExistingMeeting = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return existingMeetings.some(meeting => meeting.date === dateStr);
  };

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return timeSlots;

    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    const meetingsOnDate = existingMeetings.filter(meeting => meeting.date === selectedDateStr);
    
    return timeSlots.map(slot => {
      const isOccupied = meetingsOnDate.some(meeting => meeting.time === slot.time);
      return {
        ...slot,
        available: slot.available && !isOccupied
      };
    });
  };

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) return;

    const meetingData = {
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      stakeholder: stakeholderName,
      ...meetingDetails
    };

    onSchedule(meetingData);
  };

  const isScheduleDisabled = !selectedDate || !selectedTime || !meetingDetails.title.trim();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getCalendarDays().map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = isDateSelected(date);
              const isDisabled = isDateDisabled(date);
              const hasMeeting = hasExistingMeeting(date);

              return (
                <button
                  key={index}
                  onClick={() => selectDate(date)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm rounded-lg transition-all relative
                    ${!isCurrentMonth ? 'text-gray-300' : ''}
                    ${isToday ? 'bg-blue-100 text-blue-700 font-semibold' : ''}
                    ${isSelected ? 'bg-blue-600 text-white' : ''}
                    ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                    ${!isDisabled && !isSelected ? 'hover:bg-gray-100' : ''}
                  `}
                >
                  {date.getDate()}
                  {hasMeeting && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
              </div>
              <span>Has meetings</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots & Details Section */}
      <div className="space-y-6">
        {/* Time Slots */}
        {selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Available Times
                <Badge variant="outline">
                  {selectedDate.toLocaleDateString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableTimeSlots().map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`
                      p-3 text-sm rounded-lg border transition-all
                      ${selectedTime === slot.time 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : slot.available 
                          ? 'hover:bg-gray-50 border-gray-200' 
                          : 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed'
                      }
                    `}
                  >
                    {slot.label}
                    {!slot.available && selectedTime !== slot.time && (
                      <div className="text-xs mt-1">Unavailable</div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Meeting Details */}
        {selectedDate && selectedTime && (
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meeting-title">Meeting Title</Label>
                <Input
                  id="meeting-title"
                  value={meetingDetails.title}
                  onChange={(e) => setMeetingDetails({...meetingDetails, title: e.target.value})}
                  placeholder="Enter meeting title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select 
                    value={meetingDetails.duration} 
                    onValueChange={(value) => setMeetingDetails({...meetingDetails, duration: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="meeting-type">Meeting Type</Label>
                  <Select 
                    value={meetingDetails.type} 
                    onValueChange={(value) => setMeetingDetails({...meetingDetails, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Call
                        </div>
                      </SelectItem>
                      <SelectItem value="video">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Video Call
                        </div>
                      </SelectItem>
                      <SelectItem value="in-person">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          In Person
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {meetingDetails.type === 'in-person' && (
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={meetingDetails.location}
                    onChange={(e) => setMeetingDetails({...meetingDetails, location: e.target.value})}
                    placeholder="Enter meeting location"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reminder">Reminder</Label>
                  <Select 
                    value={meetingDetails.reminder} 
                    onValueChange={(value) => setMeetingDetails({...meetingDetails, reminder: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes before</SelectItem>
                      <SelectItem value="15">15 minutes before</SelectItem>
                      <SelectItem value="30">30 minutes before</SelectItem>
                      <SelectItem value="60">1 hour before</SelectItem>
                      <SelectItem value="1440">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="recurring">Recurring</Label>
                  <Select 
                    value={meetingDetails.recurring} 
                    onValueChange={(value) => setMeetingDetails({...meetingDetails, recurring: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No repeat</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="agenda">Agenda / Notes</Label>
                <Textarea
                  id="agenda"
                  value={meetingDetails.agenda}
                  onChange={(e) => setMeetingDetails({...meetingDetails, agenda: e.target.value})}
                  placeholder="Meeting agenda, topics to discuss..."
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={onCancel}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSchedule}
                  disabled={isScheduleDisabled}
                  className="flex-1"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {!selectedDate && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-600">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-medium mb-2">Schedule a Meeting</h3>
                <p className="text-sm">
                  Select a date from the calendar to view available time slots for your meeting with {stakeholderName}.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}