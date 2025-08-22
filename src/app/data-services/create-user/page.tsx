"use client";

import type React from "react";
import { useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { userProfiles } from "@/lib/data/dataServicesData";
import { 
  UserPlus, 
  User, 
  Mail, 
  Building, 
  Shield,
  Key,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    department: "",
    password: "",
    confirmPassword: ""
  });
  const [permissions, setPermissions] = useState({
    read: true,
    write: false,
    execute: false,
    delete: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [creating, setCreating] = useState(false);

  const departments = [
    "Marketing",
    "Sales",
    "Analytics",
    "Product",
    "Engineering",
    "Customer Service",
    "Finance",
    "Human Resources",
    "Operations"
  ];

  const roles = [
    { value: "admin", label: "Administrator", color: "purple" },
    { value: "manager", label: "Manager", color: "blue" },
    { value: "analyst", label: "Analyst", color: "green" },
    { value: "viewer", label: "Viewer", color: "gray" },
    { value: "editor", label: "Editor", color: "orange" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateUser = async () => {
    setCreating(true);
    // Simulate user creation
    setTimeout(() => {
      setCreating(false);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        department: "",
        password: "",
        confirmPassword: ""
      });
      setPermissions({
        read: true,
        write: false,
        execute: false,
        delete: false
      });
    }, 2000);
  };

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.role && 
           formData.department && 
           formData.password && 
           formData.password === formData.confirmPassword &&
           formData.password.length >= 8;
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/data-services')}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Create User</h1>
              <p className="text-muted-foreground">
                Add new users to your Customer 360 platform
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-orange-500" />
                    User Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">First Name</label>
                        <Input
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Last Name</label>
                        <Input
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="email"
                          type="email"
                          placeholder="john.doe@company.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Department</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Select 
                          value={formData.department} 
                          onValueChange={(value) => setFormData({...formData, department: value})}
                        >
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-green-500" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Password</label>
                      <div className="relative">
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {formData.password && formData.password.length < 8 && (
                        <p className="text-xs text-red-500 mt-1">Password must be at least 8 characters</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Confirm Password</label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5" />
                        <span>Password must be at least 8 characters and include uppercase, lowercase, and numbers.</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-500" />
                    Role & Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">User Role</label>
                      <Select 
                        value={formData.role} 
                        onValueChange={(value) => setFormData({...formData, role: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              <div className="flex items-center gap-2">
                                <Shield className={`h-4 w-4 text-${role.color}-500`} />
                                {role.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-3 block">Permissions</label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={permissions.read}
                            onChange={(e) => setPermissions({...permissions, read: e.target.checked})}
                            className="rounded"
                          />
                          <span className="text-sm">Read - View data and reports</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={permissions.write}
                            onChange={(e) => setPermissions({...permissions, write: e.target.checked})}
                            className="rounded"
                          />
                          <span className="text-sm">Write - Create and modify data</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={permissions.execute}
                            onChange={(e) => setPermissions({...permissions, execute: e.target.checked})}
                            className="rounded"
                          />
                          <span className="text-sm">Execute - Run queries and reports</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={permissions.delete}
                            onChange={(e) => setPermissions({...permissions, delete: e.target.checked})}
                            className="rounded"
                          />
                          <span className="text-sm">Delete - Remove data and records</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Recently Created Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProfiles.slice(0, 3).map((user) => (
                      <div key={user.userId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{user.userName}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button 
                className="w-full" 
                size="lg"
                disabled={!isFormValid() || creating}
                onClick={handleCreateUser}
              >
                {creating ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2 animate-spin" />
                    Creating User...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create User Account
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </StaticExportLayout>
    </>
  );
}