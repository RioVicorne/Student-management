'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glassEffect?: 'light' | 'medium' | 'strong';
}

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  glassEffect = 'medium',
  ...props
}: AnimatedCardProps) {
  const glassClass = {
    light: 'glass',
    medium: 'glass-card',
    strong: 'glass-strong',
  }[glassEffect];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3 },
            }
          : undefined
      }
      whileTap={hover ? { scale: 0.98 } : undefined}
      className={`${glassClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

