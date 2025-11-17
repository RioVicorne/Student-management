'use client';

import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-2xl p-6"
    >
      {/* Header skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-white/10 shimmer" />
        <div className="flex-1">
          <div className="h-4 bg-white/10 rounded shimmer mb-2" style={{ width: '60%' }} />
          <div className="h-3 bg-white/10 rounded shimmer" style={{ width: '40%' }} />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-3 bg-white/10 rounded shimmer" style={{ width: '100%' }} />
        <div className="h-3 bg-white/10 rounded shimmer" style={{ width: '80%' }} />
        <div className="h-3 bg-white/10 rounded shimmer" style={{ width: '90%' }} />
      </div>

      {/* Footer skeleton */}
      <div className="flex gap-2 mt-4">
        <div className="h-8 bg-white/10 rounded shimmer flex-1" />
        <div className="h-8 bg-white/10 rounded shimmer flex-1" />
        <div className="h-8 bg-white/10 rounded shimmer flex-1" />
      </div>
    </motion.div>
  );
}

