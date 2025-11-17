'use client';

import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  sortBy: 'name' | 'major' | 'studentId';
  onSortChange: (sort: 'name' | 'major' | 'studentId') => void;
  sortDir: 'asc' | 'desc';
  onSortDirChange: () => void;
}

export default function SearchBar({
  value,
  onChange,
  sortBy,
  onSortChange,
  sortDir,
  onSortDirChange,
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-3 md:p-4 mb-4 md:mb-6"
    >
      <div className="flex flex-col md:flex-row gap-2 md:gap-3">
        {/* Search input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Tìm kiếm..."
            className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>

        {/* Sort controls */}
        <div className="flex gap-1.5 md:gap-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-2 md:px-3 py-2 md:py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex-1 md:flex-none"
          >
            <option value="name" className="bg-gray-800">Tên</option>
            <option value="studentId" className="bg-gray-800">Mã SV</option>
            <option value="major" className="bg-gray-800">Ngành</option>
          </select>

          <button
            onClick={onSortDirChange}
            className="px-2 md:px-3 py-2 md:py-2.5 glass rounded-lg text-white flex items-center justify-center gap-1 md:gap-2 min-w-[60px] md:min-w-0 hover:bg-white/10 active:scale-95 transition-all"
            title={sortDir === 'asc' ? 'Tăng dần' : 'Giảm dần'}
          >
            {sortDir === 'asc' ? (
              <>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="text-xs hidden md:inline">A-Z</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                <span className="text-xs hidden md:inline">Z-A</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

