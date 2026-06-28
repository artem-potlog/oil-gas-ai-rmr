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

export interface DataSource {
  name: string;
  gives: string;
  tag?: string;
}

export interface RagDoc {
  name: string;
  note: string;
}

export interface ScoringCriterion {
  label: string;
  weight: number;
  agent: string;
}

export interface ScoredBid {
  vendor: string;
  scores: number[];
  total: number;
  verdict: string;
  flagged?: boolean;
}

export interface AgentRole {
  name: string;
  role: string;
}

export interface ParityItem {
  ariba: string;
  ours: string;
}

export interface LiveExample {
  name: string;
  note: string;
  url?: string;
}

export interface ProcurementExtras {
  erp: { record: string[]; ai: string[]; note: string };
  dataSources: DataSource[];
  shouldCostBand: { min: string; base: string; max: string; unit: string };
  ragCorpus: RagDoc[];
  scoring: {
    criteria: ScoringCriterion[];
    agents: AgentRole[];
    sampleBids: { columns: string[]; rows: ScoredBid[] };
  };
  aribaParity: ParityItem[];
  liveExamples: LiveExample[];
}

export type RegDocStatus = 'draft' | 'review' | 'ready' | 'submitted' | 'overdue';

export interface RegDoc {
  name: string;
  regulator: string;
  frequency: string;
  deadline: string;
  status: RegDocStatus;
}

export interface RegSource {
  name: string;
  gives: string;
  tag?: string;
}

export interface ExtractItem {
  field: string;
  value: string;
  source: string;
}

export interface RegulatoryExtras {
  sources: RegSource[];
  calendar: RegDoc[];
  pipeline: string[];
  extractSample: ExtractItem[];
}

export type InvoiceCheckStatus = 'pass' | 'flag' | 'info';

export interface InvoiceCheck {
  label: string;
  status: InvoiceCheckStatus;
  detail: string;
}

export interface InvoiceLine {
  item: string;
  claimed: string;
  confirmed: string;
  toPay: string;
  flag?: boolean;
}

export type RegisterStatus = 'to_pay' | 'review' | 'held' | 'paid';

export interface RegisterItem {
  name: string;
  amount: string;
  status: RegisterStatus;
}

export interface CostEngineerExtras {
  match: { contract: string[]; actuals: string[]; invoice: string[]; note: string };
  sources: DataSource[];
  checks: InvoiceCheck[];
  invoiceLines: { columns: string[]; rows: InvoiceLine[] };
  register: RegisterItem[];
  liveExamples: LiveExample[];
}

export interface CashWeek {
  label: string;
  balance: number;
  inflow?: number;
  outflow?: number;
}

export interface FlowItem {
  label: string;
  note: string;
}

export type ScenarioTone = 'base' | 'up' | 'stress';

export interface CashScenario {
  name: string;
  effect: string;
  tone: ScenarioTone;
}

export interface CashflowExtras {
  sources: DataSource[];
  forecast: { weeks: CashWeek[]; bufferMin: number; unit: string };
  inflows: FlowItem[];
  outflows: FlowItem[];
  gap: { week: string; amount: string; detail: string };
  recommendations: string[];
  scenarios: CashScenario[];
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
  procurement?: ProcurementExtras;
  regulatory?: RegulatoryExtras;
  costEngineer?: CostEngineerExtras;
  cashflow?: CashflowExtras;
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
