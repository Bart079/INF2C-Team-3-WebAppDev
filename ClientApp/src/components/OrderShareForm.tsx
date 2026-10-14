import { useState } from "react";
import type { FormEvent } from "react";
import type { OrderShareForm } from "../types/OrderShareForm";

export function OrderShareForm({ currentGrams, onSave }: OrderShareForm) {
  const [grams, setGrams] = useState(currentGrams > 0 ? String(currentGrams) : "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(grams);

    if (!grams.trim() || !Number.isInteger(amount) || amount <= 0) {
      setError("Enter a positive whole number of grams.");
      setSaved(false);
      return;
    }

    onSave(amount);
    setError("");
    setSaved(true);
  }

  return (
    <section className="order_share_card">
      <h2>Your Share</h2>
      <p>{currentGrams > 0 ? `Your current share: ${currentGrams} g` : "You haven't joined this order yet."}</p>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="shareGrams">Amount (g)</label>
        <input
          id="shareGrams"
          type="number"
          min="1"
          step="1"
          value={grams}
          onChange={event => {
            setGrams(event.target.value);
            setError("");
            setSaved(false);
          }}
          required
        />
        {error && <p role="alert" className="form_error">{error}</p>}
        {saved && <p role="status">Share updated (until refresh).</p>}
        <button type="submit">{currentGrams > 0 ? "Update Share" : "Join Order"}</button>
      </form>
    </section>
  );
}
