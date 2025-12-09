"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  UserPlus,
  List,
  CheckCircle,
  GraduationCap as GraduationCapIcon,
  Ban,
} from "lucide-react";

interface SidebarProps {
  activeMenu?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ activeMenu, isOpen: externalIsOpen, onClose }: SidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onClose || setInternalIsOpen;
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", hasSubmenu: false },
    { 
      name: "Students", 
      icon: Users, 
      path: "/students", 
      hasSubmenu: true,
      submenuItems: [
        { name: "All Students", icon: List, path: "/students", query: "" },
        { name: "Add New Student", icon: UserPlus, path: "/students", query: "?action=add" },
        { name: "Active Students", icon: CheckCircle, path: "/students", query: "?status=Active" },
        { name: "Graduated", icon: GraduationCapIcon, path: "/students", query: "?status=Graduated" },
        { name: "Suspended", icon: Ban, path: "/students", query: "?status=Suspended" },
      ]
    },
    { name: "Courses", icon: BookOpen, path: "/courses", hasSubmenu: false },
    { name: "Grades", icon: GraduationCap, path: "/grades", hasSubmenu: false },
    { name: "Settings", icon: Settings, path: "/settings", hasSubmenu: false },
  ];

  // Auto-expand Students menu if on students page
  useEffect(() => {
    if (pathname === "/students") {
      setExpandedMenus(new Set(["Students"]));
    }
  }, [pathname]);

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuName)) {
        newSet.delete(menuName);
      } else {
        newSet.add(menuName);
      }
      return newSet;
    });
  };

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

  const handleNavigation = (path: string, name: string, query?: string) => {
    const fullPath = query ? `${path}${query}` : path;
    
    // If already on the target path, just scroll to top
    if (fullPath === pathname + (typeof window !== 'undefined' ? window.location.search : '')) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (onClose) onClose();
      else setInternalIsOpen(false); // Close mobile menu
      return;
    }
    
    // Navigate to the path
    router.push(fullPath);
    if (onClose) onClose();
    else setInternalIsOpen(false); // Close mobile menu after navigation
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (externalIsOpen === undefined) return; // Only handle if controlled externally
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest("aside") && !target.closest("header")) {
        if (onClose) onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, externalIsOpen, onClose]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => {
            if (onClose) onClose();
            else setInternalIsOpen(false);
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 glass-strong shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
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
            const isExpanded = expandedMenus.has(item.name);
            const hasSubmenu = item.hasSubmenu || false;
            
            return (
              <div key={item.name} className="space-y-1">
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleSubmenu(item.name);
                    } else {
                      handleNavigation(item.path, item.name);
                    }
                  }}
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
                  <div className="flex items-center">
                    {/* Submenu toggle icon */}
                    {hasSubmenu ? (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        } ${
                          isActive ? "text-blue-600" : "text-slate-600"
                        }`} 
                      />
                    ) : (
                      <>
                        {/* Active indicator arrow */}
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-blue-600" />
                        )}
                        {/* Hover arrow indicator */}
                        {!isActive && (
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 text-slate-600 transition-opacity duration-200" />
                        )}
                      </>
                    )}
                  </div>
                </button>
                
                {/* Submenu */}
                {hasSubmenu && item.submenuItems && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 pl-4 border-l-2 border-slate-300/30 space-y-1 mt-1">
                      {item.submenuItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = pathname === subItem.path && 
                          (subItem.query === "" || 
                           (typeof window !== 'undefined' && window.location.search === subItem.query));
                        
                        return (
                          <button
                            key={subItem.name}
                            onClick={() => handleNavigation(subItem.path, subItem.name, subItem.query)}
                            className={`group w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                              isSubActive
                                ? "bg-blue-500/20 text-blue-700 font-semibold border border-blue-400/30"
                                : "text-slate-600 hover:bg-white/20 hover:text-slate-900 font-medium"
                            }`}
                          >
                            <SubIcon 
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isSubActive 
                                  ? "text-blue-600 scale-110" 
                                  : "text-slate-500 group-hover:scale-110"
                              }`} 
                            />
                            <span>{subItem.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
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
    </>
  );
}

