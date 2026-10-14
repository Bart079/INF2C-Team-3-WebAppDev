import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { OrderCard } from "../../components/OrderCard";
import { useOrders } from "./OrdersContext";
import "../../css/group_Orders.css";

export function OrdersPage() {
  const { orders, loading, error } = useOrders();
  const { user } = useAuth();
  const openOrders = orders.filter(order => order.status === "Open");
  const finishedOrders = orders.filter(order => order.status !== "Open");

  return (
    <>
      <section className="orders_intro">
        <h1 className="title">Orders</h1>
        <h3 className="sub">Order coffee together with the Zetsel App</h3>
        <p className="text boxedintro">Here you can find current orders and see how much coffee has already been ordered.</p>
      </section>

      {loading && <p>Loading orders...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <>
          <section className="open_orders">
            <h2>Open Orders</h2>
            <div className="card_list">
              {openOrders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
          </section>

          <section className="create_order">
            <h2>Start a Group Order</h2>
            {user ? (
              <>
                <p>Start a new order for a coffee bean and let other members join your order.</p>
                <Link className="button-link" to="/orders/new">Start New Order</Link>
              </>
            ) : (
              <p><Link to="/login">Log in</Link> to start your own group order.</p>
            )}
          </section>

          <section className="finished_orders">
            <h2>Previous Orders</h2>
            <div className="card_list">
              {finishedOrders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
          </section>
        </>
      )}
    </>
  );
}
