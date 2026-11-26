import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { OrderCard } from "../../components/OrderCard";
import { OrderShareForm } from "../../components/OrderShareForm";
import { EditOrderForm } from "../../components/EditOrderForm";
import { useOrders } from "./OrdersContext";
import * as groupOrdersApi from "../../api/GroupOrders";
import "../../css/group_Orders.css";

export function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    orders,
    loading,
    error,
    saveShare,
    updateOrder,
    removeOrder
  } = useOrders();

  const { user } = useAuth();

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const order = orders.find(item => item.id === Number(id));

  const ownShare =
    order?.shares?.find(share => share.username === user?.username)?.grams ?? 0;

  async function handleDelete() {
    if (!order || deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this group order?"
    );

    if (!confirmed) return;

    setDeleting(true);
    setDeleteError(null);

    try {
      await groupOrdersApi.remove(order.id);

      removeOrder(order.id);

      navigate("/orders");
    } catch (err) {
      setDeleteError(
        err instanceof Error
          ? err.message
          : "Could not delete group order."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="order_details">
      <h1>Order Details</h1>

      {loading && <p>Loading order...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && !order && (
        <p role="alert">Order not found</p>
      )}

      {!loading && !error && order && (
        <div className="order_detail_layout">

          {/* OrderCard met Delete-knop */}
          <div>
            <OrderCard
              order={order}
              showDetailsButton={false}
              detailed
              onDelete={
                user?.username === order.startedBy
                  ? handleDelete
                  : undefined
              }
              deleting={deleting}
            />

            {deleteError && (
              <p role="alert">{deleteError}</p>
            )}
          </div>

          {/* PUT – Group Order wijzigen */}
          {order.status === "Open" && user && (
            <EditOrderForm
              key={order.id}
              order={order}
              onUpdated={updateOrder}
            />
          )}

          {/* OrderShares */}
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
                <Link to="/login" className="button-link">
                  Log in
                </Link>
              </aside>
            )
          )}
        </div>
      )}

      <Link to="/orders" className="button-link order_back_link">
        Back to Orders
      </Link>
    </section>
  );
}
