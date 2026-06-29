import { ShoppingCart, FileText, Banknote, TrendingUp } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';

const picks = [
  {
    icon: ShoppingCart,
    title: 'Закупки услуг',
    why: 'Понятная боль и деньги, процесс жёстко регламентирован (223-ФЗ/ЕИС) - значит, автоматизируем по чётким правилам.',
    accent: '#ff4d2e',
  },
  {
    icon: FileText,
    title: 'Регуляторная отчётность',
    why: 'Ворох обязательных форм с жёсткими дедлайнами и штрафами. Чистая работа с данными и текстом - профиль AI/ML-команды, быстрый видимый эффект.',
    accent: '#a78bfa',
  },
  {
    icon: Banknote,
    title: 'Контроль оплат (инвойсы)',
    why: 'Когнитивный кост-инженер сверяет договор, факт и счёт. AI окупается на пойманных завышенных объёмах, ставках и дублях оплат.',
    accent: '#34d399',
  },
  {
    icon: TrendingUp,
    title: 'Когнитивный БДДС',
    why: 'Релевантная для РФ идея сверх каталога: прогноз ликвидности для малого оператора. Кассовый разрыв виден за недели и закрывается дёшево.',
    accent: '#fbbf24',
  },
];

export default function WhyThree() {
  return (
    <Section
      id="why-three"
      kicker="4 кейса для малого РФ-оператора"
      title="Почему именно эти четыре для России"
      intro="Из девяти сценариев каталога я выбираю три, где совпадают реальная боль и деньги, понятные регламенты для автоматизации и близость к компетенциям AI/ML-команды, и добавляю четвёртую, релевантную для российского малого оператора идею (когнитивный БДДС). Дальше разворачиваю каждую под российские реалии."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
