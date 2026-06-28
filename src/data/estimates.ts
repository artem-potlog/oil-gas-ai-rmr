import type { EstimateRow } from './types';

export const estimateAssumptions: string[] = [
  'Команда MVP: PM, 2 AI/ML-инженера, backend, frontend, доменный эксперт (part-time) — 5–6 FTE.',
  'Blended-ставка ~250–400 тыс ₽/мес на специалиста (РФ, 2026).',
  'Облачный MVP — на российском облаке (Yandex Cloud / VK Cloud), без закупки железа.',
  'Локальная имплементация включает GPU-серверы под on-prem LLM, интеграции с 1С/ЕИС/банком, ИБ и аттестацию контура, ОПР.',
];

export const estimateDisclaimer =
  'Оценочно. Это экспертные диапазоны для калибровки ожиданий, а не коммерческое предложение. Точная оценка — после фиксации scope и доступа к системам заказчика.';

export const estimates: EstimateRow[] = [
  {
    useCaseId: 'procurement',
    title: 'Закупки услуг',
    cloud: {
      months: '3–4 мес',
      cost: '6–9 млн ₽',
      note: 'Один процесс закупки, чтение ЕИС, демо на реальной документации, AI-ревью договоров.',
    },
    onPrem: {
      months: '9–14 мес',
      cost: '25–45 млн ₽',
      note: 'Интеграции 1С:ERP/ЕИС/ЭДО/СПАРК, закрытый контур, ИБ, дообучение на корп. данных, ОПР.',
    },
  },
  {
    useCaseId: 'decision-docs',
    title: 'Документы для решений',
    cloud: {
      months: '2,5–4 мес',
      cost: '5–8 млн ₽',
      note: 'RAG по шаблонам, один тип документа, LLM по API (YandexGPT/GigaChat), проверка ссылок.',
    },
    onPrem: {
      months: '8–12 мес',
      cost: '20–40 млн ₽',
      note: 'On-prem LLM + GPU-серверы, закрытый контур, интеграция 1С:Документооборот, КЭП, дообучение.',
    },
  },
  {
    useCaseId: 'cash-calls',
    title: 'Cash Calls',
    cloud: {
      months: '3–5 мес',
      cost: '7–11 млн ₽',
      note: 'Модель детекта аномалий/фрода, демо на синтетике, mock-интеграции с ERP/банком.',
    },
    onPrem: {
      months: '10–16 мес',
      cost: '30–55 млн ₽',
      note: 'Интеграция 1С:ERP/Казначейство/банк-клиент, валютный контроль, ИБ, продуктивизация antifraud.',
    },
  },
];
