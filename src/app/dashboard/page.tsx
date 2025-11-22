import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import StudentManagementTable from '@/components/StudentManagementTable';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar activeMenu="Students" />

      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="ml-64 mt-20 p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Student Management</h1>
            <p className="text-slate-600 mt-1">Manage and monitor all student information</p>
          </div>

          {/* Student Management Table */}
          <StudentManagementTable />
        </div>
      </main>
    </div>
  );
}

