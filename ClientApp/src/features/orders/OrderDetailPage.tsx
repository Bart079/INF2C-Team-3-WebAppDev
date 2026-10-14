import { Link, useParams } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { OrderCard } from "../../components/OrderCard";
import { OrderShareForm } from "../../components/OrderShareForm";
import { useOrders } from "./OrdersContext";
import "../../css/group_Orders.css";

export function OrderDetailPage() {
  const { id } = useParams();
  const { orders, loading, error, saveShare } = useOrders();
  const { user } = useAuth();

  const order = orders.find(item => item.id === Number(id));
  const ownShare = order?.shares?.find(share => share.username === user?.username)?.grams ?? 0;

  return (
    <section className="order_details">
      <h1>Order Details</h1>
      {loading && <p>Loading order...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && !order && <p role="alert">Order not found</p>}

      {!loading && !error && order && (
        <div className="order_detail_layout">
          <OrderCard order={order} showDetailsButton={false} detailed />

          {order.status === "Open" && (
            user ? (
              <OrderShareForm
                key={`${order.id}-${user.username}`}
                currentGrams={ownShare}
                onSave={grams => saveShare(order.id, user.username, grams)}
              />
            ) : (
              <aside className="order_share_card">
                <h2>Join this order</h2>
                <p>Log in to add or change your share.</p>
                <Link to="/login" className="button-link">Log in</Link>
              </aside>
            )
          )}
        </div>
      )}

      <Link to="/orders" className="button-link order_back_link">Back to Orders</Link>
    </section>
  );
}
