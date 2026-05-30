import type { ReactNode } from 'react';
import { cn } from '@/lib/classNames';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <section className={cn('rounded-lg border border-sage bg-white/90 p-4 shadow-sm', className)}>
      {children}
    </section>
  );
}
