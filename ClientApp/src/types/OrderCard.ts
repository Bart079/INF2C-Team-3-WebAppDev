import type { Order } from "./Order";

export type OrderCard = {
  order: Order;
  showDetailsButton?: boolean;
  detailed?: boolean;
};