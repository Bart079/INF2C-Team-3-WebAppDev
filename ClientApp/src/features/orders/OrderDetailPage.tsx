
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Order } from "../../types/Order";
import { OrderCard } from "../../components/OrderCard";
import "../../css/group_Orders.css";
import "../../css/styles.css"

export function OrderDetailPage() {
  // Haal het ID uit de URL
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await fetch("/group_orders.json");

        if (!response.ok) {
          throw new Error("Unable to load orders");
        }

        const data: Order[] = await response.json();

        // Zoek de bestelling die bij het ID hoort
        const selectedOrder = data.find(
          (order) => order.id === Number(id)
        );

        if (!selectedOrder) {
          setError("Order not found");
          return;
        }

        setOrder(selectedOrder);
      } catch {
        setError("Unable to load order");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id]);

  return (
    <section className="order_details">
      <h1>Order Details</h1>

      {loading && <p>Loading order...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && order && (
        <OrderCard
            order={order}
            showDetailsButton={false}
        />
        )}

        <Link to="/orders" className="button-link">
        Back to Orders
        </Link>
    </section>
  );
}
