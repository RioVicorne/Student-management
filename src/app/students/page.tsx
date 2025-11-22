import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StudentManagementTable from "@/components/StudentManagementTable";

export default function StudentsPage() {
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
      <div className="relative z-10">
        <Sidebar activeMenu="Students" />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <DashboardHeader />
      </div>

      {/* Main Content */}
      <main className="ml-64 mt-20 p-8 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 drop-shadow-lg">Student Management</h1>
            <p className="text-slate-700 mt-1 drop-shadow">Manage and monitor all student information</p>
          </div>

          {/* Student Management Table */}
          <StudentManagementTable />
        </div>
      </main>
    </div>
  );
}

