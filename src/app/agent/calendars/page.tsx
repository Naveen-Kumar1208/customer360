"use client";

import React from "react";
import { CalendarView } from "@/components/calendars/CalendarView";

export default function CalendarsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">Manage your scheduled meetings, calls, and appointments</p>
        </div>
      </div>
      
      <CalendarView />
    </div>
  );
}