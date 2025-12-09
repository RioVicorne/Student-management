"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StudentManagementTable from "@/components/StudentManagementTable";

// Prevent static generation/prerendering
export const dynamic = 'force-dynamic';

function StudentsPageContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  
  // Get initial values from URL params
  const initialAction = searchParams.get('action');
  const initialStatus = searchParams.get('status');

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 15%, #fce7f3 30%, #e0e7ff 45%, #ddd6fe 60%, #fce7f3 75%, #e0e7ff 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 20s ease infinite',
      }}
    >
      {/* Animated gradient orbs */}
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          animation: 'rotate 40s linear infinite',
          filter: 'blur(60px)',
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <div
        className="absolute -top-[30%] -right-[30%] w-[150%] h-[150%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(236, 72, 153, 0.12) 0%, transparent 50%)',
          animation: 'rotate 50s linear infinite reverse',
          filter: 'blur(60px)',
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      {/* Sidebar */}
      <Sidebar activeMenu="Students" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Header */}
      <div className="relative z-30">
        <DashboardHeader onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main Content */}
      <main className={`lg:ml-64 mt-16 lg:mt-20 p-4 lg:p-8 relative z-10 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-64 lg:translate-x-0' : 'translate-x-0'
      }`}>
        <div className="max-w-[1600px] mx-auto">
          {/* Page Title */}
          <div className="mb-4 lg:mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 drop-shadow-lg">Student Management</h1>
            <p className="text-sm lg:text-base text-slate-700 mt-1 drop-shadow">Manage and monitor all student information</p>
          </div>

          {/* Student Management Table */}
          <StudentManagementTable 
            initialAction={initialAction}
            initialStatus={initialStatus as "Active" | "Graduated" | "Suspended" | null}
          />
        </div>
      </main>
    </div>
  );
}

export default function StudentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    }>
      <StudentsPageContent />
    </Suspense>
  );
}

