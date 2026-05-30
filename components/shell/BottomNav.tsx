'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/classNames';
import { bottomNavRoutes } from '@/lib/routes';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-sage bg-ivory/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {bottomNavRoutes.map((route) => {
          const active = pathname === route.href;

          return (
            <Link
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-2 text-xs font-semibold text-muted',
                active && 'bg-greenDeep text-ivory'
              )}
              href={route.href}
              key={route.href}
            >
              <Icon className="h-4 w-4" name={route.icon} />
              <span>{route.shortLabel ?? route.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
