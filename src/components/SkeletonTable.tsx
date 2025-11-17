'use client';

import { motion } from 'framer-motion';

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

export default function SkeletonTable({ rows = 5, columns = 7 }: SkeletonTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-strong rounded-3xl p-6 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-4 py-4 text-left">
                  <div className="h-4 bg-white/10 rounded shimmer" style={{ width: '80%' }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.05 }}
                className="border-b border-white/10"
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-4">
                    <div
                      className="h-3 bg-white/10 rounded shimmer"
                      style={{ width: colIndex === columns - 1 ? '60%' : '90%' }}
                    />
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

