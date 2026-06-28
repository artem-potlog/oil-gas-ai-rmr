import { motion } from 'framer-motion';
import {
  Bot,
  Database,
  ArrowDownUp,
  UserCheck,
  Coins,
  FileSearch,
  Quote,
  Gauge,
  ShieldCheck,
  Layers3,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import Reveal from './Reveal';
import type { ProcurementExtras } from '../data/types';

interface Props {
  p: ProcurementExtras;
  accent: string;
}

/** Блок 1: AI поверх 1С:ERP — рендерится до timeline. */
export function ErpDiagram({ p, accent }: Props) {
  return (
    <div className="mt-12">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
        <Layers3 size={20} style={{ color: accent }} /> AI поверх 1С:ERP — дополнение, а не замена
      </h3>
      <Reveal>
        <div className="glass overflow-hidden p-5 sm:p-7">
          {/* AI layer */}
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: `${accent}55`, backgroundColor: `${accent}12` }}
          >
            <div className="mb-3 flex items-center gap-2 font-semibold" style={{ color: accent }}>
              <Bot size={18} /> AI-агентный слой
            </div>
            <div className="flex flex-wrap gap-2">
              {p.erp.ai.map((a) => (
                <span
                  key={a}
                  className="rounded-full border px-3 py-1.5 text-xs font-medium text-slate-100"
                  style={{ borderColor: `${accent}55`, backgroundColor: '#0a0e1a' }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* exchange */}
          <div className="my-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <ArrowDownUp size={14} style={{ color: accent }} /> читает заявки и мастер-данные · возвращает черновики, скоринг, рекомендации
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              <UserCheck size={13} /> решение принимает человек
            </span>
          </div>

          {/* ERP layer */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-5">
            <div className="mb-3 flex items-center gap-2 font-semibold text-slate-200">
              <Database size={18} className="text-slate-300" /> 1С:ERP — система записи
            </div>
            <div className="flex flex-wrap gap-2">
              {p.erp.record.map((r) => (
                <span key={r} className="chip">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.erp.note}</p>
        </div>
      </Reveal>
    </div>
  );
}

/** Блоки 2-6: источники, RAG, скоринг, паритет, живые примеры — рендерятся после timeline. */
export function ProcurementDeepBlocks({ p, accent }: Props) {
  const totalWeight = p.scoring.criteria.reduce((s, c) => s + c.weight, 0);

  return (
    <>
      {/* should-cost data sources */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <Coins size={20} style={{ color: accent }} /> Откуда берём стоимость (should-cost)
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.dataSources.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.06}>
              <div className="glass h-full p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-semibold text-white">
                    <Database size={15} style={{ color: accent }} /> {d.name}
                  </span>
                  {d.tag && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                      {d.tag}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{d.gives}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* band */}
        <Reveal delay={0.1}>
          <div className="mt-4 glass p-5">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span>Справедливая стоимость, диапазон</span>
              <span>{p.shouldCostBand.unit}</span>
            </div>
            <div className="relative h-3 w-full rounded-full bg-white/5">
              <div
                className="absolute inset-y-0 rounded-full"
                style={{
                  left: '8%',
                  right: '8%',
                  background: `linear-gradient(90deg, ${accent}55, ${accent}, ${accent}55)`,
                }}
              />
              <div
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white"
                style={{ left: 'calc(50% - 10px)', backgroundColor: accent }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm font-semibold text-white">
              <span>min {p.shouldCostBand.min}</span>
              <span style={{ color: accent }}>base {p.shouldCostBand.base}</span>
              <span>max {p.shouldCostBand.max}</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* RAG */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <FileSearch size={20} style={{ color: accent }} /> RAG по нормативной документации
        </h3>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="glass h-full p-5">
              <div className="mb-3 text-sm font-semibold text-slate-300">Корпус для поиска</div>
              <ul className="space-y-2">
                {p.ragCorpus.map((d) => (
                  <li key={d.name} className="flex gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                    <span>
                      <span className="font-medium text-white">{d.name}</span>
                      <span className="text-slate-400"> — {d.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass h-full p-5">
              <div className="mb-3 text-sm font-semibold text-slate-300">Как извлекается ответ</div>
              <div className="space-y-2">
                {['Запрос агента', 'Векторный поиск по корпусу', 'Процитированные пункты', 'Решение / документ'].map(
                  (step, i, arr) => (
                    <div key={step}>
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-950/40 px-3 py-2 text-sm text-slate-200">
                        <span
                          className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold"
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
                  ),
                )}
              </div>
              <div
                className="mt-3 flex items-start gap-2 rounded-xl border p-3 text-xs"
                style={{ borderColor: `${accent}40`, backgroundColor: `${accent}10` }}
              >
                <Quote size={14} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-slate-200">
                  «…в соответствии с п. 4 ст. 3 № 223-ФЗ и п. 7.2 Положения о закупках» —
                  каждая формулировка привязана к источнику и проверяема.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scoring */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <Gauge size={20} style={{ color: accent }} /> Как агенты проводят скоринг
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* agents */}
          <Reveal>
            <div className="glass h-full p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <ShieldCheck size={16} style={{ color: accent }} /> Агенты-оценщики
              </div>
              <ul className="space-y-2.5">
                {p.scoring.agents.map((a) => (
                  <li key={a.name} className="flex gap-2 text-sm">
                    <Bot size={15} className="mt-0.5 shrink-0" style={{ color: accent }} />
                    <span>
                      <span className="font-medium text-white">{a.name}</span>
                      <span className="text-slate-400"> — {a.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* weighted criteria */}
          <Reveal delay={0.1}>
            <div className="glass h-full p-5">
              <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-300">
                <span>Взвешенные критерии</span>
                <span className="text-slate-500">Σ {totalWeight}%</span>
              </div>
              <div className="space-y-3">
                {p.scoring.criteria.map((c) => (
                  <div key={c.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-slate-300">{c.label}</span>
                      <span className="font-semibold text-white">{c.weight}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accent }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.weight}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-500">агент: {c.agent}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* sample bid matrix */}
        <Reveal delay={0.15}>
          <div className="mt-4 glass overflow-hidden p-0">
            <div className="border-b border-white/10 px-5 py-3 text-sm font-semibold text-slate-300">
              Матрица сравнения заявок (пример)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                    {p.scoring.sampleBids.columns.map((c) => (
                      <th key={c} className="whitespace-nowrap px-4 py-2 font-medium">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.scoring.sampleBids.rows.map((row) => {
                    const empty = row.total === 0;
                    return (
                      <tr
                        key={row.vendor}
                        className="border-t border-white/5"
                        style={row.flagged ? { backgroundColor: 'rgba(248,113,113,0.08)' } : undefined}
                      >
                        <td className="whitespace-nowrap px-4 py-2.5 font-medium text-white">{row.vendor}</td>
                        {row.scores.map((s, i) => (
                          <td key={i} className="px-4 py-2.5 text-slate-300">
                            {empty ? '—' : s}
                          </td>
                        ))}
                        <td className="px-4 py-2.5 font-bold" style={{ color: empty ? '#64748b' : accent }}>
                          {empty ? '—' : row.total}
                        </td>
                        <td className="px-4 py-2.5">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium ${
                              row.flagged ? 'text-red-400' : empty ? 'text-slate-500' : 'text-accent-green'
                            }`}
                          >
                            {row.flagged ? (
                              <AlertTriangle size={12} />
                            ) : empty ? null : (
                              <CheckCircle2 size={12} />
                            )}
                            {row.verdict}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Ariba parity + live examples */}
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full p-5">
            <h3 className="mb-4 text-lg font-bold text-white">Что уже умеет Ariba — и что воспроизводим</h3>
            <div className="space-y-2.5">
              {p.aribaParity.map((row) => (
                <div
                  key={row.ariba}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border border-white/10 bg-ink-950/40 p-3"
                >
                  <span className="text-xs text-slate-400">{row.ariba}</span>
                  <span style={{ color: accent }}>→</span>
                  <span className="text-xs font-medium text-slate-100">{row.ours}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass h-full p-5">
            <h3 className="mb-4 text-lg font-bold text-white">Живые примеры</h3>
            <div className="space-y-2.5">
              {p.liveExamples.map((ex) => {
                const inner = (
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-ink-950/40 p-3 transition hover:border-white/25">
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
        </Reveal>
      </div>
    </>
  );
}
