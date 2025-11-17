'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export default function AnimatedButton({
  children,
  variant = 'glass',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  ...props
}: AnimatedButtonProps) {
  const baseClasses = 'font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-blue-500/80 backdrop-blur-md text-white border border-blue-400/50 hover:bg-blue-500 shadow-lg',
    secondary: 'bg-purple-500/80 backdrop-blur-md text-white border border-purple-400/50 hover:bg-purple-500 shadow-lg',
    danger: 'bg-red-500/80 backdrop-blur-md text-white border border-red-400/50 hover:bg-red-500 shadow-lg',
    success: 'bg-green-500/80 backdrop-blur-md text-white border border-green-400/50 hover:bg-green-500 shadow-lg',
    glass: 'btn-glass text-white shadow-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{
        type: 'spring' as const,
        stiffness: 400,
        damping: 17,
      } as const}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${
        isLoading ? 'opacity-60 pointer-events-none' : ''
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
          <span>Đang xử lý...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
}

