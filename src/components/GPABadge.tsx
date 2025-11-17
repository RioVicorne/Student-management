'use client';

import { motion } from 'framer-motion';

interface GPABadgeProps {
  gpa: number;
  className?: string;
}

export default function GPABadge({ gpa, className = '' }: GPABadgeProps) {
  const getGPAConfig = (gpa: number) => {
    if (gpa >= 3.6) {
      return {
        label: 'Xuất sắc',
        color: 'from-green-500 to-emerald-500',
        bg: 'from-green-500/20 to-emerald-500/20',
        icon: '🌟',
      };
    } else if (gpa >= 3.2) {
      return {
        label: 'Giỏi',
        color: 'from-blue-500 to-cyan-500',
        bg: 'from-blue-500/20 to-cyan-500/20',
        icon: '⭐',
      };
    } else if (gpa >= 2.5) {
      return {
        label: 'Khá',
        color: 'from-purple-500 to-pink-500',
        bg: 'from-purple-500/20 to-pink-500/20',
        icon: '✨',
      };
    } else if (gpa >= 2.0) {
      return {
        label: 'Trung bình',
        color: 'from-yellow-500 to-orange-500',
        bg: 'from-yellow-500/20 to-orange-500/20',
        icon: '📝',
      };
    } else {
      return {
        label: 'Yếu',
        color: 'from-red-500 to-rose-500',
        bg: 'from-red-500/20 to-rose-500/20',
        icon: '⚠️',
      };
    }
  };

  const config = getGPAConfig(gpa);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.bg} border border-white/20 ${className}`}
    >
      <span className="text-sm">{config.icon}</span>
      <div className="flex items-center gap-1.5">
        <span className={`text-lg font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
          {gpa.toFixed(2)}
        </span>
        <span className="text-xs text-white/70">/ 4.0</span>
      </div>
      <span className="text-xs text-white/60">({config.label})</span>
    </motion.div>
  );
}

