"use client";

import { LogOut, Bell, Search, Menu } from "lucide-react";
import { useState } from "react";

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
}

export default function DashboardHeader({
  onMenuToggle,
}: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 lg:h-20 glass-strong shadow-md z-30 border-b border-white/30">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-2 lg:gap-0">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={handleMenuToggle}
          className="lg:hidden p-2 bg-white/40 backdrop-blur-sm rounded-lg border border-white/30 text-slate-900 hover:bg-white/60 transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-2.5 bg-white/40 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-500 text-sm lg:text-base"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4 lg:ml-6">
          {/* Notifications */}
          <button className="relative p-2 text-slate-700 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3 lg:pl-4 lg:border-l lg:border-slate-300">
            <div className="text-right hidden lg:block">
              <div className="text-sm font-semibold text-slate-900">
                Admin User
              </div>
              <div className="text-xs text-slate-600">Administrator</div>
            </div>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg text-sm lg:text-base">
              A
            </div>
          </div>

          {/* Logout Button */}
          <button className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md backdrop-blur-sm border border-red-400/30">
            <LogOut className="w-4 h-4 lg:w-4 lg:h-4" />
            <span className="hidden lg:inline text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
