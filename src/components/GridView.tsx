'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Student } from '@/types/student';

interface GridViewProps {
  students: Student[];
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
}

export default function GridView({ 
  students, 
  onView, 
  onEdit, 
  onDelete,
  selectedIds = [],
  onToggleSelect,
}: GridViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            className={`glass-card rounded-xl p-4 relative ${
              selectedIds.includes(student.id) ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            {/* Checkbox */}
            {onToggleSelect && (
              <button
                onClick={() => onToggleSelect(student.id)}
                className="absolute top-3 right-3 w-5 h-5 rounded border-2 border-white/40 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
              >
                {selectedIds.includes(student.id) && (
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )}

            {/* Avatar placeholder */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl text-white font-bold">
              {student.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="text-center mb-3">
              <h3 className="text-white font-semibold text-sm mb-1 truncate">{student.name}</h3>
              <p className="text-white/60 text-xs font-mono mb-2">{student.studentId}</p>
              <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded text-white/90 text-[10px] font-medium border border-white/10">
                {student.major}
              </span>
            </div>

            {/* Contact */}
            <div className="text-white/60 text-xs mb-3 truncate">
              <p className="truncate">{student.email}</p>
              <p className="truncate">{student.phone}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-1">
              <button
                onClick={() => onView(student)}
                className="flex-1 p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg active:scale-95 transition-all"
                title="Xem"
              >
                <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button
                onClick={() => onEdit(student)}
                className="flex-1 p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg active:scale-95 transition-all"
                title="Sửa"
              >
                <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(student.id)}
                className="flex-1 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg active:scale-95 transition-all"
                title="Xóa"
              >
                <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

