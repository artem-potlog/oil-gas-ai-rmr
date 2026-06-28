import { motion } from 'framer-motion';
import { HardHat, FlaskConical, MonitorSmartphone, ArrowUpRight, Star } from 'lucide-react';
import Section from './Section';
import { areas } from '../data/areas';

const icons = {
  field: HardHat,
  'office-hard': FlaskConical,
  'office-soft': MonitorSmartphone,
} as const;

export default function AreasOverview() {
  return (
    <Section
      id="areas"
      kicker="Карта направлений"
      title="Три области применения AI/ML в нефтегазе"
      intro="Я делю весь ландшафт на три большие области. У каждой своя боль, барьер входа и экономика. Дальше пройдём по каждой — и увидим, какая реалистична для быстрого старта."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {areas.map((area, i) => {
          const Icon = icons[area.id];
          return (
            <motion.button
              key={area.id}
              onClick={() => document.getElementById(`area-${area.id}`)?.scrollIntoView({ behavior: 'smooth' })}
              className={`group relative overflow-hidden rounded-2xl border p-7 text-left transition ${
                area.recommended
                  ? 'border-brand/40 bg-brand/[0.07] shadow-glow'
                  : 'border-white/10 bg-white/[0.04] hover:border-white/20'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              {area.recommended && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-white">
                  <Star size={11} /> выбор
                </span>
              )}
              <div
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${area.accent}22`, color: area.accent }}
              >
                <Icon size={24} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {area.kicker}
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white">{area.title}</h3>
              <p className="mt-1 text-sm font-medium" style={{ color: area.accent }}>
                {area.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{area.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                Подробнее
                <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.button>
          );
        })}
      </div>
    </Section>
  );
}
