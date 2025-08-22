"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/authContext";
import { Eye, EyeOff, Mail } from "lucide-react";

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f6f8fb]">
      <svg className="animate-spin h-12 w-12 text-[#e85b5e] mb-3" viewBox="0 0 24 24">
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-[#c7494c] font-medium">Logging in...</span>
    </div>
  );
}

export default function SignInPage() {
  const { signin, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use useEffect for redirect instead of during render
  useEffect(() => {
    if (isAuthenticated) {
      // Check if there's a redirect parameter in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get('redirect') || '/';
      router.replace(redirectTo);
    }
  }, [isAuthenticated, router]);

  const validate = () => {
    // Check if fields are empty
    if (!email || !password) {
      setError("Please enter both email and password.");
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    
    // Check email length
    if (email.length > 100) {
      setError("Email address is too long.");
      return false;
    }
    
    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    
    if (password.length > 50) {
      setError("Password is too long.");
      return false;
    }
    
    // Check for spaces in password
    if (password.includes(' ')) {
      setError("Password cannot contain spaces.");
      return false;
    }
    
    return true;
  };

  const validateEmail = (value: string) => {
    setEmailError("");
    if (!value.trim()) {
      setEmailError("Email is required.");
      return false;
    }
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    if (value.length > 100) {
      setEmailError("Email address is too long.");
      return false;
    }
    return true;
  };

  const validatePassword = (value: string) => {
    setPasswordError("");
    if (!value.trim()) {
      setPasswordError("Password is required.");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return false;
    }
    if (value.length > 50) {
      setPasswordError("Password is too long.");
      return false;
    }
    if (value.includes(' ')) {
      setPasswordError("Password cannot contain spaces.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    const res = await signin(email, password);
    if (res.success) {
      // Show spinner a bit before redirect for visual feedback
      setTimeout(() => {
        setLoading(false);
        // Check if there's a redirect parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirect') || '/';
        router.replace(redirectTo);
      }, 600);
    } else {
      setLoading(false);
      setError(res.message ?? "Sign in failed.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-4 lg:px-8">
        <div className="w-full max-w-md">
          {/* Customer 360 Logo */}
          <div className="mb-8 text-center">
            {!imageError ? (
              <Image 
                src="/Customer360-logo.png" 
                alt="Customer 360" 
                width={200}
                height={40}
                className="h-16 w-auto mx-auto mb-4"
                priority
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMBAgQF/8QAJhAAAgEEAQMEAwEAAAAAAAAAAQIAAxEhBBIxQVFhcYGRobHB0f/EABYBAQEBAAAAAAAAAAAAAAAAAAEAA//EABcRAQEBAQAAAAAAAAAAAAAAAAERADH/2gAMAwEAAhEDEQA/APZPFypcmxy6aKrFWGCCL5InGtXdGNyHOCM1sRCDh0qAUbAjKoqxILa6ggOUNdLKdKa/oI6tEbdCfLCc52gqJEFhYNbJAPOT0/r8SpggwBEaEFjAIE4BEhBYQCBSEIQwSEIQEIQgP//Z"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-xl font-bold text-[#e85b5e]">
                Customer 360°
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded text-sm border border-red-200">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError("");
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={e => validateEmail(e.target.value)}
                disabled={loading}
                autoFocus
                autoComplete="username"
                required
                className={`h-12 text-base border-gray-300 ${emailError ? "border-red-500" : ""}`}
              />
              {emailError && (
                <p className="text-xs text-red-600 mt-1">{emailError}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setError("");
                    if (passwordError) validatePassword(e.target.value);
                  }}
                  onBlur={e => validatePassword(e.target.value)}
                  disabled={loading}
                  autoComplete="current-password"
                  required
                  className={`h-12 text-base border-gray-300 pr-10 ${passwordError ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-600 mt-1">{passwordError}</p>
              )}
              
              <div className="text-right text-sm mt-2">
                <a href="#" className="text-[#e85b5e] hover:text-[#c7494c]">Forgot Your Password?</a>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-12 text-base bg-[#e85b5e] hover:bg-[#c7494c] text-white font-medium"
            >
              {loading ? "Signing in..." : "Log In"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-12 text-base border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => {
                // Focus on email field if empty, otherwise submit form
                if (!email) {
                  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                  emailInput?.focus();
                } else if (!password) {
                  const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
                  passwordInput?.focus();
                } else {
                  // Trigger form submission
                  const form = document.querySelector('form') as HTMLFormElement;
                  form?.requestSubmit();
                }
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Log In with Email
            </Button>

          </form>
          
          <div className="mt-8 text-center text-xs text-gray-500">
            © 2025 Customer 360, Inc. All rights reserved. | Privacy
          </div>
        </div>
      </div>

      {/* Right Panel - Marketing Content */}
      <div className="hidden lg:flex flex-1 bg-[#e85b5e] text-white p-12 items-start justify-start relative overflow-hidden rounded-l-3xl">
        {/* Elegant geometric background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-red-300 rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white rotate-45 animate-float-gentle"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        <div className="max-w-xl z-20 space-y-8 mr-auto">
          <div className="transform transition-all duration-1000 ease-out opacity-0 translate-y-8 animate-fade-in-sequence">
            <h1 className="text-5xl font-bold mb-3 leading-tight bg-gradient-to-br from-red-900 to-red-950 bg-clip-text text-transparent">
              Your Growth Engine
            </h1>
            <div className="mb-6">
              <span className="text-sm font-medium text-orange-200 bg-orange-100/10 px-3 py-1 rounded-full border border-orange-200/20">
                Acquire Customers in an AI enabled - Sales Engagement Platform
              </span>
            </div>
          </div>
          
          <div className="transform transition-all duration-1000 ease-out opacity-0 translate-y-8 animate-fade-in-sequence-delay-1">
            <p className="text-xl text-red-100 leading-relaxed">
              Centralize and unify customer data from multiple sources. Customer 360 
              enables comprehensive customer profiling, behavioral analysis, and 
              personalized engagement across all channels.
            </p>
          </div>

          <div className="space-y-5">
            <div className="transform transition-all duration-700 ease-out opacity-0 translate-x-[-30px] animate-slide-in-sequence group">
              <div className="flex items-center space-x-4 p-5 rounded-xl backdrop-blur-sm bg-gray-50/70 border border-gray-100/30 hover:bg-gray-50/80 hover:border-gray-100/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">360° Customer View</h3>
                  <p className="text-gray-500 text-sm">Complete customer journey mapping</p>
                </div>
              </div>
            </div>

            <div className="transform transition-all duration-700 ease-out opacity-0 translate-x-[-30px] animate-slide-in-sequence-delay-1 group">
              <div className="flex items-center space-x-4 p-5 rounded-xl backdrop-blur-sm bg-gray-50/70 border border-gray-100/30 hover:bg-gray-50/80 hover:border-gray-100/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Advanced Segmentation</h3>
                  <p className="text-gray-500 text-sm">Automated customer categorization</p>
                </div>
              </div>
            </div>

            <div className="transform transition-all duration-700 ease-out opacity-0 translate-x-[-30px] animate-slide-in-sequence-delay-2 group">
              <div className="flex items-center space-x-4 p-5 rounded-xl backdrop-blur-sm bg-gray-50/70 border border-gray-100/30 hover:bg-gray-50/80 hover:border-gray-100/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Real-time Analytics</h3>
                  <p className="text-gray-500 text-sm">Live customer behavior insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Customer 360 Visualization */}
        <div className="absolute bottom-8 right-4 transform transition-all duration-1000 ease-out opacity-0 scale-90 animate-dashboard-enter z-30">
          <div className="relative w-96 h-96">
            {/* Central Analytics Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/85 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/60 backdrop-blur-2xl relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div className="absolute top-8 left-8 w-16 h-16 border border-blue-400 rounded-full animate-pulse-slow"></div>
                  <div className="absolute bottom-12 right-12 w-12 h-12 border border-purple-400 rounded-full animate-pulse-slow animation-delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-indigo-300 rounded-full animate-pulse-slow animation-delay-2000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-10 h-full flex flex-col">
                  {/* Header Section */}
                  <div className="text-center h-full flex flex-col items-center justify-center">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        <span className="text-white text-3xl relative z-10">📊</span>
                      </div>
                      {/* Pulse ring around logo */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 border-2 border-red-400/30 rounded-3xl animate-pulse-ring"></div>
                      </div>
                    </div>
                    <h2 className="text-slate-800 font-bold text-2xl mb-2">Customer 360</h2>
                    <p className="text-[#e85b5e] text-sm font-medium">Unified Analytics Platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <div className="absolute top-8 left-4 bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-3 rounded-2xl shadow-[0_12px_30px_rgba(232,91,94,0.4)] animate-orbit-float-1 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-sm">🎯</span>
                </div>
                <div>
                  <div className="text-sm font-bold">Journey</div>
                  <div className="text-xs opacity-90">Mapping</div>
                </div>
              </div>
            </div>

            <div className="absolute top-16 right-4 bg-gradient-to-br from-red-600 to-red-700 text-white px-4 py-3 rounded-2xl shadow-[0_12px_30px_rgba(232,91,94,0.4)] animate-orbit-float-2 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-sm">⚡</span>
                </div>
                <div>
                  <div className="text-sm font-bold">Real-time</div>
                  <div className="text-xs opacity-90">Analytics</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 bg-gradient-to-br from-red-700 to-red-800 text-white px-4 py-3 rounded-2xl shadow-[0_12px_30px_rgba(232,91,94,0.4)] animate-orbit-float-3 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-sm">📈</span>
                </div>
                <div>
                  <div className="text-sm font-bold">Insights</div>
                  <div className="text-xs opacity-90">Engine</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 right-6 bg-gradient-to-br from-red-800 to-red-900 text-white px-4 py-3 rounded-2xl shadow-[0_12px_30px_rgba(232,91,94,0.4)] animate-orbit-float-4 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-sm">🔍</span>
                </div>
                <div>
                  <div className="text-sm font-bold">Search</div>
                  <div className="text-xs opacity-90">& Filter</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CSS animations */}
        <style jsx>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes spin-slow-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }

          @keyframes float-gentle {
            0%, 100% { transform: translateY(0px) rotate(45deg); }
            50% { transform: translateY(-10px) rotate(45deg); }
          }

          @keyframes float-particles {
            0%, 100% { transform: translate(0, 0); opacity: 0.3; }
            25% { transform: translate(10px, -10px); opacity: 0.7; }
            50% { transform: translate(-5px, -20px); opacity: 0.4; }
            75% { transform: translate(-10px, -5px); opacity: 0.6; }
          }

          @keyframes fade-in-sequence {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes slide-in-sequence {
            0% { opacity: 0; transform: translateX(-30px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes dashboard-enter {
            0% { opacity: 0; transform: scale(0.8) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }

          @keyframes metric-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }

          @keyframes bar-growth {
            0% { height: 0%; }
            100% { height: var(--final-height); }
          }

          @keyframes progress-fill {
            0% { width: 0%; }
            100% { width: 75%; }
          }

          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }

          .animate-spin-slow-reverse {
            animation: spin-slow-reverse 25s linear infinite;
          }

          .animate-float-gentle {
            animation: float-gentle 4s ease-in-out infinite;
          }

          .animate-fade-in-sequence {
            animation: fade-in-sequence 1s ease-out forwards;
          }

          .animate-fade-in-sequence-delay-1 {
            animation: fade-in-sequence 1s ease-out 0.3s forwards;
          }

          .animate-slide-in-sequence {
            animation: slide-in-sequence 0.8s ease-out 0.6s forwards;
          }

          .animate-slide-in-sequence-delay-1 {
            animation: slide-in-sequence 0.8s ease-out 0.9s forwards;
          }

          .animate-slide-in-sequence-delay-2 {
            animation: slide-in-sequence 0.8s ease-out 1.2s forwards;
          }

          .animate-dashboard-enter {
            animation: dashboard-enter 1s ease-out 1.5s forwards;
          }

          .animate-metric-float-1 {
            animation: metric-float 3s ease-in-out infinite;
          }

          .animate-metric-float-2 {
            animation: metric-float 3s ease-in-out 0.5s infinite;
          }

          .animate-metric-float-3 {
            animation: metric-float 3s ease-in-out 1s infinite;
          }

          .animate-metric-float-4 {
            animation: metric-float 3s ease-in-out 1.5s infinite;
          }

          @keyframes count-up {
            0% { 
              opacity: 0; 
              transform: translateY(15px) scale(0.9); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }

          @keyframes pulse-slow {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(1); 
            }
            50% { 
              opacity: 0.6; 
              transform: scale(1.05); 
            }
          }

          @keyframes pulse-ring {
            0%, 100% { 
              opacity: 0.4; 
              transform: scale(1); 
            }
            50% { 
              opacity: 0.8; 
              transform: scale(1.1); 
            }
          }

          @keyframes bar-rise {
            0% { 
              height: 20%; 
            }
            100% { 
              height: var(--target-height); 
            }
          }

          @keyframes orbit-float {
            0%, 100% { 
              transform: translateY(0px) rotateZ(0deg); 
            }
            33% { 
              transform: translateY(-8px) rotateZ(1deg); 
            }
            66% { 
              transform: translateY(-4px) rotateZ(-1deg); 
            }
          }

          .animate-count-up {
            animation: count-up 1s ease-out 2.5s forwards;
            opacity: 0;
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }

          .animate-pulse-ring {
            animation: pulse-ring 2s ease-in-out infinite;
          }

          .animate-bar-rise-1 {
            animation: bar-rise 1.2s ease-out 3s forwards;
            --target-height: 60%;
            height: 20%;
          }

          .animate-bar-rise-2 {
            animation: bar-rise 1.2s ease-out 3.2s forwards;
            --target-height: 85%;
            height: 20%;
          }

          .animate-bar-rise-3 {
            animation: bar-rise 1.2s ease-out 3.4s forwards;
            --target-height: 45%;
            height: 20%;
          }

          .animate-bar-rise-4 {
            animation: bar-rise 1.2s ease-out 3.6s forwards;
            --target-height: 75%;
            height: 20%;
          }

          .animate-bar-rise-5 {
            animation: bar-rise 1.2s ease-out 3.8s forwards;
            --target-height: 90%;
            height: 20%;
          }

          .animate-bar-rise-6 {
            animation: bar-rise 1.2s ease-out 4s forwards;
            --target-height: 65%;
            height: 20%;
          }

          .animate-orbit-float-1 {
            animation: orbit-float 5s ease-in-out infinite;
          }

          .animate-orbit-float-2 {
            animation: orbit-float 5s ease-in-out 1s infinite;
          }

          .animate-orbit-float-3 {
            animation: orbit-float 5s ease-in-out 2s infinite;
          }

          .animate-orbit-float-4 {
            animation: orbit-float 5s ease-in-out 3s infinite;
          }

          @keyframes gradient-flow {
            0%, 100% { 
              background-position: 0% 50%; 
            }
            50% { 
              background-position: 100% 50%; 
            }
          }

          .animate-gradient-flow {
            background-size: 200% 200%;
            animation: gradient-flow 6s ease-in-out infinite;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            animation: float-particles 6s ease-in-out infinite;
          }

          .particle-1 {
            top: 20%;
            left: 15%;
            animation-delay: 0s;
          }

          .particle-2 {
            top: 60%;
            left: 25%;
            animation-delay: 1s;
          }

          .particle-3 {
            top: 30%;
            left: 80%;
            animation-delay: 2s;
          }

          .particle-4 {
            top: 80%;
            left: 70%;
            animation-delay: 3s;
          }

          .particle-5 {
            top: 10%;
            left: 60%;
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </div>
  );
}
