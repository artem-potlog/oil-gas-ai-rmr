import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const groups = [
  {
    label: 'крупный заказчик',
    items: [{ id: 'usecases', label: '9 кейсов' }],
  },
  {
    label: 'для малого РФ',
    items: [
      { id: 'procurement', label: 'Закупки' },
      { id: 'decision-docs', label: 'Отчётность' },
      { id: 'cash-calls', label: 'Акты и счета' },
      { id: 'bdds', label: 'БДДС' },
    ],
  },
  {
    label: 'итог',
    items: [{ id: 'estimates', label: 'Бюджет MVP' }],
  },
];

export default function Navigation() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink-950/70 backdrop-blur-xl' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-soft to-brand text-sm font-extrabold text-ink-950">
            AI
          </span>
          <span className="hidden text-sm font-semibold text-white sm:block">O&amp;G · AI</span>
        </button>
        <nav className="hidden items-center gap-2 lg:flex">
          {groups.map((g, gi) => (
            <div key={g.label} className="flex items-center gap-2">
              {gi > 0 && <span className="h-5 w-px bg-white/15" />}
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-200">
                {g.label}
              </span>
              <div className="flex items-center gap-1">
                {g.items.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => go(l.id)}
                    className="rounded-full px-2.5 py-1.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <button
          onClick={() => go('cta')}
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-soft"
        >
          Обсудить
        </button>
      </div>
      <motion.div
        className="h-0.5 origin-left bg-gradient-to-r from-brand-soft via-brand to-accent-violet"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.header>
  );
}
