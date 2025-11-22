import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function CoursesPage() {
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
        <Sidebar activeMenu="Courses" />
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
            <h1 className="text-3xl font-bold text-slate-900 drop-shadow-lg">Course Management</h1>
            <p className="text-slate-700 mt-1 drop-shadow">Manage and monitor all course information</p>
          </div>

          {/* Course Management Content */}
          <div className="glass-card rounded-xl p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2 drop-shadow">
                Course Management
              </h2>
              <p className="text-slate-600 mb-6">
                This page is under development. Course management features will be available soon.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

