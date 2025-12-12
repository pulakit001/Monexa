export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string; // ISO String
  timestamp: number;
}

export interface BudgetConfig {
  daily: number;
  monthly: number;
}

export interface Theme {
  id: string;
  name: string;
  bg: string;
  text: string;
  border: string;
  accent: string; // Used for "highlight" or chart fills
  chartStroke: string;
}

export interface AppState {
  expenses: Expense[];
  categories: string[];
  budget: BudgetConfig;
  themeId: string;
}

export const DEFAULT_CATEGORIES = [
  "FOOD", "TRANSPORT", "HOUSING", "TECH", "UTILITIES", "HEALTH", "MISC"
];
