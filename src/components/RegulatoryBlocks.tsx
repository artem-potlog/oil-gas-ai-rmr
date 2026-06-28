import { motion } from 'framer-motion';
import {
  CalendarClock,
  Database,
  FileSearch,
  Workflow,
  Building2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Reveal from './Reveal';
import type { RegulatoryExtras, RegDocStatus } from '../data/types';

interface Props {
  r: RegulatoryExtras;
  accent: string;
}

const statusMeta: Record<RegDocStatus, { label: string; color: string }> = {
  draft: { label: 'черновик', color: '#94a3b8' },
  review: { label: 'на проверке', color: '#fbbf24' },
  ready: { label: 'готов', color: '#22d3ee' },
  submitted: { label: 'сдано', color: '#34d399' },
  overdue: { label: 'просрочка', color: '#f87171' },
};

/** Календарь-дашборд — рендерится до timeline. */
export function RegulatoryCalendar({ r, accent }: Props) {
  const total = r.calendar.length;
  const submitted = r.calendar.filter((d) => d.status === 'submitted').length;
  const overdue = r.calendar.filter((d) => d.status === 'overdue').length;
  const inWork = total - submitted - overdue;

  return (
    <div className="mt-12">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
        <CalendarClock size={20} style={{ color: accent }} /> Дашборд-календарь обязательной отчётности
      </h3>
      <Reveal>
        <div className="glass p-5 sm:p-6">
          {/* KPI */}
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'форм в реестре', value: String(total) },
              { label: 'в работе', value: String(inWork) },
              { label: 'сдано', value: String(submitted) },
              { label: 'просрочек', value: String(overdue) },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-white/10 bg-ink-950/40 px-4 py-3">
                <div
                  className="text-2xl font-extrabold"
                  style={{ color: k.label === 'просрочек' ? (overdue ? '#f87171' : '#34d399') : accent }}
                >
                  {k.value}
                </div>
                <div className="text-xs text-slate-400">{k.label}</div>
              </div>
            ))}
          </div>

          {/* list */}
          <div className="grid gap-2.5 sm:grid-cols-2">
            {r.calendar.map((d, i) => {
              const s = statusMeta[d.status];
              return (
                <motion.div
                  key={d.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (i % 2) * 0.05, duration: 0.4 }}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium text-white">{d.name}</div>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Building2 size={11} /> {d.regulator}
                      </span>
                      <span>· {d.frequency}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{ backgroundColor: `${s.color}22`, color: s.color }}
                    >
                      {s.label}
                    </span>
                    <span className="text-[11px] text-slate-500">{d.deadline}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/** Источники, RAG-extract, конвейер — рендерятся после timeline. */
export function RegulatoryDeepBlocks({ r, accent }: Props) {
  return (
    <>
      {/* sources */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <Database size={20} style={{ color: accent }} /> Откуда берём цифры
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r.sources.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.06}>
              <div className="glass h-full p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-semibold text-white">
                    <Database size={15} style={{ color: accent }} /> {s.name}
                  </span>
                  {s.tag && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                      {s.tag}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.gives}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* RAG extract */}
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full overflow-hidden p-0">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-sm font-semibold text-slate-300">
              <FileSearch size={16} style={{ color: accent }} /> Что извлекает RAG (пример)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-2 font-medium">Показатель</th>
                    <th className="px-4 py-2 font-medium">Значение</th>
                    <th className="px-4 py-2 font-medium">Источник</th>
                  </tr>
                </thead>
                <tbody>
                  {r.extractSample.map((e) => (
                    <tr key={e.field} className="border-t border-white/5">
                      <td className="px-4 py-2.5 text-slate-300">{e.field}</td>
                      <td className="px-4 py-2.5 font-semibold text-white">{e.value}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-400">{e.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* pipeline */}
        <Reveal delay={0.1}>
          <div className="glass h-full p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Workflow size={16} style={{ color: accent }} /> Конвейер
            </div>
            <div className="space-y-2">
              {r.pipeline.map((step, i, arr) => (
                <div key={step}>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-950/40 px-3 py-2 text-sm text-slate-200">
                    <span
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold"
                      style={{ backgroundColor: `${accent}22`, color: accent }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="ml-[18px] h-2 w-px" style={{ backgroundColor: `${accent}55` }} />
                  )}
                </div>
              ))}
            </div>
            <div
              className="mt-3 flex items-center gap-2 rounded-xl border px-3 py-2 text-xs"
              style={{ borderColor: `${accent}40`, backgroundColor: `${accent}10` }}
            >
              <CheckCircle2 size={14} style={{ color: accent }} />
              <span className="text-slate-200">
                Менеджер только проверяет глазами и отправляет — <ArrowRight size={11} className="inline" /> ноль ручного
                перебивания цифр.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
