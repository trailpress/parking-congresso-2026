import type { ReactNode } from 'react';
import { Header } from '@/components/shell/Header';
import { BottomNav } from '@/components/shell/BottomNav';
import { cn } from '@/lib/classNames';

type AppShellProps = {
  children: ReactNode;
  className?: string;
  location?: string;
  subtitle?: string;
  title?: string;
};

export function AppShell({ children, className, location, subtitle, title }: AppShellProps) {
  return (
    <div className="min-h-screen pb-24">
      <Header location={location} subtitle={subtitle} title={title} />
      <main className={cn('mx-auto flex w-full max-w-md flex-col gap-5 px-5 py-5', className)}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
