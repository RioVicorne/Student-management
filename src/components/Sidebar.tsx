'use client';

import { LayoutDashboard, Users, BookOpen, GraduationCap, Settings } from 'lucide-react';

interface SidebarProps {
  activeMenu?: string;
}

export default function Sidebar({ activeMenu = 'Students' }: SidebarProps) {
  // Use activeMenu prop directly instead of state to ensure correct active state
  const active = activeMenu;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'Grades', icon: GraduationCap, path: '/grades' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">EduManage</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            
            return (
              <button
                key={item.name}
                onClick={() => {/* Handle navigation if needed */}}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="text-xs text-slate-400 text-center">
            © 2025 EduManage
          </div>
        </div>
      </div>
    </aside>
  );
}

