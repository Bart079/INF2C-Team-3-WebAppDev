
import { useEffect, useState } from "react";
import { OrderCard } from "../../components/OrderCard";
import type { Order } from "../../types/Order";
import "../../css/group_Orders.css";

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("/group_orders.json");

        if (!response.ok) {
          throw new Error("Unable to load orders");
        }

        const data: Order[] = await response.json();
        setOrders(data);
      } catch {
        setError("Unable to load orders");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  const openOrders = orders.filter(
    (order) => order.status === "Open"
  );

  const finishedOrders = orders.filter(
    (order) => order.status !== "Open"
  );

  return (
    <>
      <section className="orders_intro">
        <h1 className="title">Orders</h1>
        <h3 className="sub">
          Order coffee together with the Zetsel App
        </h3>
        <p className="text boxedintro">
          Here you can find current orders and see how
          much coffee has already been ordered.
        </p>
      </section>

      {loading && <p>Loading orders...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <section className="open_orders">
            <h2>Open Orders</h2>

            <div className="order_list">
              {openOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))}
            </div>
          </section>

          <section className="create_order">
            <h2>Start a Group Order</h2>
            <p>
              Start a new order for a coffee bean and
              let other members join your order.
            </p>
            <button>Start New Order</button>
          </section>

          <section className="finished_orders">
            <h2>Previous Orders</h2>

            <div className="order_list">
              {finishedOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
