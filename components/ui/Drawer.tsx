'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/classNames';

type DrawerProps = {
  children: ReactNode;
  title: string;
  open?: boolean;
  onClose?: () => void;
  className?: string;
};

export function Drawer({ children, className, onClose, open = false, title }: DrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/35 px-3 pb-3" role="presentation">
      <section
        aria-labelledby="drawer-title"
        aria-modal="true"
        className={cn(
          'max-h-[86vh] w-full overflow-y-auto rounded-t-lg bg-ivory p-4 shadow-xl',
          className
        )}
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-greenDeep" id="drawer-title">
            {title}
          </h2>
          {onClose ? (
            <button
              aria-label="Chiudi"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sage bg-white text-appText"
              onClick={onClose}
              type="button"
            >
              <span aria-hidden="true" className="block h-4 w-4 rotate-45 border-r-2 border-t-2" />
            </button>
          ) : null}
        </div>
        {children}
      </section>
    </div>
  );
}
