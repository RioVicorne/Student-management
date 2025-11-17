'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Student, StudentFormData } from '@/types/student';
import { useStudent } from '@/contexts/StudentContext';
import { validateStudent } from '@/lib/validations/student';

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
    
    // Validate with Zod
    const validation = validateStudent(formData);
    
    if (!validation.success) {
      setErrors(validation.errors || {});
      const firstError = Object.values(validation.errors || {})[0];
      toast.error('Vui lòng kiểm tra lại thông tin', {
        description: firstError
      });
      return;
    }
    
    // Clear errors if validation passed
    setErrors({});

    setIsSubmitting(true);
    const loadingToast = toast.loading(student ? 'Đang cập nhật...' : 'Đang thêm sinh viên...');
    
    try {
      if (student) {
        updateStudent(student.id, formData);
        toast.success('Cập nhật thành công!', {
          description: `Đã cập nhật thông tin sinh viên ${formData.name}`,
          id: loadingToast,
        });
      } else {
        addStudent(formData);
        toast.success('Thêm sinh viên thành công!', {
          description: `Đã thêm sinh viên ${formData.name} vào hệ thống`,
          id: loadingToast,
        });
      }
      onClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra', {
        description: (error as Error).message,
        id: loadingToast,
      });
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

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="glass-strong rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
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
          </motion.button>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-6 drop-shadow-lg"
          >
            {student ? '✏️ Sửa thông tin sinh viên' : '➕ Thêm sinh viên mới'}
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            <motion.div variants={fieldVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Họ và tên <span className="text-red-400">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  placeholder="Nhập họ và tên"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Mã sinh viên <span className="text-red-400">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  placeholder="Nhập mã sinh viên"
                />
                <AnimatePresence>
                  {errors.studentId && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.studentId}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={fieldVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Email <span className="text-red-400">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  placeholder="example@email.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Số điện thoại <span className="text-red-400">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  placeholder="0123456789"
                />
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-semibold mb-2 text-white">
                Địa chỉ <span className="text-red-400">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                placeholder="Nhập địa chỉ"
              />
              <AnimatePresence>
                {errors.address && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.address}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fieldVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Ngày sinh <span className="text-red-400">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
                <AnimatePresence>
                  {errors.dateOfBirth && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.dateOfBirth}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Chuyên ngành <span className="text-red-400">*</span>
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
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
                </motion.select>
                <AnimatePresence>
                  {errors.major && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.major}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              variants={fieldVariants}
              className="flex gap-4 justify-end pt-6 border-t border-white/20"
            >
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 glass rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                Hủy
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                className={`px-6 py-3 bg-blue-500/80 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-blue-500 shadow-lg border border-blue-400/50 transition-all duration-300 flex items-center gap-2 ${
                  isSubmitting ? 'opacity-60 pointer-events-none' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <span>{student ? 'Cập nhật' : 'Thêm mới'}</span>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
