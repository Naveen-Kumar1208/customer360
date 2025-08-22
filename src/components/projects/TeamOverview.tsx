"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/data/projectsData";
import { 
  Users,
  User,
  Mail,
  Briefcase,
  FolderOpen
} from "lucide-react";

export function TeamOverview() {
  const getRoleColor = (role: string) => {
    if (role.includes("Manager")) return "bg-purple-100 text-purple-800";
    if (role.includes("Senior") || role.includes("Lead")) return "bg-blue-100 text-blue-800";
    if (role.includes("Developer")) return "bg-green-100 text-green-800";
    if (role.includes("Designer")) return "bg-orange-100 text-orange-800";
    if (role.includes("Specialist")) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-500" />
          Team Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="border rounded-lg p-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{member.name}</h4>
                    <Badge className={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      <span>{member.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FolderOpen className="h-3 w-3" />
                      <span>{member.activeProjects.length} active project{member.activeProjects.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}