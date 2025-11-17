'use client';

import { motion } from 'framer-motion';

export type ViewMode = 'table' | 'grid' | 'list';

interface ViewModeSwitcherProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewModeSwitcher({ mode, onChange }: ViewModeSwitcherProps) {
  const modes = [
    {
      value: 'table' as ViewMode,
      label: 'Table',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      value: 'grid' as ViewMode,
      label: 'Grid',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      ),
    },
    {
      value: 'list' as ViewMode,
      label: 'List',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="glass rounded-lg p-1 flex items-center gap-1">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-all ${
            mode === m.value
              ? 'bg-blue-500/30 text-white'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
          title={m.label}
        >
          {m.icon}
          <span className="hidden md:inline">{m.label}</span>
        </button>
      ))}
    </div>
  );
}

