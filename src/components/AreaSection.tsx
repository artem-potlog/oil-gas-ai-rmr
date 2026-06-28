import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ExternalLink, Sparkles, AlertTriangle, Image as ImageIcon, ZoomIn } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import type { AreaData, GalleryImage } from '../data/types';

interface AreaSectionProps {
  area: AreaData;
}

export default function AreaSection({ area }: AreaSectionProps) {
  const [active, setActive] = useState<GalleryImage | null>(null);

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
            <Reveal key={ex.title} delay={i * 0.04}>
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

      {area.gallery && area.gallery.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
            <ImageIcon size={20} style={{ color: area.accent }} /> Примеры и скриншоты
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {area.gallery.map((img, i) => (
              <motion.button
                key={img.src}
                onClick={() => setActive(img)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-white/25"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              >
                <div className="relative aspect-video overflow-hidden bg-ink-900">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink-950/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                    <ZoomIn size={16} />
                  </span>
                  {img.credit && (
                    <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-2 py-0.5 text-[10px] font-medium text-slate-200 backdrop-blur">
                      {img.credit}
                    </span>
                  )}
                </div>
                <p className="p-4 text-sm leading-relaxed text-slate-300">{img.caption}</p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-ink-900"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink-950/80 text-white transition hover:bg-brand"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>
              <img src={active.src} alt={active.caption} className="max-h-[72vh] w-full object-contain" />
              <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
                <p className="text-sm text-slate-300">{active.caption}</p>
                {active.credit && (
                  <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400">
                    {active.credit}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
