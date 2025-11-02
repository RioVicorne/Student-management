'use client';

import React from 'react';
import { Student } from '@/types/student';

interface StudentDetailProps {
  student: Student;
  onClose: () => void;
}

export default function StudentDetail({ student, onClose }: StudentDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div
        className="glass-strong rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
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
          Chi tiết sinh viên
        </h2>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Thông tin cá nhân
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-white/70 text-sm mb-1">Họ và tên</p>
                <p className="text-white font-semibold text-lg">{student.name}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Mã sinh viên</p>
                <p className="text-white font-semibold text-lg">{student.studentId}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Email</p>
                <p className="text-white font-medium">{student.email}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Số điện thoại</p>
                <p className="text-white font-medium">{student.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/70 text-sm mb-1">Địa chỉ</p>
                <p className="text-white font-medium">{student.address}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Thông tin học tập
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-white/70 text-sm mb-1">Chuyên ngành</p>
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30">
                  {student.major}
                </span>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Ngày sinh</p>
                <p className="text-white font-medium">
                  {new Date(student.dateOfBirth).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-white/20 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 glass rounded-xl text-white font-semibold hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

