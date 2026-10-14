import type { OrderShare } from "./OrderShare";

export type Order = {
  id: number;
  bean: string;
  startedBy: string | null;
  minimumGrams: number;
  totalGrams: number;
  closingDate: string | null;
  status: string;
  shares?: OrderShare[];
};
