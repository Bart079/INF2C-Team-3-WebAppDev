import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Order } from "../../types/Order";
import type { OrdersContextValue } from "../../types/OrdersContextValue";

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Het JSON-bestand is de basis. Wijzigingen bestaan alleen zolang de app open is.
  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("/group_orders.json");
        if (!response.ok) throw new Error("Unable to load orders");
        const data: Order[] = await response.json();
        setOrders(data);
      } catch {
        setError("Unable to load orders");
      } finally {
        setLoading(false);
      }
    }
    void loadOrders();
  }, []);

  function addOrder(order: Order) {
    setOrders(current => [...current, order]);
  }

  function saveShare(orderId: number, username: string, grams: number) {
    if (!Number.isInteger(grams) || grams <= 0) return;

    setOrders(current => current.map(order => {
      if (order.id !== orderId || order.status !== "Open") return order;

      const shares = order.shares ?? [];
      const oldGrams = shares.find(share => share.username === username)?.grams ?? 0;

      return {
        ...order,
        totalGrams: order.totalGrams - oldGrams + grams,
        shares: [...shares.filter(share => share.username !== username), { username, grams }]
      };
    }));
  }

  return (
    <OrdersContext.Provider value={{ orders, loading, error, addOrder, saveShare }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used inside OrdersProvider");
  return context;
}
