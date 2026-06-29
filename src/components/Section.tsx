import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  kicker?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, kicker, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={`relative scroll-mt-20 ${className ?? ''}`}>
      <div className="section-pad">
        {(kicker || title) && (
          <Reveal>
            <header className="mb-12">
              {kicker && (
                <span className="chip mb-4 uppercase tracking-[0.2em] text-brand-soft">{kicker}</span>
              )}
              {title && (
                <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                  {title}
                </h2>
              )}
              {intro && <p className="mt-5 text-lg leading-relaxed text-slate-400">{intro}</p>}
            </header>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
