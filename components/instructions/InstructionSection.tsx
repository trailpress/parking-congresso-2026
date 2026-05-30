import type { ReactNode } from 'react';

type InstructionSectionProps = {
  title: string;
  children?: ReactNode;
  items?: string[];
};

export function InstructionSection({ children, items, title }: InstructionSectionProps) {
  if (!children && (!items || items.length === 0)) {
    return null;
  }

  return (
    <section className="border-t border-sage py-3">
      <h3 className="text-sm font-semibold text-greenDeep">{title}</h3>
      {items ? (
        <ul className="mt-2 space-y-2 text-sm leading-5 text-appText">
          {items.map((item) => (
            <li className="rounded-md bg-white px-3 py-2" key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {children ? <div className="mt-2 text-sm leading-5 text-appText">{children}</div> : null}
    </section>
  );
}
