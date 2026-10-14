import { Link } from "react-router";
import type { Order } from "../types/Order";

type OrderCardProps = {
  order: Order;
  showDetailsButton?: boolean;
};

export function OrderCard({
  order,
  showDetailsButton = true
}: OrderCardProps) {
  return (
    <article className="card">
      <h3>{order.bean}</h3>

      {order.startedBy && (
        <p>
          <strong>Started by: </strong>
          {order.startedBy}
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

      {order.closingDate && (
        <p>
          <strong>Closing date: </strong>
          {order.closingDate}
        </p>
      )}

      <p>
        <strong>Status: </strong>
        {order.status}
      </p>

      {showDetailsButton && (
        <Link to={`/orders/${order.id}`} className="button-link">
          View Order
        </Link>
      )}
    </article>
  );
}