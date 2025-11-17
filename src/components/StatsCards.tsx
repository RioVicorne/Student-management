'use client';

import { motion } from 'framer-motion';

interface StatsCardsProps {
  total: number;
  majors: number;
  topMajor?: string;
  topMajorCount?: number;
}

export default function StatsCards({ total, majors, topMajor, topMajorCount }: StatsCardsProps) {
  const cards = [
    {
      title: 'Tổng sinh viên',
      value: total,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'Chuyên ngành',
      value: majors,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: topMajor || 'Phổ biến nhất',
      value: topMajorCount || 0,
      subtitle: topMajor ? 'sinh viên' : 'N/A',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      gradient: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-500/20 to-teal-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="glass-card rounded-xl p-4 md:p-6 cursor-pointer hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${card.bgGradient} flex items-center justify-center`}>
              <div className={`text-transparent bg-clip-text bg-gradient-to-br ${card.gradient}`}>
                {card.icon}
              </div>
            </div>
            <div className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${card.bgGradient} text-[10px] md:text-xs font-medium text-white`}>
              Active
            </div>
          </div>
          <h3 className="text-white/70 text-xs md:text-sm font-medium mb-1">{card.title}</h3>
          <div className="flex items-end gap-2">
            <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
              {card.value}
            </p>
            {card.subtitle && (
              <p className="text-white/50 text-xs md:text-sm mb-0.5 md:mb-1">{card.subtitle}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

