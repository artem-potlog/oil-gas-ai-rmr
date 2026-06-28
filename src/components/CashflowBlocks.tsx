import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Dot,
} from 'recharts';
import {
  LineChart as LineChartIcon,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Lightbulb,
  GitBranch,
} from 'lucide-react';
import Reveal from './Reveal';
import type { CashflowExtras, ScenarioTone } from '../data/types';

interface Props {
  c: CashflowExtras;
  accent: string;
}

const toneMeta: Record<ScenarioTone, { color: string; label: string }> = {
  base: { color: '#34d399', label: 'база' },
  up: { color: '#22d3ee', label: 'позитив' },
  stress: { color: '#f87171', label: 'стресс' },
};

/** График прогноза остатка ДС — рендерится до timeline. */
export function CashflowForecast({ c, accent }: Props) {
  const { weeks, bufferMin, unit } = c.forecast;
  const minBalance = Math.min(...weeks.map((w) => w.balance));
  const gapWeeks = weeks.filter((w) => w.balance < bufferMin).length;

  return (
    <div className="mt-12">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
        <LineChartIcon size={20} style={{ color: accent }} /> Прогноз остатка денежных средств (13 недель)
      </h3>
      <Reveal>
        <div className="glass p-5 sm:p-6">
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { label: `мин. остаток, ${unit}`, value: String(minBalance), warn: minBalance < bufferMin },
              { label: 'недель в разрыве', value: String(gapWeeks), warn: gapWeeks > 0 },
              { label: `буфер, ${unit}`, value: String(bufferMin), warn: false },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-white/10 bg-ink-950/40 px-4 py-3">
                <div className="text-2xl font-extrabold" style={{ color: k.warn ? '#f87171' : accent }}>
                  {k.value}
                </div>
                <div className="text-xs text-slate-400">{k.label}</div>
              </div>
            ))}
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeks} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={accent} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="label" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                  contentStyle={{
                    background: '#0a0e1a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    color: '#e2e8f0',
                    fontSize: 13,
                  }}
                  formatter={(v: number) => [`${v} ${unit}`, 'Остаток']}
                />
                <ReferenceLine
                  y={bufferMin}
                  stroke="#f87171"
                  strokeDasharray="5 4"
                  label={{ value: `буфер ${bufferMin}`, fill: '#f87171', fontSize: 11, position: 'insideTopRight' }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke={accent}
                  strokeWidth={2.5}
                  fill="url(#balanceFill)"
                  dot={(props) => {
                    const { cx, cy, payload, index } = props;
                    const below = payload.balance < bufferMin;
                    return (
                      <Dot
                        key={index}
                        cx={cx}
                        cy={cy}
                        r={below ? 5 : 3}
                        fill={below ? '#f87171' : accent}
                        stroke={below ? '#f87171' : accent}
                      />
                    );
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Красная пунктирная линия — минимальный буфер. Точки ниже буфера — кассовый разрыв.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/** Источники, притоки/оттоки, разрыв+рекомендации, сценарии — после timeline. */
export function CashflowDeepBlocks({ c, accent }: Props) {
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

      {/* inflows / outflows */}
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-accent-green/25 bg-accent-green/[0.06] p-5">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-accent-green">
              <ArrowUpRight size={18} /> Притоки
            </h4>
            <ul className="space-y-2.5">
              {c.inflows.map((f) => (
                <li key={f.label} className="text-sm">
                  <span className="font-medium text-white">{f.label}</span>
                  <span className="text-slate-400"> — {f.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-brand/25 bg-brand/[0.06] p-5">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-brand-soft">
              <ArrowDownRight size={18} /> Оттоки
            </h4>
            <ul className="space-y-2.5">
              {c.outflows.map((f) => (
                <li key={f.label} className="text-sm">
                  <span className="font-medium text-white">{f.label}</span>
                  <span className="text-slate-400"> — {f.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* gap + recommendations */}
      <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="flex h-full flex-col justify-center rounded-2xl border border-red-400/30 bg-red-400/[0.07] p-6">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-300">
              <AlertTriangle size={18} /> Кассовый разрыв
            </div>
            <div className="text-3xl font-extrabold text-white">{c.gap.amount}</div>
            <div className="mt-1 text-sm font-medium text-red-300">{c.gap.week}</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.gap.detail}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass h-full p-5">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
              <Lightbulb size={18} style={{ color: accent }} /> Рекомендации AI
            </h4>
            <ul className="space-y-2.5">
              {c.recommendations.map((r, i) => (
                <li key={r} className="flex gap-2 text-sm text-slate-300">
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: `${accent}22`, color: accent }}
                  >
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* scenarios */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <GitBranch size={20} style={{ color: accent }} /> Сценарии «что если»
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.scenarios.map((s, i) => {
            const m = toneMeta[s.tone];
            return (
              <Reveal key={s.name} delay={(i % 3) * 0.06}>
                <div
                  className="h-full rounded-2xl border p-5"
                  style={{ borderColor: `${m.color}33`, backgroundColor: `${m.color}0d` }}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="font-semibold text-white">{s.name}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: `${m.color}22`, color: m.color }}
                    >
                      {m.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">{s.effect}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
