import { motion } from 'framer-motion';
import {
  FileText,
  ClipboardCheck,
  Receipt,
  Cpu,
  Database,
  ListChecks,
  Wallet,
  Layers3,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import Reveal from './Reveal';
import type { CostEngineerExtras, InvoiceCheckStatus, RegisterStatus } from '../data/types';

interface Props {
  c: CostEngineerExtras;
  accent: string;
}

const checkMeta: Record<InvoiceCheckStatus, { color: string; Icon: typeof CheckCircle2 }> = {
  pass: { color: '#34d399', Icon: CheckCircle2 },
  flag: { color: '#f87171', Icon: AlertTriangle },
  info: { color: '#22d3ee', Icon: Info },
};

const registerMeta: Record<RegisterStatus, { label: string; color: string }> = {
  to_pay: { label: 'к оплате', color: '#34d399' },
  review: { label: 'на уточнение', color: '#fbbf24' },
  held: { label: 'удержано', color: '#a78bfa' },
  paid: { label: 'оплачено', color: '#64748b' },
};

/** Диаграмма сверки «договор ↔ факт ↔ счёт» — рендерится до timeline. */
export function MatchDiagram({ c, accent }: Props) {
  const cols = [
    { title: 'Договор', icon: FileText, items: c.match.contract },
    { title: 'Фактические объёмы', icon: ClipboardCheck, items: c.match.actuals },
    { title: 'Счёт / акт', icon: Receipt, items: c.match.invoice },
  ];
  return (
    <div className="mt-12">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
        <Layers3 size={20} style={{ color: accent }} /> Многосторонняя сверка: договор ↔ факт ↔ счёт
      </h3>
      <Reveal>
        <div className="glass p-5 sm:p-7">
          <div className="grid gap-3 md:grid-cols-3">
            {cols.map((col, i) => (
              <motion.div
                key={col.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <div className="mb-3 flex items-center gap-2 font-semibold text-white">
                  <col.icon size={16} style={{ color: accent }} /> {col.title}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {col.items.map((it) => (
                    <span key={it} className="chip !px-2 !py-0.5 !text-[11px]">
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* converge */}
          <div className="my-3 flex justify-center">
            <span className="h-4 w-px" style={{ backgroundColor: `${accent}55` }} />
          </div>
          <div
            className="flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold text-white"
            style={{ borderColor: `${accent}55`, backgroundColor: `${accent}12` }}
          >
            <Cpu size={18} style={{ color: accent }} /> Кост-инженер AI — многосторонняя сверка
          </div>

          {/* outcomes */}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-xl border border-accent-green/30 bg-accent-green/[0.07] px-4 py-3 text-sm">
              <CheckCircle2 size={16} className="text-accent-green" />
              <span className="text-slate-100">Совпало → в реестр к оплате</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 text-sm">
              <AlertTriangle size={16} className="text-amber-300" />
              <span className="text-slate-100">Расхождение → на уточнение</span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-400">{c.match.note}</p>
        </div>
      </Reveal>
    </div>
  );
}

/** Источники, чек-лист, сверка счёта, реестр, живые примеры — после timeline. */
export function CostEngineerDeepBlocks({ c, accent }: Props) {
  return (
    <>
      {/* sources */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <Database size={20} style={{ color: accent }} /> К каким базам подключаются агенты
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.sources.map((s, i) => (
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

      {/* checks + invoice reconciliation */}
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
              <ListChecks size={16} style={{ color: accent }} /> Что проверяет агент
            </div>
            <ul className="space-y-2">
              {c.checks.map((ch) => {
                const m = checkMeta[ch.status];
                return (
                  <li key={ch.label} className="flex items-start gap-2 text-sm">
                    <m.Icon size={15} className="mt-0.5 shrink-0" style={{ color: m.color }} />
                    <span>
                      <span className="font-medium text-white">{ch.label}</span>
                      <span className="text-slate-400"> — {ch.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full overflow-hidden p-0">
            <div className="border-b border-white/10 px-5 py-3 text-sm font-semibold text-slate-300">
              Сверка счёта (пример)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                    {c.invoiceLines.columns.map((col) => (
                      <th key={col} className="whitespace-nowrap px-4 py-2 font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.invoiceLines.rows.map((row) => (
                    <tr
                      key={row.item}
                      className="border-t border-white/5"
                      style={row.flag ? { backgroundColor: 'rgba(251,191,36,0.08)' } : undefined}
                    >
                      <td className="whitespace-nowrap px-4 py-2.5 font-medium text-white">{row.item}</td>
                      <td className="px-4 py-2.5 text-slate-300">{row.claimed}</td>
                      <td className="px-4 py-2.5 text-slate-300">{row.confirmed}</td>
                      <td className="px-4 py-2.5 font-semibold" style={{ color: accent }}>
                        {row.toPay}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            row.flag ? 'text-amber-300' : 'text-accent-green'
                          }`}
                        >
                          {row.flag ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                          {row.flag ? 'скорректировано' : 'ок'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>

      {/* payment register */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <Wallet size={20} style={{ color: accent }} /> Реестр к оплате
        </h3>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {c.register.map((it, i) => {
            const m = registerMeta[it.status];
            return (
              <motion.div
                key={it.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 2) * 0.05, duration: 0.4 }}
              >
                <div className="min-w-0">
                  <div className="truncate font-medium text-white">{it.name}</div>
                  <div className="text-xs text-slate-400">{it.amount}</div>
                </div>
                <span
                  className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{ backgroundColor: `${m.color}22`, color: m.color }}
                >
                  {m.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* live examples */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          Живые примеры — вместо ручного SAP MM
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.liveExamples.map((ex) => {
            const inner = (
              <div className="flex h-full items-start gap-3 rounded-xl border border-white/10 bg-ink-950/40 p-4 transition hover:border-white/25">
                <Layers3 size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <div>
                  <div className="flex items-center gap-1 text-sm font-medium text-white">
                    {ex.name}
                    {ex.url && <ExternalLink size={11} className="text-slate-500" />}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">{ex.note}</p>
                </div>
              </div>
            );
            return ex.url ? (
              <a key={ex.name} href={ex.url} target="_blank" rel="noreferrer" className="block">
                {inner}
              </a>
            ) : (
              <div key={ex.name}>{inner}</div>
            );
          })}
        </div>
      </div>
    </>
  );
}
