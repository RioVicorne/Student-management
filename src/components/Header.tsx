'use client';

import { motion } from 'framer-motion';

interface HeaderProps {
  onAddNew: () => void;
  onImport: () => void;
  onExportJSON: () => void;
  onExportCSV: () => void;
}

export default function Header({ onAddNew, onImport, onExportJSON, onExportCSV }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-xl p-4 md:p-6 mb-4 md:mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-white">Student Manager</h1>
            <p className="text-white/60 text-xs md:text-sm hidden sm:block">Quản lý sinh viên thông minh</p>
          </div>
        </div>

        {/* Actions - Optimized for performance */}
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
          <button
            onClick={onImport}
            className="px-3 md:px-4 py-2 glass rounded-lg text-white text-xs md:text-sm font-medium flex items-center gap-1.5 md:gap-2 hover:bg-white/10 active:scale-95 transition-all"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="hidden sm:inline">Import</span>
          </button>

          <div className="flex items-center gap-0.5 md:gap-1 glass rounded-lg px-1.5 md:px-2 py-1">
            <button
              onClick={onExportJSON}
              className="px-1.5 md:px-2 py-1 text-white/80 hover:text-white text-xs md:text-sm font-medium rounded active:scale-95 transition-all"
              title="Export JSON"
            >
              JSON
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={onExportCSV}
              className="px-1.5 md:px-2 py-1 text-white/80 hover:text-white text-xs md:text-sm font-medium rounded active:scale-95 transition-all"
              title="Export CSV"
            >
              CSV
            </button>
          </div>

          <button
            onClick={onAddNew}
            className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-xs md:text-sm font-semibold flex items-center gap-1.5 md:gap-2 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-600 active:scale-95 transition-all"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Thêm mới</span>
            <span className="sm:hidden">Thêm</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

