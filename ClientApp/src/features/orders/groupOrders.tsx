import "../../css/group_Orders.css";

export function OrdersPage() {
  return (
    <>
      {/* Korte uitleg over group orders */}
      <section className="orders_intro">
        <h1 className="title">Orders</h1>
        <h3 className="sub">
          Order coffee together with the Zetsel community
        </h3>

        <p className="text">
          Here you can find current orders and see how much coffee has already
          been ordered.
        </p>
      </section>

      {/* Open Orders */}
      <section className="open_orders">
        <h2>Open Orders</h2>

        <div className="order_list">
          {/* Eerste test voorbeeld */}
          <article className="order">
            <h3>Example Coffee Bean</h3>

            <p>
              <strong>Started by:</strong> Bart
            </p>
            <p>
              <strong>Minimum:</strong> 1000 g
            </p>
            <p>
              <strong>Current total:</strong> 650 g
            </p>
            <p>
              <strong>Closing date:</strong> 25 September 2026
            </p>
            <p>
              <strong>Status:</strong> Open
            </p>

            <button>View Order</button>
          </article>

          {/* Tweede test voorbeeld */}
          <article className="order">
            <h3>Another Coffee Bean</h3>

            <p>
              <strong>Started by:</strong> Adam
            </p>
            <p>
              <strong>Minimum:</strong> 500 g
            </p>
            <p>
              <strong>Current total:</strong> 350 g
            </p>
            <p>
              <strong>Closing date:</strong> 28 September 2026
            </p>
            <p>
              <strong>Status:</strong> Open
            </p>

            <button>View Order</button>
          </article>
        </div>
      </section>

      {/* Create Order */}
      <section className="create_order">
        <h2>Start a Group Order</h2>

        <p>
          Start a new order for a coffee bean and let other members join your
          order.
        </p>

        <button>Start New Order</button>
      </section>

      {/* Finished Orders */}
      <section className="finished_orders">
        <h2>Previous Orders</h2>

        <div className="order_list">
          <article className="order">
            <h3>Example Finished Order</h3>

            <p>
              <strong>Minimum:</strong> 1000 g
            </p>
            <p>
              <strong>Total:</strong> 1250 g
            </p>
            <p>
              <strong>Status:</strong> Placed
            </p>

            <button>View Order</button>
          </article>
        </div>
      </section>
    </>
  );
}