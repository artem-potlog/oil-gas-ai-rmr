export type RiskLevel =
  | 'Низкий'
  | 'Низкий–средний'
  | 'Средний'
  | 'Высокий'
  | 'Очень высокий'
  | 'Критический';

export interface Example {
  title: string;
  detail: string;
  source?: string;
  sourceUrl?: string;
}

export interface GalleryImage {
  src: string;
  caption: string;
  credit?: string;
}

export interface AreaData {
  id: 'field' | 'office-hard' | 'office-soft';
  index: number;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  examples: Example[];
  gallery?: GalleryImage[];
  cons: string[];
  pros?: string[];
  verdict: string;
  recommended: boolean;
  accent: string;
}

export interface UseCaseCard {
  id: string;
  title: string;
  domain: string;
  deployment: string;
  riskLevel: RiskLevel;
  description: string;
  businessValue: string;
  timeSaved: string;
  tools: string[];
  highlighted: boolean;
}

export interface WorkflowStep {
  id: string;
  title: string;
  tool: string;
  toolLogo: string;
  description: string;
  input: string;
  output: string;
  duration: string;
}

export interface RuReality {
  title: string;
  detail: string;
}

export interface DeepDive {
  id: string;
  badge: string;
  title: string;
  domain: string;
  accent: string;
  summary: string;
  oldWorld: string;
  newWorld: string;
  businessValue: string;
  workflow: WorkflowStep[];
  ruRealities: RuReality[];
  stack: string[];
}

export interface EstimateRow {
  useCaseId: string;
  title: string;
  cloud: {
    months: string;
    cost: string;
    note: string;
  };
  onPrem: {
    months: string;
    cost: string;
    note: string;
  };
}

export interface SourceLink {
  label: string;
  url?: string;
  note: string;
  kind: 'repo' | 'lab' | 'doc' | 'client' | 'internal';
}
