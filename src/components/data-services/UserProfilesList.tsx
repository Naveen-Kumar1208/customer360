"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { userProfiles } from "@/lib/data/dataServicesData";
import { 
  UserPlus,
  User,
  Shield,
  Building,
  Clock,
  Key
} from "lucide-react";

export function UserProfilesList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    if (role.includes("Admin")) return "bg-purple-100 text-purple-800";
    if (role.includes("Manager")) return "bg-blue-100 text-blue-800";
    if (role.includes("Analyst")) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-orange-500" />
          User Profiles Created
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userProfiles.map((user) => (
            <div key={user.userId} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">{user.userName}</h4>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Badge className={getRoleBadgeColor(user.role)}>
                  <Shield className="h-3 w-3 mr-1" />
                  {user.role}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-3 w-3" />
                    <span>Department:</span>
                    <span className="font-medium text-foreground">{user.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>Created by:</span>
                    <span className="font-medium text-foreground text-xs">{user.createdBy}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Created:</span>
                    <span className="font-medium text-foreground text-xs">{user.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Last Login:</span>
                    <span className="font-medium text-foreground text-xs">{user.lastLogin}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center gap-1">
                  <Key className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Permissions:</span>
                  <div className="flex gap-1 ml-2">
                    {user.permissions.map((perm, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
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