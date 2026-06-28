import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Cpu, Droplet } from 'lucide-react';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div
        aria-hidden
        className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-brand/20 blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute -left-24 bottom-12 h-80 w-80 rounded-full bg-accent-cyan/15 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.span
          className="chip mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Droplet size={14} className="text-brand" /> Презентация · AI в нефтегазе
        </motion.span>

        <motion.h1
          className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          AI в <span className="gradient-text">Oil &amp; Gas</span>:
          <br />
          где это реально работает в России
        </motion.h1>

        <motion.p
          className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Три области применения AI/ML в нефтегазе — и почему «софт в офисе» даёт
          самый быстрый и реалистичный результат. Разбор, доменная экспертиза и три
          готовых юзкейса под российские реалии.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          <button
            onClick={() => document.getElementById('context')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-brand-soft"
          >
            Начать рассказ
            <ArrowDown size={18} className="transition group-hover:translate-y-0.5" />
          </button>
          <span className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Cpu size={16} /> для red_mad_robot · O&amp;G × AI/ML
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}
