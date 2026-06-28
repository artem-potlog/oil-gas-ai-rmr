import type { UseCaseCard } from './types';

// 9 юзкейсов AI-агентов для крупной нефтегазовой компании (обезличено: «ABC company»).
// Три выделенных — то, что я считаю наиболее жизнеспособным в РФ.
export const useCases: UseCaseCard[] = [
  {
    id: 'UC-01',
    title: 'Анализ рынка и спроса',
    domain: 'Стратегия',
    deployment: 'Частное облако',
    riskLevel: 'Средний',
    description:
      'AI-агенты непрерывно агрегируют рыночные данные (цены, баланс спроса/предложения, макро), строят прогнозы и собирают пакет допущений для инвесткомитета — вместо 40+ часов ручной работы аналитика за цикл.',
    businessValue: 'Пакет допущений за 4 часа вместо 3 дней.',
    timeSaved: '~40 ч/цикл',
    tools: ['Market data API', 'RAG', 'LLM', 'Data fabric'],
    highlighted: false,
  },
  {
    id: 'UC-02',
    title: 'Разведка конкурентов и партнёров',
    domain: 'Стратегия',
    deployment: 'On-prem / частное облако',
    riskLevel: 'Высокий',
    description:
      'AI строит «живой» граф знаний по 200+ конкурентам, отслеживает M&A-сигналы за 6–18 месяцев до анонса и автоматически проверяет потенциальных партнёров на комплаенс.',
    businessValue: 'Онбординг партнёра: 2 недели → 2 дня.',
    timeSaved: '~60 ч/мес',
    tools: ['Knowledge graph', 'Entity search', 'KYC/AML'],
    highlighted: false,
  },
  {
    id: 'UC-03',
    title: 'Финансовый анализ компаний и активов',
    domain: 'Финансы',
    deployment: 'Частное облако',
    riskLevel: 'Низкий–средний',
    description:
      'AI автоматизирует оценку активов (NAV, DCF, запасы), собирает финансовый пакет для инвесткомитета из разных источников и даёт семантический поиск по историческим моделям сделок.',
    businessValue: 'Финансовый пакет: часы вместо 3–5 дней.',
    timeSaved: '~3 дня/сделка',
    tools: ['Valuation models', 'LLM', 'Semantic search'],
    highlighted: false,
  },
  {
    id: 'UC-04',
    title: 'Поиск сделок (Deal Origination)',
    domain: 'Корп. развитие',
    deployment: 'Изолированное облако',
    riskLevel: 'Критический',
    description:
      'AI-скрининг M&A находит возможности за 6–18 месяцев, ранжирует сделки по стратегическому соответствию, наполняет CRM и готовит скрининговые ноты для комитета.',
    businessValue: 'Удвоение пропускной способности пайплайна BD.',
    timeSaved: '~80 ч/сделка',
    tools: ['Deal screening', 'CRM agents', 'LLM'],
    highlighted: false,
  },
  {
    id: 'UC-05',
    title: 'Медиамониторинг',
    domain: 'Коммуникации / риски',
    deployment: 'SaaS',
    riskLevel: 'Низкий',
    description:
      'AI следит за тысячами медиаисточников на разных языках, авто-триажит по критичности, формирует кризисные брифы за минуты и отслеживает ESG-нарративы.',
    businessValue: 'Реакция на кризис: часы → минуты.',
    timeSaved: '~20 ч/нед',
    tools: ['Media monitoring', 'NLP', 'Orchestration'],
    highlighted: false,
  },
  {
    id: 'UC-06',
    title: 'Генерация документов для принятия решений',
    domain: 'Корп. секретариат / governance',
    deployment: 'Частный VNet',
    riskLevel: 'Низкий–средний',
    description:
      'AI собирает инвест-меморандумы, материалы совета директоров и governance-документы из шаблонов: первый черновик за 4–8 часов вместо 3–5 дней, с авто-проверкой полноты и непротиворечивости.',
    businessValue: '−70% времени подготовки документа. Полная прослеживаемость источников.',
    timeSaved: '3–5 дней/документ',
    tools: ['LLM (on-prem)', 'Copilot Studio', 'Doc review AI'],
    highlighted: true,
  },
  {
    id: 'UC-07',
    title: 'Финансы — Cash Calls в совместных предприятиях',
    domain: 'Казначейство',
    deployment: 'On-prem (ERP)',
    riskLevel: 'Средний',
    description:
      'AI сверяет cash calls с бюджетом/AFE, ловит аномалии и мошенничество (BEC), оптимизирует время платежа и автоматизирует полный цикл «согласование → платёж → разноска» со скринингом контрагента.',
    businessValue: 'Обработка: 5 дней → день. Аномалии/дубли ловятся до платежа.',
    timeSaved: '~5 дней/цикл',
    tools: ['ERP + AI', 'Anomaly detection', 'Orchestration'],
    highlighted: true,
  },
  {
    id: 'UC-08',
    title: 'Закупки услуг под ключ (Source-to-Pay)',
    domain: 'Снабжение (SCM)',
    deployment: 'Облако',
    riskLevel: 'Высокий',
    description:
      'AI автоматизирует Source-to-Pay: генерацию закупочной документации, анализ предложений, проверку требований к локализации, скоринг рисков договорных условий и управление жизненным циклом поставщика.',
    businessValue: 'Цикл закупки: 6 недель → 10 дней. Матрица сравнения — без ручной работы.',
    timeSaved: '~30 дней/крупная закупка',
    tools: ['Procurement AI', 'Should-cost', 'Contract review AI'],
    highlighted: true,
  },
  {
    id: 'UC-09',
    title: 'Стейкхолдер-аналитика (GR)',
    domain: 'Корп. развитие / GR',
    deployment: 'Частное облако',
    riskLevel: 'Очень высокий',
    description:
      'AI строит и поддерживает «живую» карту влияния стейкхолдеров по всем юрисдикциям (госорганы, регуляторы, НКО) с трекингом контактов и антикоррупционным комплаенсом.',
    businessValue: 'Контекст по стейкхолдерам в реальном времени перед каждой встречей.',
    timeSaved: '~15 ч/нед',
    tools: ['Stakeholder graph', 'NLP', 'PEP/AML'],
    highlighted: false,
  },
];
