"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Phone,
  Video,
  MapPin,
  Users,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CalendarEvent {
  id: string;
  title: string;
  stakeholder: string;
  date: string;
  time: string;
  duration: number;
  type: "phone" | "video" | "in-person" | "meeting";
  status: "upcoming" | "in-progress" | "completed" | "cancelled";
  agenda?: string;
  location?: string;
  color: string;
}

type ViewMode = "month" | "week" | "day";

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  // Sample calendar events with comprehensive schedule
  const [events, setEvents] = useState<CalendarEvent[]>([
    // Week 1 (Jan 15-21, 2024)
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
      color: "bg-blue-500"
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
      color: "bg-green-500"
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
      location: "Conference Room A",
      color: "bg-purple-500"
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
      color: "bg-orange-500"
    },
    {
      id: "5",
      title: "Team Standup",
      stakeholder: "Development Team",
      date: "2024-01-16",
      time: "09:30",
      duration: 30,
      type: "video",
      status: "upcoming",
      agenda: "Daily standup meeting",
      color: "bg-indigo-500"
    },
    {
      id: "6",
      title: "Client Presentation",
      stakeholder: "John Smith",
      date: "2024-01-19",
      time: "15:00",
      duration: 120,
      type: "in-person",
      status: "upcoming",
      agenda: "Present final proposal and pricing",
      location: "Client Office",
      color: "bg-red-500"
    },
    // Week 2 (Jan 22-28, 2024)
    {
      id: "7",
      title: "Follow-up Call",
      stakeholder: "Michael Brown",
      date: "2024-01-22",
      time: "11:00",
      duration: 30,
      type: "phone",
      status: "upcoming",
      agenda: "Follow up on previous proposal discussion",
      color: "bg-teal-500"
    },
    {
      id: "8",
      title: "Training Session",
      stakeholder: "Internal Team",
      date: "2024-01-23",
      time: "13:00",
      duration: 90,
      type: "video",
      status: "upcoming",
      agenda: "New product training for sales team",
      color: "bg-yellow-500"
    },
    {
      id: "9",
      title: "Vendor Meeting",
      stakeholder: "Tech Solutions Inc",
      date: "2024-01-24",
      time: "10:30",
      duration: 60,
      type: "in-person",
      status: "upcoming",
      agenda: "Discuss integration requirements",
      location: "Vendor Office",
      color: "bg-pink-500"
    },
    {
      id: "10",
      title: "Strategy Planning",
      stakeholder: "Leadership Team",
      date: "2024-01-25",
      time: "14:00",
      duration: 120,
      type: "video",
      status: "upcoming",
      agenda: "Q1 strategy and resource allocation",
      color: "bg-cyan-500"
    },
    // Current week (with today's date)
    {
      id: "11",
      title: "Daily Check-in",
      stakeholder: "Project Manager",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      duration: 15,
      type: "video",
      status: "upcoming",
      agenda: "Quick daily status update",
      color: "bg-emerald-500"
    },
    {
      id: "12",
      title: "Client Review",
      stakeholder: "ABC Corporation",
      date: new Date().toISOString().split('T')[0],
      time: "14:30",
      duration: 60,
      type: "video",
      status: "upcoming",
      agenda: "Monthly progress review and feedback",
      color: "bg-violet-500"
    },
    // Tomorrow
    {
      id: "13",
      title: "Sales Presentation",
      stakeholder: "Prospect Lead",
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      time: "11:00",
      duration: 45,
      type: "video",
      status: "upcoming",
      agenda: "Present solution overview and pricing",
      color: "bg-rose-500"
    },
    // Next week
    {
      id: "14",
      title: "Monthly Review",
      stakeholder: "Department Head",
      date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], // Next week
      time: "15:00",
      duration: 90,
      type: "in-person",
      status: "upcoming",
      agenda: "Monthly performance and KPI review",
      location: "Executive Conference Room",
      color: "bg-amber-500"
    },
    // Past events
    {
      id: "15",
      title: "Discovery Call",
      stakeholder: "New Prospect",
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      time: "10:00",
      duration: 30,
      type: "phone",
      status: "completed",
      agenda: "Initial discovery and needs assessment",
      color: "bg-slate-500"
    }
  ]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const shortDaysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const navigateDate = (direction: number) => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(currentDate.getMonth() + direction);
    } else if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(currentDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="h-3 w-3" />;
      case 'video': return <Video className="h-3 w-3" />;
      case 'in-person': return <MapPin className="h-3 w-3" />;
      case 'meeting': return <Users className="h-3 w-3" />;
      default: return <Calendar className="h-3 w-3" />;
    }
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleNewEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: (events.length + 1).toString()
    };
    setEvents([...events, newEvent]);
    setIsNewEventModalOpen(false);
  };

  const getRandomColor = () => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", 
      "bg-red-500", "bg-teal-500", "bg-yellow-500", "bg-pink-500", 
      "bg-cyan-500", "bg-emerald-500", "bg-violet-500", "bg-rose-500",
      "bg-amber-500", "bg-slate-500", "bg-indigo-500"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getWeekRange = () => {
    const weekDays = getWeekDays();
    const start = weekDays[0];
    const end = weekDays[6];
    return `${start.getDate()} ${monthNames[start.getMonth()].slice(0, 3)} - ${end.getDate()} ${monthNames[end.getMonth()].slice(0, 3)} ${end.getFullYear()}`;
  };

  const renderMonthView = () => {
    const calendarDays = getCalendarDays();
    
    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        {daysOfWeek.map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {calendarDays.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const dayEvents = getEventsForDate(date);
          
          return (
            <div
              key={index}
              className={`bg-white p-2 min-h-[120px] ${!isCurrentMonth ? 'text-gray-300' : ''} ${isToday ? 'bg-blue-50' : ''}`}
            >
              <div className={`text-sm mb-2 ${isToday ? 'font-bold text-blue-600' : ''}`}>
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className={`${event.color} text-white text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate`}
                  >
                    <div className="flex items-center gap-1">
                      {getTypeIcon(event.type)}
                      {formatTime(event.time)}
                    </div>
                    <div className="truncate">{event.title}</div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="bg-white rounded-lg border">
        {/* Header */}
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 text-sm font-medium text-gray-600">Time</div>
          {weekDays.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <div key={index} className={`p-4 text-center border-l ${isToday ? 'bg-blue-50' : ''}`}>
                <div className="text-sm font-medium text-gray-600">{daysOfWeek[index]}</div>
                <div className={`text-lg ${isToday ? 'font-bold text-blue-600' : ''}`}>
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Time Grid */}
        <div className="max-h-96 overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-100 min-h-[60px]">
              <div className="p-2 text-xs text-gray-500 border-r">
                {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
              {weekDays.map((date, dayIndex) => {
                const dayEvents = getEventsForDate(date).filter(event => {
                  const eventHour = Number.parseInt(event.time.split(':')[0]);
                  return eventHour === hour;
                });
                
                return (
                  <div key={dayIndex} className="border-l p-1 relative">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className={`${event.color} text-white text-xs p-2 rounded mb-1 cursor-pointer hover:opacity-80`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          {getTypeIcon(event.type)}
                          {formatTime(event.time)}
                        </div>
                        <div className="font-medium">{event.title}</div>
                        <div className="truncate">{event.stakeholder}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="bg-white rounded-lg border">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">
              {daysOfWeek[currentDate.getDay()]}
            </div>
            <div className="text-2xl font-bold">
              {currentDate.getDate()}
            </div>
            <div className="text-sm text-gray-500">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
          </div>
        </div>
        
        {/* Time Slots */}
        <div className="max-h-96 overflow-y-auto">
          {hours.map((hour) => {
            const hourEvents = dayEvents.filter(event => {
              const eventHour = Number.parseInt(event.time.split(':')[0]);
              return eventHour === hour;
            });
            
            return (
              <div key={hour} className="flex border-b border-gray-100 min-h-[60px]">
                <div className="w-20 p-2 text-xs text-gray-500 border-r">
                  {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
                <div className="flex-1 p-2">
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`${event.color} text-white p-3 rounded mb-2 cursor-pointer hover:opacity-80`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(event.type)}
                        <span className="font-medium">{formatTime(event.time)}</span>
                        <span className="text-sm opacity-80">({event.duration} min)</span>
                      </div>
                      <div className="font-medium text-lg">{event.title}</div>
                      <div className="text-sm opacity-90">{event.stakeholder}</div>
                      {event.agenda && (
                        <div className="text-sm opacity-80 mt-1">{event.agenda}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getViewTitle = () => {
    if (viewMode === "month") {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewMode === "week") {
      return getWeekRange();
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate(-1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold min-w-[250px] text-center">
                  {getViewTitle()}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate(1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Select value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              <Button size="sm" onClick={() => setIsNewEventModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Views */}
      <Card>
        <CardContent className="p-6">
          {viewMode === "month" && renderMonthView()}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "day" && renderDayView()}
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Event Details
            </DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                  <p className="text-gray-600">{selectedEvent.stakeholder}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Event
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-600">Date</div>
                  <div>{new Date(selectedEvent.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Time</div>
                  <div>{formatTime(selectedEvent.time)} ({selectedEvent.duration} min)</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Type</div>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(selectedEvent.type)}
                    {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Status</div>
                  <Badge className={
                    selectedEvent.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    selectedEvent.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {selectedEvent.status}
                  </Badge>
                </div>
              </div>

              {selectedEvent.location && (
                <div>
                  <div className="font-medium text-gray-600 text-sm">Location</div>
                  <div>{selectedEvent.location}</div>
                </div>
              )}

              {selectedEvent.agenda && (
                <div>
                  <div className="font-medium text-gray-600 text-sm">Agenda</div>
                  <div className="bg-gray-50 p-3 rounded text-sm">{selectedEvent.agenda}</div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex-1">
                  Join Meeting
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Event Modal */}
      <NewEventModal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSave={handleNewEvent}
        getRandomColor={getRandomColor}
      />
    </div>
  );
}

// New Event Modal Component
interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Omit<CalendarEvent, 'id'>) => void;
  getRandomColor: () => string;
}

function NewEventModal({ isOpen, onClose, onSave, getRandomColor }: NewEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    stakeholder: '',
    date: '',
    time: '',
    duration: 30,
    type: 'video' as const,
    status: 'upcoming' as const,
    agenda: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.stakeholder || !formData.date || !formData.time) {
      return;
    }

    const eventData: Omit<CalendarEvent, 'id'> = {
      ...formData,
      color: getRandomColor()
    };

    onSave(eventData);
    setFormData({
      title: '',
      stakeholder: '',
      date: '',
      time: '',
      duration: 30,
      type: 'video',
      status: 'upcoming',
      agenda: '',
      location: ''
    });
  };

  const isFormValid = formData.title && formData.stakeholder && formData.date && formData.time;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <Label htmlFor="stakeholder">Stakeholder/Attendee *</Label>
            <Input
              id="stakeholder"
              value={formData.stakeholder}
              onChange={(e) => setFormData({...formData, stakeholder: e.target.value})}
              placeholder="Enter stakeholder name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={formData.duration.toString()} onValueChange={(value) => setFormData({...formData, duration: Number.parseInt(value)})}>
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
              <Label htmlFor="type">Meeting Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
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
                  <SelectItem value="meeting">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Meeting
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === 'in-person' && (
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter meeting location"
              />
            </div>
          )}

          <div>
            <Label htmlFor="agenda">Agenda/Notes</Label>
            <Textarea
              id="agenda"
              value={formData.agenda}
              onChange={(e) => setFormData({...formData, agenda: e.target.value})}
              placeholder="Enter meeting agenda or notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid} className="flex-1">
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}