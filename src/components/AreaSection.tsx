import { motion } from 'framer-motion';
import { Check, X, ExternalLink, Sparkles, AlertTriangle } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import type { AreaData } from '../data/types';

interface AreaSectionProps {
  area: AreaData;
  image?: { src: string; caption: string };
}

export default function AreaSection({ area, image }: AreaSectionProps) {
  return (
    <Section
      id={`area-${area.id}`}
      kicker={`${area.kicker} · ${area.subtitle}`}
      title={
        <span className="inline-flex flex-wrap items-center gap-3">
          {area.title}
          {area.recommended && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-sm font-bold text-white align-middle">
              <Sparkles size={14} /> рекомендую
            </span>
          )}
        </span>
      }
      intro={area.description}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          {area.examples.map((ex, i) => (
            <Reveal key={ex.title} delay={i * 0.06}>
              <div className="glass p-5 transition hover:border-white/20">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold"
                    style={{ backgroundColor: `${area.accent}22`, color: area.accent }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">{ex.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{ex.detail}</p>
                    {ex.source &&
                      (ex.sourceUrl ? (
                        <a
                          href={ex.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-brand-soft"
                        >
                          {ex.source} <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="mt-2 inline-block text-xs font-medium text-slate-500">
                          {ex.source}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="space-y-5">
          {image && (
            <Reveal>
              <figure className="glass overflow-hidden p-2">
                <img
                  src={image.src}
                  alt={image.caption}
                  className="h-52 w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <figcaption className="px-2 py-2 text-xs text-slate-500">{image.caption}</figcaption>
              </figure>
            </Reveal>
          )}

          {area.pros && (
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-accent-green/25 bg-accent-green/[0.06] p-5">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-accent-green">
                  <Check size={18} /> Плюсы
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {area.pros.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check size={15} className="mt-0.5 shrink-0 text-accent-green" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-300">
                <X size={18} className="text-brand" /> Минусы / барьеры
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {area.cons.map((c) => (
                  <li key={c} className="flex gap-2">
                    <X size={15} className="mt-0.5 shrink-0 text-brand" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              className="flex items-start gap-3 rounded-2xl border p-5"
              style={{
                borderColor: `${area.accent}40`,
                backgroundColor: `${area.accent}10`,
              }}
            >
              <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: area.accent }} />
              <p className="text-sm font-medium text-slate-200">{area.verdict}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <motion.div
        className="mt-12 h-px w-full origin-left"
        style={{ background: `linear-gradient(90deg, ${area.accent}, transparent)` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </Section>
  );
}
