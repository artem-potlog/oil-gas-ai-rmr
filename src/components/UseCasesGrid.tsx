import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, Clock, ShieldAlert, Server } from 'lucide-react';
import Section from './Section';
import { useCases } from '../data/useCases';
import type { RiskLevel } from '../data/types';

const riskColor: Record<RiskLevel, string> = {
  'Низкий': '#34d399',
  'Низкий–средний': '#84cc16',
  'Средний': '#fbbf24',
  'Высокий': '#fb923c',
  'Очень высокий': '#f87171',
  'Критический': '#ef4444',
};

export default function UseCasesGrid() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section
      id="usecases"
      kicker="Каталог · ABC company"
      title="9 юзкейсов AI-агентов в нефтегазовой компании"
      intro="Это обезличенный каталог сценариев для крупной нефтегазовой компании («ABC company»). Все девять — рабочие, но по жизнеспособности в российских реалиях я выделяю три. Нажмите на карточку, чтобы раскрыть."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((uc, i) => {
          const isOpen = open === uc.id;
          return (
            <motion.div
              key={uc.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className={`overflow-hidden rounded-2xl border transition ${
                uc.highlighted
                  ? 'border-brand/45 bg-brand/[0.07] shadow-glow'
                  : 'border-white/10 bg-white/[0.035] hover:border-white/20'
              }`}
            >
              <button onClick={() => setOpen(isOpen ? null : uc.id)} className="w-full p-5 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">{uc.id}</span>
                  {uc.highlighted && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                      <Star size={10} /> для РФ
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-bold leading-snug text-white">{uc.title}</h3>
                <p className="mt-1 text-xs font-medium text-slate-400">{uc.domain}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium"
                    style={{
                      backgroundColor: `${riskColor[uc.riskLevel]}1f`,
                      color: riskColor[uc.riskLevel],
                    }}
                  >
                    <ShieldAlert size={11} /> {uc.riskLevel}
                  </span>
                  <span className="chip !px-2 !py-1 !text-[11px]">
                    <Clock size={11} /> {uc.timeSaved}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Server size={12} /> {uc.deployment}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? 'rotate-180 text-brand' : ''}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="space-y-3 p-5 pt-4">
                      <p className="text-sm leading-relaxed text-slate-300">{uc.description}</p>
                      <p className="text-sm font-medium text-accent-green">{uc.businessValue}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {uc.tools.map((t) => (
                          <span key={t} className="chip !px-2 !py-0.5 !text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
