'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export interface FilterOptions {
  majors: string[];
  statuses: string[];
  academicYears: string[];
  gpaRange?: [number, number];
}

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  availableMajors: string[];
  availableYears: string[];
}

export default function AdvancedFilter({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  availableMajors,
  availableYears,
}: AdvancedFilterProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters: FilterOptions = {
      majors: [],
      statuses: [],
      academicYears: [],
      gpaRange: undefined,
    };
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const toggleMajor = (major: string) => {
    setLocalFilters(prev => ({
      ...prev,
      majors: prev.majors.includes(major)
        ? prev.majors.filter(m => m !== major)
        : [...prev.majors, major]
    }));
  };

  const toggleYear = (year: string) => {
    setLocalFilters(prev => ({
      ...prev,
      academicYears: prev.academicYears.includes(year)
        ? prev.academicYears.filter(y => y !== year)
        : [...prev.academicYears, year]
    }));
  };

  const statuses = [
    { value: 'active', label: 'Đang học', color: 'green' },
    { value: 'graduated', label: 'Tốt nghiệp', color: 'blue' },
    { value: 'suspended', label: 'Đình chỉ', color: 'orange' },
    { value: 'leave', label: 'Bảo lưu', color: 'yellow' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Bộ lọc nâng cao
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white active:scale-95 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Majors */}
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Chuyên ngành
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableMajors.map(major => (
                  <button
                    key={major}
                    onClick={() => toggleMajor(major)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      localFilters.majors.includes(major)
                        ? 'bg-blue-500/30 text-white border-2 border-blue-400'
                        : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {major}
                  </button>
                ))}
              </div>
            </div>

            {/* Academic Years */}
            {availableYears.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Khóa học
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableYears.map(year => (
                    <button
                      key={year}
                      onClick={() => toggleYear(year)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        localFilters.academicYears.includes(year)
                          ? 'bg-purple-500/30 text-white border-2 border-purple-400'
                          : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GPA Range */}
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Điểm trung bình (GPA)
              </h3>
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="text-white/70 text-xs mb-1 block">Từ</label>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    step="0.1"
                    value={localFilters.gpaRange?.[0] || 0}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      gpaRange: [parseFloat(e.target.value), prev.gpaRange?.[1] || 4]
                    }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <span className="text-white/50 mt-5">-</span>
                <div className="flex-1">
                  <label className="text-white/70 text-xs mb-1 block">Đến</label>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    step="0.1"
                    value={localFilters.gpaRange?.[1] || 4}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      gpaRange: [prev.gpaRange?.[0] || 0, parseFloat(e.target.value)]
                    }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-white/20">
            <button
              onClick={handleReset}
              className="px-4 py-2 glass rounded-lg text-white font-medium hover:bg-white/10 active:scale-95 transition-all"
            >
              Xóa bộ lọc
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 active:scale-95 transition-all"
            >
              Áp dụng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

