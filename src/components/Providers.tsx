'use client';

import { StudentProvider } from '@/contexts/StudentContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <StudentProvider>{children}</StudentProvider>;
}

