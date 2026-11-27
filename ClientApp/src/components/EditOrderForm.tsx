import { useState } from "react";
import type { FormEvent } from "react";
import type { Order } from "../types/Order";
import * as groupOrdersApi from "../api/GroupOrders";

type EditOrderFormProps = {
  order: Order;
  onUpdated: (order: Order) => void;
};

export function EditOrderForm({
  order,
  onUpdated
}: EditOrderFormProps) {
  const [minimum, setMinimum] = useState(
    String(order.minimumGrams)
  );
  const [closingDate, setClosingDate] = useState(
    order.closingDate ?? ""
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setError(null);
    setSuccess(false);

    const grams = Number(minimum);

    if (!Number.isInteger(grams) || grams <= 0) {
      setError("Minimum must be a positive whole number of grams.");
      return;
    }

    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    if (!closingDate || closingDate < localToday) {
      setError("Closing date cannot be in the past.");
      return;
    }

    setSubmitting(true);

    try {
      const updatedOrder = await groupOrdersApi.update(order.id, {
        minimumGrams: grams,
        closingDate
      });

      onUpdated(updatedOrder);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not update group order."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="order_form_card" onSubmit={handleSubmit}>
      <h2>Edit Group Order</h2>

      <label htmlFor="editMinimum">Minimum amount (g)</label>
      <input
        id="editMinimum"
        type="number"
        min="1"
        step="1"
        value={minimum}
        onChange={event => setMinimum(event.target.value)}
        disabled={submitting}
        required
      />

      <label htmlFor="editClosingDate">Closing date</label>
      <input
        id="editClosingDate"
        type="date"
        value={closingDate}
        onChange={event => setClosingDate(event.target.value)}
        disabled={submitting}
        required
      />

      {error && <p role="alert">{error}</p>}
      {success && <p role="status">Group order updated successfully.</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
