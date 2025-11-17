'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Student } from '@/types/student';

interface ListViewProps {
  students: Student[];
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
}

export default function ListView({ 
  students, 
  onView, 
  onEdit, 
  onDelete,
  selectedIds = [],
  onToggleSelect,
}: ListViewProps) {
  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            className={`glass rounded-lg p-3 hover:bg-white/5 transition-all ${
              selectedIds.includes(student.id) ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              {onToggleSelect && (
                <button
                  onClick={() => onToggleSelect(student.id)}
                  className="w-5 h-5 rounded border-2 border-white/40 flex items-center justify-center hover:bg-white/10 flex-shrink-0 active:scale-95 transition-all"
                >
                  {selectedIds.includes(student.id) && (
                    <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )}

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {student.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold text-sm truncate">{student.name}</h3>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded text-white/90 text-[10px] font-medium">
                    {student.major}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/60 text-xs">
                  <span className="font-mono">{student.studentId}</span>
                  <span className="truncate">{student.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => onView(student)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg active:scale-95 transition-all"
                  title="Xem"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => onEdit(student)}
                  className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg active:scale-95 transition-all"
                  title="Sửa"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg active:scale-95 transition-all"
                  title="Xóa"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

