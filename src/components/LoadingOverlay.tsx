'use client';

import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingOverlay({ isLoading, message = 'Đang tải...' }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
            className="glass-strong rounded-2xl p-8 flex flex-col items-center gap-4"
          >
            <LoadingSpinner size="lg" className="text-white" />
            <p className="text-white font-medium text-lg">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

