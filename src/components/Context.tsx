import { motion } from 'framer-motion';
import { Brain, Layers, Plus, ArrowRight, Github, GraduationCap } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';

export default function Context() {
  return (
    <Section
      id="context"
      kicker="Контекст"
      title={<>У вас есть AI/ML. У меня — нефтегаз. Вместе это рынок.</>}
      intro="red_mad_robot — сильная AI/ML-команда с собственной R&D-лабораторией, но без индустриального опыта в нефтегазе и доступа к отраслевому рынку. Это ровно тот разрыв, который закрываю я."
    >
      <div className="grid items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
        <Reveal>
          <div className="glass h-full p-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-violet/15 text-accent-violet">
              <Brain size={22} />
            </div>
            <h3 className="text-xl font-bold text-white">red_mad_robot</h3>
            <p className="mt-1 text-sm font-medium text-accent-violet">AI/ML · R&amp;D · продукт</p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-400">
              <li>· GenAI-продукты и AI-консалтинг</li>
              <li>· Собственная R&amp;D-лаборатория</li>
              <li>· Инженерия данных и MLOps</li>
              <li>· Опыт запуска бизнесов</li>
            </ul>
            <p className="mt-5 text-sm text-slate-500">Чего не хватает: O&amp;G-домен, регламенты отрасли, доступ к заказчику.</p>
          </div>
        </Reveal>

        <div className="flex items-center justify-center">
          <motion.div
            className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-brand"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <Plus size={24} />
          </motion.div>
        </div>

        <Reveal delay={0.1}>
          <div className="glass h-full p-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Layers size={22} />
            </div>
            <h3 className="text-xl font-bold text-white">Я — O&amp;G-эксперт</h3>
            <p className="mt-1 text-sm font-medium text-brand">геонауки · ML · процессы отрасли</p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-400">
              <li>· Понимание процессов нефтегаза изнутри</li>
              <li>· ML в геофизике/петрофизике (фации)</li>
              <li>· Аффилиация с GeoDataScience HWU</li>
              <li>· Карта реалистичных юзкейсов под РФ</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://github.com/artem-potlog/well-log-facies-prediction"
                target="_blank"
                rel="noreferrer"
                className="chip transition hover:border-brand/40 hover:text-white"
              >
                <Github size={13} /> facies-prediction
              </a>
              <a
                href="https://geodatascience.hw.ac.uk/"
                target="_blank"
                rel="noreferrer"
                className="chip transition hover:border-brand/40 hover:text-white"
              >
                <GraduationCap size={13} /> GeoDataScience HWU
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-5 flex items-center justify-center gap-3 rounded-2xl border border-brand/20 bg-brand/[0.06] p-5 text-center">
          <span className="text-base font-semibold text-white sm:text-lg">AI/ML</span>
          <Plus size={16} className="text-slate-500" />
          <span className="text-base font-semibold text-white sm:text-lg">O&amp;G-домен</span>
          <ArrowRight size={18} className="text-brand" />
          <span className="text-base font-semibold text-brand sm:text-lg">продукты, которые покупают</span>
        </div>
      </Reveal>
    </Section>
  );
}
