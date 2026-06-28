import { motion } from 'framer-motion';
import { ArrowRight, Clock, ScrollText, Scale, Layers3, Minus, Plus } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import { ErpDiagram, ProcurementDeepBlocks } from './ProcurementBlocks';
import { RegulatoryCalendar, RegulatoryDeepBlocks } from './RegulatoryBlocks';
import { MatchDiagram, CostEngineerDeepBlocks } from './CostEngineerBlocks';
import type { DeepDive } from '../data/types';

export default function DeepDiveSection({ dd }: { dd: DeepDive }) {
  return (
    <Section
      id={dd.id}
      kicker={`${dd.badge} · ${dd.domain}`}
      title={dd.title}
      intro={dd.summary}
    >
      {/* before / after */}
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
              <Minus size={16} className="text-slate-500" /> Как сейчас
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{dd.oldWorld}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            className="h-full rounded-2xl border p-6"
            style={{ borderColor: `${dd.accent}40`, backgroundColor: `${dd.accent}0f` }}
          >
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: dd.accent }}>
              <Plus size={16} /> Как с AI
            </div>
            <p className="text-sm leading-relaxed text-slate-200">{dd.newWorld}</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div
          className="mt-4 rounded-2xl border px-5 py-4 text-center text-sm font-semibold text-white"
          style={{ borderColor: `${dd.accent}40`, backgroundColor: `${dd.accent}14` }}
        >
          {dd.businessValue}
        </div>
      </Reveal>

      {/* AI поверх 1С:ERP (только для Procurement) */}
      {dd.procurement && <ErpDiagram p={dd.procurement} accent={dd.accent} />}

      {/* Календарь-дашборд (только для регуляторной отчётности) */}
      {dd.regulatory && <RegulatoryCalendar r={dd.regulatory} accent={dd.accent} />}

      {/* Диаграмма сверки (только для инвойсов / кост-инженера) */}
      {dd.costEngineer && <MatchDiagram c={dd.costEngineer} accent={dd.accent} />}

      {/* workflow timeline */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <ScrollText size={20} style={{ color: dd.accent }} /> Как работает агент — по шагам
        </h3>
        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10 md:left-[23px]" />
          <div className="space-y-4">
            {dd.workflow.map((step, i) => (
              <motion.div
                key={step.id}
                className="relative pl-12 md:pl-16"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <span
                  className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border text-lg md:h-12 md:w-12"
                  style={{
                    borderColor: `${dd.accent}55`,
                    backgroundColor: '#0a0e1a',
                  }}
                >
                  {step.toolLogo}
                </span>
                <div className="glass p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-semibold text-white">
                      <span className="mr-2 font-mono text-xs" style={{ color: dd.accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {step.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={12} /> {step.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium" style={{ color: dd.accent }}>
                    {step.tool}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
                  <div className="mt-3 grid gap-2 rounded-xl border border-white/10 bg-ink-950/50 p-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-600">Вход</span>
                      <p className="text-xs text-slate-300">{step.input}</p>
                    </div>
                    <ArrowRight size={16} className="hidden shrink-0 text-slate-600 sm:block" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-600">Результат</span>
                      <p className="text-xs font-medium text-slate-100">{step.output}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* should-cost / RAG / скоринг / Ariba-паритет / живые примеры (только для Procurement) */}
      {dd.procurement && <ProcurementDeepBlocks p={dd.procurement} accent={dd.accent} />}

      {/* источники / RAG-extract / конвейер (только для регуляторной отчётности) */}
      {dd.regulatory && <RegulatoryDeepBlocks r={dd.regulatory} accent={dd.accent} />}

      {/* источники / чек-лист / реестр (только для инвойсов / кост-инженера) */}
      {dd.costEngineer && <CostEngineerDeepBlocks c={dd.costEngineer} accent={dd.accent} />}

      {/* ru realities */}
      <div className="mt-12">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
          <Scale size={20} style={{ color: dd.accent }} /> Российские реалии
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {dd.ruRealities.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="flex h-full gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span
                  className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: dd.accent }}
                />
                <div>
                  <h4 className="font-semibold text-white">{r.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{r.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* stack */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300">
            <Layers3 size={16} style={{ color: dd.accent }} /> Стек:
          </span>
          {dd.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
    </Section>
  );
}
