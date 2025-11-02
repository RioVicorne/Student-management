'use client';

import React, { useState, useEffect } from 'react';
import { Student, StudentFormData } from '@/types/student';
import { useStudent } from '@/contexts/StudentContext';

interface StudentFormProps {
  student?: Student;
  onClose: () => void;
}

export default function StudentForm({ student, onClose }: StudentFormProps) {
  const { addStudent, updateStudent } = useStudent();
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    studentId: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    major: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        studentId: student.studentId,
        phone: student.phone,
        address: student.address,
        dateOfBirth: student.dateOfBirth,
        major: student.major,
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên.';
    if (!formData.studentId.trim()) newErrors.studentId = 'Vui lòng nhập mã sinh viên.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Vui lòng nhập email hợp lệ.';
    if (!formData.phone.trim() || !/^[0-9+\-\s()]{7,}$/.test(formData.phone)) newErrors.phone = 'Vui lòng nhập số điện thoại hợp lệ (ít nhất 7 ký tự).';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ.';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Vui lòng chọn ngày sinh.';
    if (!formData.major) newErrors.major = 'Vui lòng chọn chuyên ngành.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      if (student) {
        updateStudent(student.id, formData);
      } else {
        addStudent(formData);
      }
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div
        className="glass-strong rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
          {student ? 'Sửa thông tin sinh viên' : 'Thêm sinh viên mới'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Họ và tên <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                placeholder="Nhập họ và tên"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Mã sinh viên <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                placeholder="Nhập mã sinh viên"
              />
              {errors.studentId && <p className="text-red-400 text-sm mt-2">{errors.studentId}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                placeholder="example@email.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Số điện thoại <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                placeholder="0123456789"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Địa chỉ <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
              placeholder="Nhập địa chỉ"
            />
            {errors.address && <p className="text-red-400 text-sm mt-2">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Ngày sinh <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
              {errors.dateOfBirth && <p className="text-red-400 text-sm mt-2">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Chuyên ngành <span className="text-red-400">*</span>
              </label>
              <select
                name="major"
                value={formData.major}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
              >
                <option value="" className="bg-gray-800 text-white">
                  Chọn chuyên ngành
                </option>
                <option value="Công nghệ thông tin" className="bg-gray-800 text-white">
                  Công nghệ thông tin
                </option>
                <option value="Kỹ thuật phần mềm" className="bg-gray-800 text-white">
                  Kỹ thuật phần mềm
                </option>
                <option value="Khoa học máy tính" className="bg-gray-800 text-white">
                  Khoa học máy tính
                </option>
                <option value="An toàn thông tin" className="bg-gray-800 text-white">
                  An toàn thông tin
                </option>
                <option value="Quản trị kinh doanh" className="bg-gray-800 text-white">
                  Quản trị kinh doanh
                </option>
                <option value="Kinh tế" className="bg-gray-800 text-white">
                  Kinh tế
                </option>
              </select>
              {errors.major && <p className="text-red-400 text-sm mt-2">{errors.major}</p>}
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6 border-t border-white/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 glass rounded-xl text-white font-semibold hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-blue-500/80 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg border border-blue-400/50 transition-all duration-300 ${isSubmitting ? 'opacity-60 pointer-events-none' : ''}`}
            >
              {isSubmitting ? 'Đang xử lý...' : student ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
