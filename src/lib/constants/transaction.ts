// Tipos de transação
export const TRANSACTION_TYPES = {
  INCOME: "income",
  OUTCOME: "outcome",
} as const;

// Status de transação
export const TRANSACTION_STATUS = {
  COMPLETED: "completed",
  PENDING: "pending",
  CANCELLED: "cancelled",
} as const;

// Types para TypeScript
export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
export type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

// Labels traduzidos
export const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPES.INCOME]: "Receita",
  [TRANSACTION_TYPES.OUTCOME]: "Despesa",
} as const;

export const TRANSACTION_STATUS_LABELS = {
  [TRANSACTION_STATUS.COMPLETED]: "Concluído",
  [TRANSACTION_STATUS.PENDING]: "Pendente",
  [TRANSACTION_STATUS.CANCELLED]: "Cancelado",
} as const;

// Categorias disponíveis para transações
export const TRANSACTION_CATEGORIES = [
  "Vendas",
  "Mensalidades",
  "Serviços",
  "Fornecedores",
  "Despesas Fixas",
  "Equipamentos",
  "Impostos",
  "Marketing",
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];
