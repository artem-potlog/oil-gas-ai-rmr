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
    label: 'Отраслевые материалы (внутренние)',
    note: 'Российские цифровые продукты нефтегаза: ЭРА, Nedra Digital, геонавигация, поиск аналогов (iMars), оптимизация ГРП, PEBI-сетки, видеоаналитика.',
    kind: 'internal',
  },
];

export const aiDisclosure =
  'Прозрачность: сайт собран с помощью AI-инструментов. Контент, доменная экспертиза, выбор направления и оценки — мои; верстка и тексты доработаны итеративно.';
