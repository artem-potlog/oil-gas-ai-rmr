import { ExternalLink, Github, GraduationCap, Building2, FileText, Sparkles } from 'lucide-react';
import { sources, aiDisclosure } from '../data/sources';

const kindIcon = {
  repo: Github,
  lab: GraduationCap,
  client: Building2,
  doc: FileText,
  internal: FileText,
} as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-500">
          Источники и материалы
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((s) => {
            const Icon = kindIcon[s.kind];
            const inner = (
              <div className="flex h-full gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20">
                <Icon size={18} className="mt-0.5 shrink-0 text-brand" />
                <div>
                  <div className="flex items-center gap-1 font-medium text-white">
                    {s.label}
                    {s.url && <ExternalLink size={12} className="text-slate-500" />}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{s.note}</p>
                </div>
              </div>
            );
            return s.url ? (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={s.label}>{inner}</div>
            );
          })}
        </div>

        <div className="mt-8 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-slate-500">
          <Sparkles size={14} className="mt-0.5 shrink-0 text-accent-violet" />
          <p>{aiDisclosure}</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-600 sm:flex-row">
          <span>© {new Date().getFullYear()} · AI в Oil &amp; Gas · подготовлено для red_mad_robot</span>
          <span>Артём · O&amp;G × AI/ML</span>
        </div>
      </div>
    </footer>
  );
}
