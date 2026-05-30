import { appMeta } from '@/lib/constants';

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export function Header({ subtitle = appMeta.subtitle, title = appMeta.title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-sage bg-ivory/95 px-5 py-4 backdrop-blur">
      <div className="mx-auto w-full max-w-md">
        <p className="text-xs font-semibold uppercase text-muted">{subtitle}</p>
        <h1 className="mt-1 text-xl font-semibold leading-tight text-greenDeep">{title}</h1>
      </div>
    </header>
  );
}
