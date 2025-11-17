'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Student } from '@/types/student';
import { useStudent } from '@/contexts/StudentContext';
import StudentForm from './StudentForm';
import StudentDetail from './StudentDetail';
import Header from './Header';
import StatsCards from './StatsCards';
import SearchBar from './SearchBar';
import SkeletonTable from './SkeletonTable';
import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';
import BulkActionBar from './BulkActionBar';
import ViewModeSwitcher, { ViewMode } from './ViewModeSwitcher';
import GridView from './GridView';
import ListView from './ListView';
import AdvancedFilter, { FilterOptions } from './AdvancedFilter';
import { exportToJSON, exportToCSV, downloadFile, importFromJSON, importFromCSV } from '@/utils/exportImport';

export default function StudentList() {
  const { students, isLoading, deleteStudent, importStudents } = useStudent();
  const [editingStudent, setEditingStudent] = useState<Student | undefined>();
  const [viewingStudent, setViewingStudent] = useState<Student | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'major' | 'studentId'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    majors: [],
    statuses: [],
    academicYears: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting without mutating original array
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let A = a[sortBy] || '';
    let B = b[sortBy] || '';
    if (typeof A === 'string') A = A.toLowerCase();
    if (typeof B === 'string') B = B.toLowerCase();

    if (A < B) return sortDir === 'asc' ? -1 : 1;
    if (A > B) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Apply pagination
  const totalPages = Math.ceil(sortedStudents.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedStudents = sortedStudents.slice(startIndex, endIndex);

  // Reset to page 1 when search or sort changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, sortDir]);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const student = students.find(s => s.id === id);
    toast.custom((t) => (
      <div className="glass-strong rounded-xl p-4 border border-red-400/50">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">Xác nhận xóa</h3>
            <p className="text-white/80 text-sm mb-3">
              Bạn có chắc chắn muốn xóa sinh viên <strong>{student?.name}</strong>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  deleteStudent(id);
                  toast.dismiss(t);
                  toast.success('Đã xóa sinh viên thành công!');
                }}
                className="px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-all"
              >
                Xóa
              </button>
              <button
                onClick={() => toast.dismiss(t)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    ), { duration: Infinity });
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

  // Bulk actions handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === displayedStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayedStudents.map(s => s.id));
    }
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => deleteStudent(id));
    setSelectedIds([]);
  };

  const handleBulkExport = () => {
    const selectedStudents = students.filter(s => selectedIds.includes(s.id));
    const json = exportToJSON(selectedStudents);
    downloadFile(json, `selected_students_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
    toast.success(`Đã export ${selectedStudents.length} sinh viên đã chọn!`);
  };

  const handleExportJSON = () => {
    try {
      const json = exportToJSON(students);
      downloadFile(json, `students_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
      toast.success('Export JSON thành công!', {
        description: `Đã export ${students.length} sinh viên sang file JSON`
      });
    } catch (error) {
      toast.error('Lỗi khi export JSON', {
        description: (error as Error).message
      });
    }
  };

  const handleExportCSV = () => {
    try {
      const csv = exportToCSV(students);
      downloadFile(csv, `students_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
      toast.success('Export CSV thành công!', {
        description: `Đã export ${students.length} sinh viên sang file CSV`
      });
    } catch (error) {
      toast.error('Lỗi khi export CSV', {
        description: (error as Error).message
      });
    }
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
          toast.error('Vui lòng chọn file JSON hoặc CSV', {
            description: 'Chỉ hỗ trợ định dạng .json và .csv'
          });
          return;
        }

        // Show confirmation toast
        toast.custom((t) => (
          <div className="glass-strong rounded-xl p-4 border border-blue-400/50">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Import {importedStudents.length} sinh viên</h3>
                <p className="text-white/80 text-sm mb-3">
                  Bạn muốn thêm vào danh sách hiện tại hay thay thế toàn bộ?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newStudents = [...students, ...importedStudents];
                      importStudents(newStudents);
                      toast.dismiss(t);
                      toast.success(`Đã thêm ${importedStudents.length} sinh viên!`, {
                        description: 'Sinh viên mới đã được thêm vào danh sách'
                      });
                    }}
                    className="px-3 py-1.5 bg-green-500/80 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    Thêm vào
                  </button>
                  <button
                    onClick={() => {
                      importStudents(importedStudents);
                      toast.dismiss(t);
                      toast.success(`Đã thay thế bằng ${importedStudents.length} sinh viên!`, {
                        description: 'Danh sách cũ đã được thay thế'
                      });
                    }}
                    className="px-3 py-1.5 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    Thay thế
                  </button>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ), { duration: Infinity });
      } catch (error) {
        toast.error('Lỗi khi import file', {
          description: (error as Error).message
        });
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  // Calculate stats
  const stats = {
    total: students.length,
    byMajor: students.reduce((acc, student) => {
      acc[student.major] = (acc[student.major] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    majors: Object.keys(
      students.reduce((acc, student) => {
        acc[student.major] = true;
        return acc;
      }, {} as Record<string, boolean>)
    ).length,
  };

  const majorEntries = Object.entries(stats.byMajor).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <Header
        onAddNew={handleAddNew}
        onImport={handleImport}
        onExportJSON={handleExportJSON}
        onExportCSV={handleExportCSV}
      />

      {/* Stats Cards */}
      <StatsCards
        total={stats.total}
        majors={stats.majors}
        topMajor={majorEntries[0]?.[0]}
        topMajorCount={majorEntries[0]?.[1]}
      />

      {/* Search & Filter */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortDir={sortDir}
        onSortDirChange={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
      />

      {/* View Mode & Advanced Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between gap-3 mb-4"
      >
        <ViewModeSwitcher mode={viewMode} onChange={setViewMode} />
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvancedFilter(true)}
            className="px-3 py-2 glass rounded-lg text-white text-xs font-medium flex items-center gap-2 hover:bg-white/10 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="hidden md:inline">Bộ lọc</span>
          </button>
          
          {displayedStudents.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="px-3 py-2 glass rounded-lg text-white text-xs font-medium flex items-center gap-2 hover:bg-white/10 active:scale-95 transition-all"
            >
              <div className="w-4 h-4 rounded border-2 border-white/40 flex items-center justify-center">
                {selectedIds.length === displayedStudents.length && (
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="hidden md:inline">Chọn tất cả</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Students List */}
      {isLoading ? (
        <>
          {/* Mobile skeleton */}
          <div className="mobile-card-list">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          {/* Desktop skeleton */}
          <div className="responsive-table">
            <SkeletonTable rows={5} columns={7} />
          </div>
        </>
      ) : displayedStudents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-3xl p-12 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block p-6 bg-white/10 rounded-full mb-4"
          >
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
          </motion.div>
          <p className="text-white text-xl font-medium">
            {students.length === 0
              ? 'Chưa có sinh viên nào. Hãy thêm sinh viên mới!'
              : 'Không tìm thấy sinh viên nào phù hợp.'}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-xl p-4 overflow-hidden"
        >
          {/* Render based on view mode */}
          {viewMode === 'grid' ? (
            <GridView
              students={displayedStudents}
              onView={handleViewDetail}
              onEdit={handleEdit}
              onDelete={handleDelete}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
            />
          ) : viewMode === 'list' ? (
            <ListView
              students={displayedStudents}
              onView={handleViewDetail}
              onEdit={handleEdit}
              onDelete={handleDelete}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
            />
          ) : (
            <>
              {/* Mobile card view */}
              <div className="mobile-card-list mb-4">
            <AnimatePresence mode="popLayout">
              {displayedStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                  className="mobile-card glass"
                >
                  <div className="meta">
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm truncate">{student.name}</div>
                      <div className="text-white/60 text-xs font-mono">{student.studentId}</div>
                    </div>
                    <span className="text-white/80 text-[10px] px-2 py-0.5 bg-white/10 rounded whitespace-nowrap flex-shrink-0">
                      {student.major.length > 15 ? student.major.substring(0, 12) + '...' : student.major}
                    </span>
                  </div>
                  <div className="text-white/60 text-xs mb-2 truncate">{student.email}</div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleViewDetail(student)}
                      className="flex-1 px-2 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-xs font-medium flex items-center justify-center gap-1 active:scale-95 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Xem
                    </button>
                    <button
                      onClick={() => handleEdit(student)}
                      className="flex-1 px-2 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-xs font-medium flex items-center justify-center gap-1 active:scale-95 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="flex-1 px-2 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-medium flex items-center justify-center gap-1 active:scale-95 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Xóa
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Desktop Table view */}
          <div className="overflow-x-auto responsive-table">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-3 py-3 w-10">
                    <button
                      onClick={handleSelectAll}
                      className="w-4 h-4 rounded border-2 border-white/40 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
                    >
                      {selectedIds.length === displayedStudents.length && displayedStudents.length > 0 && (
                        <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </th>
                  <th className="px-3 py-3 text-left text-white/70 font-medium text-xs uppercase tracking-wide">
                    Mã SV
                  </th>
                  <th className="px-3 py-3 text-left text-white/70 font-medium text-xs uppercase tracking-wide">
                    Họ và tên
                  </th>
                  <th className="px-3 py-3 text-left text-white/70 font-medium text-xs uppercase tracking-wide">
                    Email
                  </th>
                  <th className="px-3 py-3 text-left text-white/70 font-medium text-xs uppercase tracking-wide">
                    Chuyên ngành
                  </th>
                  <th className="px-3 py-3 text-center text-white/70 font-medium text-xs uppercase tracking-wide">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {displayedStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100, height: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      layout
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                      className={`border-b border-white/5 transition-all duration-200 ${
                        selectedIds.includes(student.id) ? 'bg-blue-500/10' : ''
                      }`}
                    >
                      <td className="px-3 py-3">
                        <button
                          onClick={() => handleToggleSelect(student.id)}
                          className="w-4 h-4 rounded border-2 border-white/40 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
                        >
                          {selectedIds.includes(student.id) && (
                            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </td>
                      <td className="px-3 py-3 text-white/70 text-sm font-mono">
                        {student.studentId}
                      </td>
                      <td className="px-3 py-3 text-white font-medium">
                        {student.name}
                      </td>
                      <td className="px-3 py-3 text-white/70 text-sm">
                        {student.email}
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded text-white/90 text-xs font-medium border border-white/10">
                          {student.major}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1 justify-center">
                          <button
                            onClick={() => handleViewDetail(student)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg active:scale-95 transition-all"
                            title="Xem"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEdit(student)}
                            className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg active:scale-95 transition-all"
                            title="Sửa"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg active:scale-95 transition-all"
                            title="Xóa"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
            </>
          )}
        </motion.div>
      )}

      {/* Pagination */}
      {!isLoading && sortedStudents.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          totalItems={sortedStudents.length}
        />
      )}

      <AnimatePresence>
        {showForm && (
          <StudentForm student={editingStudent} onClose={handleCloseForm} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetail && viewingStudent && (
          <StudentDetail student={viewingStudent} onClose={handleCloseDetail} />
        )}
      </AnimatePresence>

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
      />

      {/* Advanced Filter Modal */}
      <AdvancedFilter
        isOpen={showAdvancedFilter}
        onClose={() => setShowAdvancedFilter(false)}
        filters={filters}
        onFilterChange={setFilters}
        availableMajors={Array.from(new Set(students.map(s => s.major)))}
        availableYears={[]}
      />

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
