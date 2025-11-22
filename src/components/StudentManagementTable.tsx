'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Plus, FileSpreadsheet, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Mail, Calendar, X, UserPlus, User, Hash, Users, Check, AlertTriangle } from 'lucide-react';

interface Student {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  faculty: string;
  class: string;
  status: 'Active' | 'Graduated' | 'Suspended';
  avatar?: string;
}

const initialMockStudents: Student[] = [
  {
    id: '1',
    studentId: 'SV001',
    fullName: 'Nguyen Van An',
    email: 'nva@university.edu.vn',
    dateOfBirth: '2002-03-15',
    gender: 'Male',
    faculty: 'Information Technology',
    class: 'IT-K15',
    status: 'Active',
  },
  {
    id: '2',
    studentId: 'SV002',
    fullName: 'Tran Thi Binh',
    email: 'ttb@university.edu.vn',
    dateOfBirth: '2002-07-22',
    gender: 'Female',
    faculty: 'Information Technology',
    class: 'IT-K15',
    status: 'Active',
  },
  {
    id: '3',
    studentId: 'SV003',
    fullName: 'Le Minh Chau',
    email: 'lmc@university.edu.vn',
    dateOfBirth: '2001-11-08',
    gender: 'Female',
    faculty: 'Business Administration',
    class: 'BA-K14',
    status: 'Graduated',
  },
  {
    id: '4',
    studentId: 'SV004',
    fullName: 'Pham Duc Duy',
    email: 'pdd@university.edu.vn',
    dateOfBirth: '2002-05-19',
    gender: 'Male',
    faculty: 'Information Technology',
    class: 'IT-K15',
    status: 'Suspended',
  },
  {
    id: '5',
    studentId: 'SV005',
    fullName: 'Hoang Thi Yen',
    email: 'hty@university.edu.vn',
    dateOfBirth: '2002-09-30',
    gender: 'Female',
    faculty: 'Engineering',
    class: 'EN-K15',
    status: 'Active',
  },
  {
    id: '6',
    studentId: 'SV006',
    fullName: 'Vo Thanh Hai',
    email: 'vth@university.edu.vn',
    dateOfBirth: '2002-01-12',
    gender: 'Male',
    faculty: 'Information Technology',
    class: 'IT-K15',
    status: 'Active',
  },
  {
    id: '7',
    studentId: 'SV007',
    fullName: 'Do Khanh Linh',
    email: 'dkl@university.edu.vn',
    dateOfBirth: '2002-04-25',
    gender: 'Female',
    faculty: 'Business Administration',
    class: 'BA-K15',
    status: 'Active',
  },
  {
    id: '8',
    studentId: 'SV008',
    fullName: 'Bui Quang Nam',
    email: 'bqn@university.edu.vn',
    dateOfBirth: '2001-12-03',
    gender: 'Male',
    faculty: 'Engineering',
    class: 'EN-K14',
    status: 'Graduated',
  },
  {
    id: '9',
    studentId: 'SV009',
    fullName: 'Nguyen Thi Phuong',
    email: 'ntp@university.edu.vn',
    dateOfBirth: '2002-08-17',
    gender: 'Female',
    faculty: 'Information Technology',
    class: 'IT-K15',
    status: 'Active',
  },
  {
    id: '10',
    studentId: 'SV010',
    fullName: 'Tran Van Quan',
    email: 'tvq@university.edu.vn',
    dateOfBirth: '2002-06-09',
    gender: 'Male',
    faculty: 'Engineering',
    class: 'EN-K15',
    status: 'Active',
  },
];

export default function StudentManagementTable() {
  const [students, setStudents] = useState<Student[]>(initialMockStudents);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<{ id: string; name: string; studentId: string } | null>(null);
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    studentId: '',
    email: '',
    class: '',
    status: 'Active' as 'Active' | 'Graduated' | 'Suspended',
  });
  const itemsPerPage = 10;

  // Filter students based on search query (Student Name or Student ID)
  const filteredStudents = useMemo(() => {
    let filtered = [...students];

    // Search filter (Student Name or Student ID)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (student) =>
          student.fullName.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query)
      );
    }

    // Faculty filter
    if (facultyFilter !== 'all') {
      filtered = filtered.filter((student) => {
        if (facultyFilter === 'IT') return student.faculty === 'Information Technology';
        if (facultyFilter === 'BA') return student.faculty === 'Business Administration';
        if (facultyFilter === 'EN') return student.faculty === 'Engineering';
        return true;
      });
    }

    // Class filter
    if (classFilter !== 'all') {
      filtered = filtered.filter((student) => student.class.includes(classFilter));
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((student) => student.status === statusFilter);
    }

    return filtered;
  }, [students, searchQuery, facultyFilter, classFilter, statusFilter]);

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, facultyFilter, classFilter, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSelectAll = () => {
    if (selectedStudents.size === currentStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(currentStudents.map(s => s.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedStudents(newSelected);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (studentId: string, studentName: string, studentCode: string) => {
    setStudentToDelete({ id: studentId, name: studentName, studentId: studentCode });
    setIsDeleteModalOpen(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents((prev) => prev.filter((student) => student.id !== studentToDelete.id));
      // Remove from selected students if it was selected
      setSelectedStudents((prev) => {
        const newSet = new Set(prev);
        newSet.delete(studentToDelete.id);
        return newSet;
      });
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  // Handle add new student
  const handleAddStudent = () => {
    if (!newStudent.fullName || !newStudent.studentId || !newStudent.email || !newStudent.class) {
      alert('Please fill in all required fields.');
      return;
    }

    // Check if Student ID already exists
    if (students.some(s => s.studentId === newStudent.studentId)) {
      alert('Student ID already exists. Please use a different ID.');
      return;
    }

    // Generate new ID (use timestamp for uniqueness)
    const newId = Date.now().toString();

    // Determine faculty based on class
    let faculty = 'Information Technology';
    if (newStudent.class.includes('BA')) {
      faculty = 'Business Administration';
    } else if (newStudent.class.includes('EN')) {
      faculty = 'Engineering';
    }

    // Create new student (assign a default gender and date of birth)
    const studentToAdd: Student = {
      id: newId,
      studentId: newStudent.studentId,
      fullName: newStudent.fullName,
      email: newStudent.email,
      dateOfBirth: '2002-01-01', // Default date
      gender: 'Male', // Default gender
      faculty: faculty,
      class: newStudent.class,
      status: newStudent.status,
    };

    // Add to the top of the list
    setStudents((prev) => [studentToAdd, ...prev]);
    
    // Reset form and close modal
    setNewStudent({
      fullName: '',
      studentId: '',
      email: '',
      class: '',
      status: 'Active',
    });
    setIsModalOpen(false);
    setCurrentPage(1); // Reset to first page to show new student
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Graduated':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Suspended':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'Male' ? '♂' : '♀';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="space-y-6">
      {/* Toolbar Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Student ID, Name, Email..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              {/* Faculty Filter */}
              <select
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Faculties</option>
                <option value="IT">Information Technology</option>
                <option value="BA">Business Administration</option>
                <option value="EN">Engineering</option>
              </select>

              {/* Class Filter */}
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Classes</option>
                <option value="K14">K14</option>
                <option value="K15">K15</option>
                <option value="K16">K16</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Graduated">Graduated</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md shadow-blue-600/30"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Add New Student</span>
              </button>
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg transition-colors">
                <FileSpreadsheet className="w-4 h-4" />
                <span className="font-medium">Export to Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStudents.size === currentStudents.length && currentStudents.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Student Info</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date of Birth & Gender</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Class/Faculty</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    No students found matching your search criteria.
                  </td>
                </tr>
              ) : (
                currentStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => toggleSelect(student.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${getAvatarColor(student.fullName)} flex items-center justify-center text-white font-semibold shadow-md`}>
                          {student.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{student.fullName}</div>
                          <div className="text-xs text-slate-500 flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(student.dateOfBirth)}</span>
                        <span className={`text-lg ${student.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'}`}>
                          {getGenderIcon(student.gender)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-slate-900">{student.class}</div>
                        <div className="text-xs text-slate-500">{student.faculty}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(student.id, student.fullName, student.studentId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing <span className="font-semibold">{filteredStudents.length > 0 ? startIndex + 1 : 0}</span> to{' '}
              <span className="font-semibold">{endIndex}</span> of{' '}
              <span className="font-semibold">{filteredStudents.length}</span> entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border border-slate-300 text-slate-700 hover:bg-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Dark overlay background with blur effect */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content with scale animation */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 z-50 transform transition-all duration-300 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                {/* Icon with colorful background */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Add New Student</h2>
                  <p className="text-sm text-gray-500">Fill in the student information below</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 text-gray-500 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={newStudent.fullName}
                    onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={newStudent.studentId}
                    onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                    placeholder="e.g., SV011"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="email@university.edu.vn"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                    placeholder="e.g., IT-K15"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={newStudent.status}
                  onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value as 'Active' | 'Graduated' | 'Suspended' })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="Active" className="text-green-600">✓ Active</option>
                  <option value="Graduated" className="text-blue-600">🎓 Graduated</option>
                  <option value="Suspended" className="text-red-600">⚠ Suspended</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 flex items-center space-x-2"
              >
                <Check className="w-5 h-5" />
                <span>Save Student</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Dark overlay background with blur effect */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setStudentToDelete(null);
            }}
          ></div>

          {/* Modal Content with scale animation */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 z-50 transform transition-all duration-300 animate-in zoom-in-95 border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                {/* Warning Icon with colorful background */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Delete Student</h2>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setStudentToDelete(null);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 text-gray-500 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Warning Message */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-800 mb-1">Warning: Irreversible Action</p>
                      <p className="text-sm text-red-700">
                        You are about to permanently delete this student's record. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Student Information */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-700">Name:</span>
                      <span className="text-sm text-gray-900">{studentToDelete.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-700">Student ID:</span>
                      <span className="text-sm font-mono text-gray-900 bg-white px-2 py-1 rounded border border-gray-200">
                        {studentToDelete.studentId}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirmation Question */}
                <p className="text-sm text-gray-600 text-center py-2">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{studentToDelete.name}</span>?
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setStudentToDelete(null);
                }}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-200 flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Student</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
