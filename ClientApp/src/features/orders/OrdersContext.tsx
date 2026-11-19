import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Order } from "../../types/Order";
import type { OrdersContextValue } from "../../types/OrdersContextValue";
import { useFetch } from "../../hooks/useFetch";
import * as groupOrdersApi from "../../api/GroupOrders";

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const {
    data,
    loading,
    error,
    setData: setOrders
  } = useFetch(groupOrdersApi.getAll, []);

  const orders = data ?? [];

  function addOrder(order: Order) {
    setOrders(current => [...(current ?? []), order]);
  }

  function saveShare(orderId: number, username: string, grams: number) {
    if (!Number.isInteger(grams) || grams <= 0) return;

    setOrders(current => current?.map(order => {
      if (order.id !== orderId || order.status !== "Open") {
        return order;
      }

      const shares = order.shares ?? [];
      const oldGrams =
        shares.find(share => share.username === username)?.grams ?? 0;

      return {
        ...order,
        totalGrams: order.totalGrams - oldGrams + grams,
        shares: [
          ...shares.filter(share => share.username !== username),
          { username, grams }
        ]
      };
    }) ?? []);
  }

  return (
    <OrdersContext.Provider
      value={{ orders, loading, error, addOrder, saveShare }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrdersProvider");
  }

  return context;
}
