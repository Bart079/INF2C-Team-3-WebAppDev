import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../../auth/AuthContext";
import { useOrders } from "./OrdersContext";
import { useFetch } from "../../hooks/useFetch";

import * as beansApi from "../../api/Beans";
import * as groupOrdersApi from "../../api/GroupOrders";

import "../../css/group_Orders.css";

export function CreateOrderPage() {
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const {
    data: beans,
    loading: beansLoading,
    error: beansError
  } = useFetch(beansApi.getAll, []);

  const [beanId, setBeanId] = useState("");
  const [minimum, setMinimum] = useState("");
  const [closingDate, setClosingDate] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setError(null);

    const grams = Number(minimum);
    const now = new Date();
    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");

    const selectedDate = new Date(`${closingDate}T12:00:00`);

    const validDate =
      /^\d{4}-\d{2}-\d{2}$/.test(closingDate) &&
      !Number.isNaN(selectedDate.getTime()) &&
      selectedDate.getFullYear() === Number(closingDate.slice(0, 4)) &&
      selectedDate.getMonth() + 1 === Number(closingDate.slice(5, 7)) &&
      selectedDate.getDate() === Number(closingDate.slice(8, 10));

    if (!beanId || !minimum.trim() || !closingDate) {
      setError("Fill in all required fields.");
      return;
    }

    if (!beans?.some(bean => bean.id === Number(beanId))) {
      setError("Select a valid coffee bean.");
      return;
    }

    if (!Number.isInteger(grams) || grams <= 0) {
      setError("Minimum must be a positive whole number of grams.");
      return;
    }

    if (!validDate || closingDate <= today) {
      setError("Closing date must be a valid future date.");
      return;
    }

    if (!user) {
      setError("Log in to start an order.");
      return;
    }

    setSubmitting(true);

    try {
      const createdOrder = await groupOrdersApi.create({
        beanId: Number(beanId),
        startedById: user.id,
        minimumGrams: grams,
        closingDate
      });

      addOrder(createdOrder);

      navigate(`/orders/${createdOrder.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not create group order."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="order_form_page">
      <h1>Start a Group Order</h1>

      <form className="order_form_card" onSubmit={handleSubmit} noValidate>
        <label htmlFor="bean">Coffee bean</label>
        <select
          id="bean"
          value={beanId}
          onChange={event => setBeanId(event.target.value)}
          disabled={beansLoading || submitting || !!beansError}
          required
        >
          <option value="">Select a coffee bean</option>

          {beans?.map(bean => (
            <option key={bean.id} value={bean.id}>
              {bean.name}
            </option>
          ))}
        </select>

        {beansLoading && <p>Loading coffee beans...</p>}
        {beansError && <p role="alert">{beansError}</p>}

        <label htmlFor="minimum">Minimum amount (g)</label>
        <input
          id="minimum"
          type="number"
          min="1"
          step="1"
          value={minimum}
          onChange={event => setMinimum(event.target.value)}
          disabled={submitting}
          required
        />

        <label htmlFor="closingDate">Closing date</label>
        <input
          id="closingDate"
          type="date"
          value={closingDate}
          onChange={event => setClosingDate(event.target.value)}
          disabled={submitting}
          required
        />

        {error && <p role="alert" className="form_error">{error}</p>}

        <button
          type="submit"
          disabled={submitting || beansLoading || !!beansError}
        >
          {submitting ? "Creating..." : "Create Order"}
        </button>
      </form>
      <Link className="button-link order_back_link" to="/orders">Back to Orders</Link>
    </section>
  );
}
