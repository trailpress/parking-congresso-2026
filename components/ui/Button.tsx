import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/classNames';

type ButtonVariant = 'primary' | 'secondary' | 'emergency' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-greenDeep text-ivory shadow-sm hover:bg-greenMain',
  secondary: 'border border-sage bg-white text-appText hover:bg-sage/40',
  emergency: 'bg-passRed text-white shadow-sm hover:bg-red-700',
  ghost: 'text-appText hover:bg-sage/40'
};

export function Button({
  children,
  className,
  href,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link className={buttonClassName} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} type={type} {...props}>
      {children}
    </button>
  );
}
