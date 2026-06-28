import type { SourceLink } from './types';

export const sources: SourceLink[] = [
  {
    label: 'well-log-facies-prediction',
    url: 'https://github.com/artem-potlog/well-log-facies-prediction',
    note: 'Моя работа: ML-классификация фаций по каротажу с оценкой неопределённости (данные Volve).',
    kind: 'repo',
  },
  {
    label: 'GeoDataScience Group, Heriot-Watt University',
    url: 'https://geodatascience.hw.ac.uk/',
    note: 'Лаборатория, с которой я аффилирован: history matching + GAN, авто-мониторинг скважин, метан со спутников.',
    kind: 'lab',
  },
  {
    label: 'abc-ai-usecases',
    url: 'https://github.com/artem-potlog/abc-ai-usecases',
    note: 'Исходные 9 юзкейсов AI-агентов для нефтегазовой компании (обезличено: «ABC company»).',
    kind: 'repo',
  },
  {
    label: 'red_mad_robot ai',
    url: 'https://redmadrobot.ai/',
    note: 'Заказчик: AI/ML-компетенции и R&D-лаборатория. O&G-домен и доступ к рынку — мой вклад.',
    kind: 'client',
  },
  {
    label: 'Газпром нефть — Implementation of AI in Upstream (2019)',
    note: 'Источник скриншотов области 2: GeoMate, ЭРА:ГРАД, ИСКРА, литология при бурении, history matching, суррогатные модели, CYBERFRAC, ИИ-анализ ГДИС, цифровой керн.',
    kind: 'internal',
  },
  {
    label: 'Nedra Digital — About & Cases',
    note: 'Центр управления бурением и геологоразведкой, ИИ-ассистент Upstream, цифровые двойники, data-driven решения.',
    kind: 'internal',
  },
  {
    label: 'Отраслевые материалы (внутренние)',
    note: 'Прочие российские продукты нефтегаза: ДАРС, СПИН, iMars, геонавигация, PEBI-сетки, виртуальный химик, видеоаналитика (Bimar).',
    kind: 'internal',
  },
];

export const aiDisclosure =
  'Прозрачность: сайт собран с помощью AI-инструментов. Контент, доменная экспертиза, выбор направления и оценки — мои; вёрстка и тексты доработаны итеративно. Скриншоты в области 2 — из материалов Газпром нефти и Nedra Digital, приведены как иллюстрации реальной отраслевой практики.';
