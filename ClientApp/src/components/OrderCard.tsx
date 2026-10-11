
import type { Order } from "../types/Order";

type OrderCardProps = {
  order: Order;
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="order">
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

      <button>View Order</button>
    </article>
  );
}
