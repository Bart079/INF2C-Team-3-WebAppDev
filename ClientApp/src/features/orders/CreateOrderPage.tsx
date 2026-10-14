import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { useOrders } from "./OrdersContext";
import type { Order } from "../../types/Order";
import "../../css/group_Orders.css";

export function CreateOrderPage() {
  const { user } = useAuth();
  const { orders, addOrder } = useOrders();
  const navigate = useNavigate();

  const [bean, setBean] = useState("");
  const [minimum, setMinimum] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const grams = Number(minimum);
    const now = new Date();
    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
    const selectedDate = new Date(`${closingDate}T12:00:00`);

    // Check the date parts as well, so dates that JavaScript normalizes are rejected.
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(closingDate)
      && !Number.isNaN(selectedDate.getTime())
      && selectedDate.getFullYear() === Number(closingDate.slice(0, 4))
      && selectedDate.getMonth() + 1 === Number(closingDate.slice(5, 7))
      && selectedDate.getDate() === Number(closingDate.slice(8, 10));

    if (!bean.trim() || !minimum.trim() || !closingDate) {
      setError("Fill in all required fields.");
    } else if (!Number.isFinite(grams) || grams <= 0 || !Number.isInteger(grams)) {
      setError("Minimum must be a positive whole number of grams.");
    } else if (!validDate || closingDate <= today) {
      setError("Closing date must be a valid future date.");
    } else if (!user) {
      setError("Log in to start an order.");
    } else {
      // Use the next available ID and keep the bean name free of surrounding whitespace.
      const id = Math.max(0, ...orders.map(order => order.id)) + 1;
      const order: Order = {
        id,
        bean: bean.trim(),
        startedBy: user.username,
        minimumGrams: grams,
        totalGrams: 0,
        closingDate,
        status: "Open",
        shares: [],
      };

      addOrder(order);
      navigate(`/orders/${id}`);
    }
  }

  return (
    <section className="order_form_page">
      <h1>Start a Group Order</h1>
      <form className="order_form_card" onSubmit={handleSubmit} noValidate>
        <label htmlFor="bean">Coffee bean</label>
        <input
          id="bean"
          value={bean}
          onChange={event => setBean(event.target.value)}
          required
        />

        <label htmlFor="minimum">Minimum amount (g)</label>
        <input
          id="minimum"
          type="number"
          min="1"
          step="1"
          value={minimum}
          onChange={event => setMinimum(event.target.value)}
          required
        />

        <label htmlFor="closingDate">Closing date</label>
        <input
          id="closingDate"
          type="date"
          value={closingDate}
          onChange={event => setClosingDate(event.target.value)}
          required
        />

        {error && <p role="alert" className="form_error">{error}</p>}
        <button type="submit">Create Order</button>
      </form>
      <Link className="button-link order_back_link" to="/orders">Back to Orders</Link>
    </section>
  );
}
