'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Student } from '@/types/student';

interface StudentDetailProps {
  student: Student;
  onClose: () => void;
}

export default function StudentDetail({ student, onClose }: StudentDetailProps) {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: 15,
      transition: {
        duration: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
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
            className="text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center gap-2"
          >
            <span className="text-3xl">👤</span>
            Chi tiết sinh viên
          </motion.h2>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-white/70 text-sm mb-1">Họ và tên</p>
                  <p className="text-white font-semibold text-lg">{student.name}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <p className="text-white/70 text-sm mb-1">Mã sinh viên</p>
                  <p className="text-white font-semibold text-lg">{student.studentId}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-white/70 text-sm mb-1">Email</p>
                  <p className="text-white font-medium">{student.email}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <p className="text-white/70 text-sm mb-1">Số điện thoại</p>
                  <p className="text-white font-medium">{student.phone}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="md:col-span-2"
                >
                  <p className="text-white/70 text-sm mb-1">Địa chỉ</p>
                  <p className="text-white font-medium">{student.address}</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-purple-400"
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
                Thông tin học tập
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <p className="text-white/70 text-sm mb-2">Chuyên ngành</p>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30"
                  >
                    {student.major}
                  </motion.span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-white/70 text-sm mb-1">Ngày sinh</p>
                  <p className="text-white font-medium">
                    {new Date(student.dateOfBirth).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex justify-end pt-6 border-t border-white/20 mt-6"
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 glass rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              Đóng
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

