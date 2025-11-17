'use client';

import { motion } from 'framer-motion';
import { StudentStatus } from '@/types/extended-student';

interface StatusBadgeProps {
  status: StudentStatus;
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Đang học',
    color: 'from-green-500 to-emerald-500',
    bg: 'from-green-500/20 to-emerald-500/20',
    icon: '🎓',
  },
  graduated: {
    label: 'Đã tốt nghiệp',
    color: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-500/20 to-cyan-500/20',
    icon: '🎉',
  },
  suspended: {
    label: 'Đình chỉ',
    color: 'from-orange-500 to-red-500',
    bg: 'from-orange-500/20 to-red-500/20',
    icon: '⚠️',
  },
  dropped: {
    label: 'Đã thôi học',
    color: 'from-gray-500 to-slate-500',
    bg: 'from-gray-500/20 to-slate-500/20',
    icon: '🚫',
  },
  leave: {
    label: 'Bảo lưu',
    color: 'from-yellow-500 to-amber-500',
    bg: 'from-yellow-500/20 to-amber-500/20',
    icon: '⏸️',
  },
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${config.bg} border border-white/20 ${className}`}
    >
      <span className="text-xs">{config.icon}</span>
      <span className={`text-xs font-semibold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
        {config.label}
      </span>
    </motion.div>
  );
}

