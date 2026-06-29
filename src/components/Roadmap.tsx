import { motion } from 'framer-motion';
import { Rocket, Handshake, Globe, Mail } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';

const phases = [
  {
    n: '01',
    title: 'Выбрать первый юзкейс',
    text: 'Берём один из трёх (рекомендую - документы для решений: низкий риск, быстрый эффект) и фиксируем scope.',
  },
  {
    n: '02',
    title: 'Облачный MVP за 2,5–4 мес',
    text: 'Рабочий прототип на реальном процессе и данных заказчика. Я закрываю домен, RMR - AI/ML и инженерию.',
  },
  {
    n: '03',
    title: 'Пилот у нефтегазового заказчика',
    text: 'Демонстрация ценности на боевом процессе, сбор обратной связи, обоснование локальной имплементации.',
  },
  {
    n: '04',
    title: 'Масштабирование и тираж',
    text: 'Локальная имплементация в контуре заказчика и тиражирование на другие компании отрасли.',
  },
];

export default function Roadmap() {
  return (
    <Section
      id="cta"
      kicker="Следующий шаг"
      title="Давайте сделаем это вместе"
      intro="У red_mad_robot - AI/ML и продуктовая машина. У меня - нефтегазовый домен, реалистичная карта юзкейсов и доступ к отраслевому языку заказчика. Предлагаю собрать это в продуктовое направление."
    >
      <div className="grid gap-4 md:grid-cols-4">
        {phases.map((p, i) => (
          <motion.div
            key={p.n}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <span className="font-mono text-2xl font-bold text-brand/40">{p.n}</span>
            <h3 className="mt-2 font-bold text-white">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/[0.12] to-accent-violet/[0.08] p-8 text-center sm:p-12">
          <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/20 text-brand">
            <Handshake size={28} />
          </div>
          <h3 className="mx-auto max-w-2xl text-2xl font-extrabold text-white sm:text-3xl">
            Готов закрыть O&amp;G-экспертизу в вашей AI-команде
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Нефтегазовый домен, ML-бэкграунд и понимание, какие AI-продукты реально
            покупает отрасль в России. Обсудим, с чего начать?
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://artempotlog.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink-950 transition hover:bg-slate-200"
            >
              <Globe size={18} /> artempotlog.com
            </a>
            <a
              href="mailto:artem.potlog@yandex.ru"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <Mail size={18} /> Связаться
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-slate-400">
              <Rocket size={16} className="text-brand" /> старт - за один созвон
            </span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
