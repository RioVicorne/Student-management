'use client';

import React, { useState, useRef } from 'react';
import { Student } from '@/types/student';
import { useStudent } from '@/contexts/StudentContext';
import StudentForm from './StudentForm';
import StudentDetail from './StudentDetail';
import Dashboard from './Dashboard';
import { exportToJSON, exportToCSV, downloadFile, importFromJSON, importFromCSV } from '@/utils/exportImport';

export default function StudentList() {
  const { students, deleteStudent, importStudents } = useStudent();
  const [editingStudent, setEditingStudent] = useState<Student | undefined>();
  const [viewingStudent, setViewingStudent] = useState<Student | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'major' | 'studentId'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting without mutating original array
  const displayedStudents = [...filteredStudents].sort((a, b) => {
    let A = a[sortBy] || '';
    let B = b[sortBy] || '';
    if (typeof A === 'string') A = A.toLowerCase();
    if (typeof B === 'string') B = B.toLowerCase();

    if (A < B) return sortDir === 'asc' ? -1 : 1;
    if (A > B) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      deleteStudent(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStudent(undefined);
  };

  const handleAddNew = () => {
    setEditingStudent(undefined);
    setShowForm(true);
  };

  const handleViewDetail = (student: Student) => {
    setViewingStudent(student);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setViewingStudent(undefined);
  };

  const handleExportJSON = () => {
    const json = exportToJSON(students);
    downloadFile(json, `students_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
  };

  const handleExportCSV = () => {
    const csv = exportToCSV(students);
    downloadFile(csv, `students_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let importedStudents: Student[];

        if (file.name.endsWith('.json')) {
          importedStudents = importFromJSON(content);
        } else if (file.name.endsWith('.csv')) {
          importedStudents = importFromCSV(content);
        } else {
          alert('Vui lòng chọn file JSON hoặc CSV');
          return;
        }

        if (
          confirm(
            `Bạn có muốn thêm ${importedStudents.length} sinh viên từ file này vào danh sách hiện tại? (Chọn OK để thêm, Cancel để thay thế)`
          )
        ) {
          // Add to existing
          const newStudents = [...students, ...importedStudents];
          importStudents(newStudents);
        } else {
          // Replace existing
          importStudents(importedStudents);
        }
        alert(`Đã import thành công ${importedStudents.length} sinh viên!`);
      } catch (error) {
        alert('Lỗi khi import file: ' + (error as Error).message);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12 relative z-10">
      {/* Dashboard */}
      <Dashboard />

      {/* Header Section */}
      <div className="mb-8 float-animation">
        <div className="glass-strong rounded-3xl p-8 mb-6 shine">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                Quản lý sinh viên
              </h1>
              <p className="text-white/80 text-lg">
                Hệ thống quản lý thông tin sinh viên hiện đại
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleImport}
                className="glass px-4 py-3 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Import
              </button>
              <div className="glass px-4 py-3 rounded-xl backdrop-blur-md border border-white/30 flex items-center gap-2">
                <button
                  onClick={handleExportJSON}
                  className="text-white font-semibold hover:text-white/80 transition-colors flex items-center gap-1"
                  title="Export JSON"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  JSON
                </button>
                <span className="text-white/50">|</span>
                <button
                  onClick={handleExportCSV}
                  className="text-white font-semibold hover:text-white/80 transition-colors flex items-center gap-1"
                  title="Export CSV"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  CSV
                </button>
              </div>
              <button
                onClick={handleAddNew}
                className="glass-strong px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl backdrop-blur-md border border-white/40 hover:border-white/60 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Thêm sinh viên mới
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-6 h-6 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã sinh viên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
            />
          </div>
          {/* Sort controls */}
          <div className="mt-3 flex gap-3 items-center">
            <label className="text-white/80 text-sm">Sắp xếp:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            >
              <option value="name">Tên</option>
              <option value="major">Chuyên ngành</option>
              <option value="studentId">Mã SV</option>
            </select>
            <button
              onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              className="px-3 py-2 glass rounded-md text-white"
              title="Đổi chiều sắp xếp"
            >
              {sortDir === 'asc' ? 'Tăng dần' : 'Giảm dần'}
            </button>
          </div>
        </div>
      </div>

      {/* Students List */}
      {displayedStudents.length === 0 ? (
        <div className="glass-strong rounded-3xl p-12 text-center">
          <div className="inline-block p-6 bg-white/10 rounded-full mb-4">
            <svg
              className="w-16 h-16 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-white text-xl font-medium">
            {students.length === 0
              ? 'Chưa có sinh viên nào. Hãy thêm sinh viên mới!'
              : 'Không tìm thấy sinh viên nào phù hợp.'}
          </p>
        </div>
      ) : (
        <div className="glass-strong rounded-3xl p-6 overflow-hidden">
          {/* Mobile card view */}
          <div className="mobile-card-list mb-4">
            {displayedStudents.map((student) => (
              <div key={student.id} className="mobile-card glass">
                <div className="meta">
                  <div>
                    <div className="text-white font-semibold">{student.name}</div>
                    <div className="text-white/70 text-sm">{student.studentId}</div>
                  </div>
                  <div className="text-white/80 text-sm">{student.major}</div>
                </div>
                <div className="text-white/80 text-sm mb-2">{student.email}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetail(student)}
                    className="px-3 py-2 bg-blue-500/80 text-white rounded-lg"
                  >
                    Xem
                  </button>
                  <button
                    onClick={() => handleEdit(student)}
                    className="px-3 py-2 bg-yellow-500/80 text-white rounded-lg"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="px-3 py-2 bg-red-500/80 text-white rounded-lg"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto responsive-table">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="px-4 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                    Mã SV
                  </th>
                  <th className="px-4 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                    Họ và tên
                  </th>
                  <th className="px-4 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th className="px-4 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                    Chuyên ngành
                  </th>
                  <th className="px-4 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                    Ngày sinh
                  </th>
                  <th className="px-4 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-4 py-4 text-white/90 font-medium">
                      {student.studentId}
                    </td>
                    <td className="px-4 py-4 text-white font-semibold">
                      {student.name}
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {student.email}
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {student.phone}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
                        {student.major}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-white/80">
                      {new Date(student.dateOfBirth).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleViewDetail(student)}
                          className="px-3 py-2 bg-blue-500/80 backdrop-blur-md text-white rounded-lg hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg border border-blue-400/50 transition-all duration-300 font-medium"
                          title="Xem chi tiết"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(student)}
                          className="px-4 py-2 bg-yellow-500/80 backdrop-blur-md text-white rounded-lg hover:bg-yellow-500 hover:scale-105 active:scale-95 shadow-lg border border-yellow-400/50 transition-all duration-300 font-medium"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="px-4 py-2 bg-red-500/80 backdrop-blur-md text-white rounded-lg hover:bg-red-500 hover:scale-105 active:scale-95 shadow-lg border border-red-400/50 transition-all duration-300 font-medium"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <StudentForm student={editingStudent} onClose={handleCloseForm} />
      )}

      {showDetail && viewingStudent && (
        <StudentDetail student={viewingStudent} onClose={handleCloseDetail} />
      )}

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.csv"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
