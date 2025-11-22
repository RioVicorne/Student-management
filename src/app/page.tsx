import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function Home() {
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
        <Sidebar activeMenu="Dashboard" />
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
            <h1 className="text-3xl font-bold text-slate-900 drop-shadow-lg">Dashboard</h1>
            <p className="text-slate-700 mt-1 drop-shadow">Overview of your student management system</p>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Stats Cards */}
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center border border-blue-200 shadow-sm flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-slate-900">0</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center border border-green-200 shadow-sm flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">Active Students</p>
                  <p className="text-3xl font-bold text-slate-900">0</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center border border-purple-200 shadow-sm flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-600"
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
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">Courses</p>
                  <p className="text-3xl font-bold text-slate-900">0</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center border border-orange-200 shadow-sm flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">Graduated</p>
                  <p className="text-3xl font-bold text-slate-900">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 drop-shadow">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/students"
                className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-white/20 hover:border-blue-500 transition-all duration-200 group backdrop-blur-sm glass"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-blue-600">
                    Manage Students
                  </p>
                  <p className="text-sm text-slate-600">View and edit student records</p>
                </div>
              </a>

              <a
                href="/courses"
                className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-white/20 hover:border-blue-500 transition-all duration-200 group backdrop-blur-sm glass"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                  <svg
                    className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors"
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
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-blue-600">
                    Manage Courses
                  </p>
                  <p className="text-sm text-slate-600">View and edit courses</p>
                </div>
              </a>

              <a
                href="/grades"
                className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-white/20 hover:border-blue-500 transition-all duration-200 group backdrop-blur-sm glass"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <svg
                    className="w-5 h-5 text-green-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-blue-600">
                    Manage Grades
                  </p>
                  <p className="text-sm text-slate-600">View and edit student grades</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
