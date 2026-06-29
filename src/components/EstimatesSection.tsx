import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { Cloud, Server, Info, Clock, Wallet, Calculator, ExternalLink, PieChart as PieIcon } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import { estimates, estimateAssumptions, tokenLogic, cloudLogic, mvpBreakdown } from '../data/estimates';
import type { CostLogic } from '../data/types';

const breakdownColors = { team: '#a78bfa', tokens: '#22d3ee', cloud: '#34d399' };

function MvpDonut() {
  const [sel, setSel] = useState(0);
  const p = mvpBreakdown[sel];
  const total = p.team + p.tokens + p.cloud;
  const data = [
    { name: 'Команда', value: p.team, color: breakdownColors.team },
    { name: 'AI-токены', value: p.tokens, color: breakdownColors.tokens },
    { name: 'Облако', value: p.cloud, color: breakdownColors.cloud },
  ];
  const fmt = (v: number) => `${v.toFixed(2).replace('.', ',')} млн ₽`;

  return (
    <div className="glass p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {mvpBreakdown.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setSel(i)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              i === sel
                ? 'bg-accent-cyan text-ink-950'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <div className="relative h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={68}
                outerRadius={100}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0a0e1a',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  color: '#e2e8f0',
                  fontSize: 13,
                }}
                formatter={(v: number) => [fmt(v), '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[11px] uppercase tracking-wider text-slate-500">итого MVP</span>
            <span className="text-2xl font-extrabold text-white">≈ {fmt(total)}</span>
          </div>
        </div>

        <ul className="space-y-2.5">
          {data.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-3 text-sm">
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
              <span className="text-white">
                <span className="font-semibold">{fmt(d.value)}</span>
                <span className="ml-2 text-xs text-slate-500">{Math.round((d.value / total) * 100)}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Общая сумма MVP = фонд команды (≈3 млн ₽/мес × срок) + AI-токены + облако. Команда даёт основную долю;
        токены и облако - малая часть (детализация ниже).
      </p>
    </div>
  );
}

const chartData = [
  { name: 'Закупки', Облако: 11.5, Локально: 35 },
  { name: 'Отчётность', Облако: 10.5, Локально: 32 },
  { name: 'Акты/счета', Облако: 11.5, Локально: 35 },
  { name: 'БДДС', Облако: 11.5, Локально: 35 },
];

function LogicCard({ logic }: { logic: CostLogic }) {
  return (
    <div className="glass h-full p-5">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
        <Calculator size={16} className="text-accent-cyan" /> {logic.title}
      </h4>
      <ul className="space-y-2 text-xs leading-relaxed text-slate-400">
        {logic.steps.map((s) => (
          <li key={s} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-xl border border-accent-cyan/25 bg-accent-cyan/[0.06] px-3 py-2 text-sm font-semibold text-white">
        {logic.total}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {logic.links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="chip transition hover:border-accent-cyan/40 hover:text-white"
          >
            {l.label} <ExternalLink size={11} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function EstimatesSection() {
  return (
    <Section
      id="estimates"
      kicker="Бюджет MVP · сроки"
      title="Сколько стоит и сколько идёт"
      intro="Грубая калибровка по каждому из четырёх юзкейсов: облачный MVP против полной локальной имплементации «в железе». Цифры - оценочные диапазоны в рублях."
    >
      <Reveal>
        <div className="glass p-5 sm:p-6">
          <h3 className="mb-4 text-sm font-semibold text-slate-300">
            Ориентировочная стоимость, млн ₽ (середина диапазона)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  contentStyle={{
                    background: '#0a0e1a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    color: '#e2e8f0',
                    fontSize: 13,
                  }}
                  formatter={(v: number) => [`${v} млн ₽`, '']}
                />
                <Legend wrapperStyle={{ fontSize: 13, color: '#94a3b8' }} />
                <Bar dataKey="Облако" radius={[6, 6, 0, 0]} fill="#22d3ee">
                  {chartData.map((_, i) => (
                    <Cell key={i} fill="#22d3ee" />
                  ))}
                </Bar>
                <Bar dataKey="Локально" radius={[6, 6, 0, 0]} fill="#ff4d2e">
                  {chartData.map((_, i) => (
                    <Cell key={i} fill="#ff4d2e" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Reveal>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {estimates.map((e, i) => (
          <Reveal key={e.useCaseId} delay={i * 0.08}>
            <div className="glass h-full p-5">
              <h3 className="text-lg font-bold text-white">{e.title}</h3>

              <div className="mt-4 rounded-xl border border-accent-cyan/25 bg-accent-cyan/[0.06] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent-cyan">
                  <Cloud size={16} /> Облачный MVP
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-white">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} className="text-slate-500" /> {e.cloud.months}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Wallet size={13} className="text-slate-500" /> {e.cloud.cost}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{e.cloud.note}</p>
                <p className="mt-2 border-t border-accent-cyan/15 pt-2 text-[11px] leading-relaxed text-accent-cyan/80">
                  в т.ч. AI-токены (Cursor · Opus 4.8) {e.cloud.infra.tokens} · облако (Selectel/Yandex){' '}
                  {e.cloud.infra.cloud}
                </p>
              </div>

              <div className="mt-3 rounded-xl border border-brand/25 bg-brand/[0.06] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-soft">
                  <Server size={16} /> Локально «в железе»
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-white">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} className="text-slate-500" /> {e.onPrem.months}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Wallet size={13} className="text-slate-500" /> {e.onPrem.cost}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{e.onPrem.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <h3 className="mb-4 mt-10 flex items-center gap-2 text-lg font-bold text-white">
          <PieIcon size={20} className="text-accent-cyan" /> Из чего складывается бюджет MVP
        </h3>
        <MvpDonut />
      </Reveal>

      <Reveal delay={0.1}>
        <h3 className="mb-4 mt-10 flex items-center gap-2 text-lg font-bold text-white">
          <Calculator size={20} className="text-accent-cyan" /> Как считаем токены и облако
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <LogicCard logic={tokenLogic} />
          <LogicCard logic={cloudLogic} />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Info size={16} className="text-brand" /> Допущения оценки
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {estimateAssumptions.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
