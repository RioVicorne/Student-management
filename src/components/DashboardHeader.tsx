"use client";

import { LogOut, Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="fixed top-0 right-0 left-64 h-20 glass-strong shadow-md z-30 border-b border-white/30">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-12 pr-4 py-2.5 bg-white/40 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Notifications */}
          <button className="relative p-2 text-slate-700 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-slate-300">
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-900">
                Admin User
              </div>
              <div className="text-xs text-slate-600">Administrator</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg">
              A
            </div>
          </div>

          {/* Logout Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md backdrop-blur-sm border border-red-400/30">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
