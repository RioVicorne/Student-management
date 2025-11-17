'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkExport: () => void;
}

export default function BulkActionBar({
  selectedCount,
  onClearSelection,
  onBulkDelete,
  onBulkExport,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  const handleBulkDelete = () => {
    toast.custom((t) => (
      <div className="glass-strong rounded-xl p-4 border border-red-400/50 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">Xóa {selectedCount} sinh viên?</h3>
            <p className="text-white/80 text-sm mb-3">
              Hành động này không thể hoàn tác!
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onBulkDelete();
                  toast.dismiss(t);
                  toast.success(`Đã xóa ${selectedCount} sinh viên!`);
                }}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium active:scale-95 transition-all"
              >
                Xóa tất cả
              </button>
              <button
                onClick={() => toast.dismiss(t)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium active:scale-95 transition-all"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="glass-strong rounded-2xl p-4 shadow-2xl border border-white/40 min-w-[320px]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-white font-bold">{selectedCount}</span>
              </div>
              <span className="text-white font-medium">
                {selectedCount} được chọn
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onBulkExport}
                className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg active:scale-95 transition-all"
                title="Export đã chọn"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button
                onClick={handleBulkDelete}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg active:scale-95 transition-all"
                title="Xóa đã chọn"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={onClearSelection}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg active:scale-95 transition-all"
                title="Bỏ chọn tất cả"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

