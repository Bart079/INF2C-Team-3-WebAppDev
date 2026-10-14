import { Link } from "react-router";
import type { OrderCard } from "../types/OrderCard";

export function OrderCard({
  order,
  showDetailsButton = true,
  detailed = false
}: OrderCard) {
  return (
    <article className={detailed ? "card order_detail_card" : "card"}>
      <h3>{order.bean}</h3>

      {detailed && (
        <p>
          <strong>Order ID: </strong>
          {order.id}
        </p>
      )}

      {(order.startedBy || detailed) && (
        <p>
          <strong>Started by: </strong>
          {order.startedBy ?? "Unknown"}
        </p>
      )}

      <p>
        <strong>Minimum: </strong>
        {order.minimumGrams} g
      </p>

      <p>
        <strong>Total: </strong>
        {order.totalGrams} g
      </p>

      {(order.closingDate || detailed) && (
        <p>
          <strong>Closing date: </strong>
          {order.closingDate ?? "Not set"}
        </p>
      )}

      <p>
        <strong>Status: </strong>
        {order.status}
      </p>

      {detailed && (
        <div className="order_progress">
          <strong>Order Progress</strong>

          <progress
            value={Math.min(order.totalGrams, order.minimumGrams)}
            max={Math.max(order.minimumGrams, 1)}
          />

          <p>
            {order.minimumGrams > 0
              ? Math.round(
                  (order.totalGrams / order.minimumGrams) * 100
                )
              : 0}% of minimum reached
          </p>
        </div>
      )}

      {showDetailsButton && (
        <Link to={`/orders/${order.id}`} className="button-link">
          View Order
        </Link>
      )}
    </article>
  );
}
