import { cn } from '@/lib/classNames';

type IconProps = {
  name?: string;
  className?: string;
};

const paths: Record<string, string> = {
  alert: 'M12 9v4m0 4h.01M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.5L13.7 3.9a2 2 0 0 0-3.4 0Z',
  chevron: 'm9 18 6-6-6-6',
  grid: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z',
  home: 'M3 10.8 12 4l9 6.8V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.2Z',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-7 9 7 4 7-4M5 16l7 4 7-4',
  map: 'M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 18V6',
  route: 'M6 4a3 3 0 1 0 0 6h12a3 3 0 1 1 0 6H7m0 0 3-3m-3 3 3 3',
  source: 'M7 3h7l5 5v13H7V3Zm7 0v6h5M10 13h6M10 17h6',
  users: 'M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm11.5 10v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8'
};

export function Icon({ name = 'chevron', className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('h-5 w-5 shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d={paths[name] ?? paths.chevron} />
    </svg>
  );
}
