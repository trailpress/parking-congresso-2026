import type { ReactNode } from 'react';
import { cn } from '@/lib/classNames';
import { operationalColorClasses } from '@/lib/constants';
import type { OperationalColor } from '@/lib/types';

type BadgeProps = {
  children: ReactNode;
  color?: OperationalColor;
  className?: string;
};

export function Badge({ children, color = 'sage', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold',
        operationalColorClasses[color],
        className
      )}
    >
      {children}
    </span>
  );
}
