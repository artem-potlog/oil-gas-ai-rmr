import { ShoppingCart, FileText, Banknote } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';

const picks = [
  {
    icon: ShoppingCart,
    title: 'Закупки услуг',
    why: 'Понятная боль и деньги, процесс жёстко регламентирован (223-ФЗ/ЕИС) — значит, автоматизируем по чётким правилам.',
    accent: '#ff4d2e',
  },
  {
    icon: FileText,
    title: 'Регуляторная отчётность',
    why: 'Ворох обязательных форм с жёсткими дедлайнами и штрафами. Чистая работа с данными и текстом — профиль AI/ML-команды, быстрый видимый эффект.',
    accent: '#a78bfa',
  },
  {
    icon: Banknote,
    title: 'Cash Calls',
    why: 'Ручной, рискованный процесс с реальным фродом. AI окупается на одном предотвращённом мошенническом платеже.',
    accent: '#34d399',
  },
];

export default function WhyThree() {
  return (
    <Section
      id="why-three"
      kicker="Фокус"
      title="Почему именно эти три для России"
      intro="Из девяти сценариев я выбираю три, где совпадают три условия: реальная боль и деньги, понятные регламенты для автоматизации и максимальная близость к компетенциям AI/ML-команды. Дальше разворачиваю каждый под российские реалии."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {picks.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div className="glass h-full p-6">
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${p.accent}22`, color: p.accent }}
              >
                <p.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.why}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
