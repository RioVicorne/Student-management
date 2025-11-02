'use client';

import React from 'react';
import { useStudent } from '@/contexts/StudentContext';

export default function Dashboard() {
  const { students } = useStudent();

  // Calculate statistics
  const stats = {
    total: students.length,
    byMajor: students.reduce((acc, student) => {
      acc[student.major] = (acc[student.major] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    majors: Object.keys(
      students.reduce((acc, student) => {
        acc[student.major] = true;
        return acc;
      }, {} as Record<string, boolean>)
    ).length,
  };

  const majorEntries = Object.entries(stats.byMajor).sort((a, b) => b[1] - a[1]);

  return (
    <div className="glass-strong rounded-3xl p-6 mb-6 shine">
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
        📊 Thống kê
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-white mb-2">{stats.total}</div>
          <div className="text-white/80 font-medium">Tổng số sinh viên</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-white mb-2">{stats.majors}</div>
          <div className="text-white/80 font-medium">Chuyên ngành</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {majorEntries.length > 0 ? majorEntries[0][1] : 0}
          </div>
          <div className="text-white/80 font-medium">
            {majorEntries.length > 0 ? majorEntries[0][0] : 'N/A'}
          </div>
        </div>
      </div>

      {majorEntries.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Phân bổ theo chuyên ngành
          </h3>
          <div className="space-y-3">
            {majorEntries.map(([major, count]) => {
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
              return (
                <div key={major} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{major}</span>
                    <span className="text-white/80 text-sm">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

