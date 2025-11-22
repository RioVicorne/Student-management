"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeMenu?: string;
}

export default function Sidebar({ activeMenu }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Students", icon: Users, path: "/students" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Grades", icon: GraduationCap, path: "/grades" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  // Determine active menu based on pathname or prop
  const getActiveMenu = () => {
    if (activeMenu) return activeMenu;
    
    // Check pathname to determine active menu
    if (pathname === "/dashboard" || pathname === "/") return "Dashboard";
    if (pathname === "/students") return "Students";
    if (pathname === "/courses") return "Courses";
    if (pathname === "/grades") return "Grades";
    if (pathname === "/settings") return "Settings";
    
    return "Dashboard"; // Default
  };

  const active = getActiveMenu();

  const handleNavigation = (path: string, name: string) => {
    // If already on the target path, just scroll to top
    if (path === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    // Navigate to the path
    router.push(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-strong shadow-2xl z-40">
      <div className="flex flex-col h-full">
        {/* Logo - Clickable */}
        <Link 
          href="/dashboard"
          className="flex items-center justify-center h-20 border-b border-slate-300/30 hover:bg-white/20 transition-colors cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors drop-shadow-sm">
              EduManage
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path, item.name)}
                className={`group relative w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500/20 text-slate-900 shadow-lg shadow-blue-600/30 backdrop-blur-sm font-semibold border border-blue-400/30"
                    : "text-slate-700 hover:bg-white/20 hover:text-slate-900 backdrop-blur-sm font-medium"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive 
                        ? "scale-110 text-blue-600" 
                        : "group-hover:scale-110 text-slate-600"
                    }`} 
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                {/* Active indicator arrow */}
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                )}
                {/* Hover arrow indicator */}
                {!isActive && (
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 text-slate-600 transition-opacity duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-300/30">
          <div className="text-xs text-slate-600 text-center">
            © 2025 EduManage
          </div>
          <div className="text-xs text-slate-500 text-center mt-1">
            Version 1.0.0
          </div>
        </div>
      </div>
    </aside>
  );
}

