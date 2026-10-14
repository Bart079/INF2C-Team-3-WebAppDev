import type { Order } from "./Order";

export type OrdersContextValue = {
  orders: Order[];
  loading: boolean;
  error: string | null;
  addOrder: (order: Order) => void;
  saveShare: (orderId: number, username: string, grams: number) => void;
};
