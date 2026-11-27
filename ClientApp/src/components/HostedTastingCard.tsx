import { useState, type FormEvent } from "react";
import type {
  HostedTastingCardProps,
  TastingLineupEditItem,
  TastingLineupSaveItem,
} from "../types/tasting";

export function HostedTastingCard({
  tasting,
  beans,
  signups,
  onSaveLineup,
  onCancelTasting,
  cancellingTastingId,
}: HostedTastingCardProps) {
  const [editingLineup, setEditingLineup] = useState(false);
  const [draftLineup, setDraftLineup] = useState<TastingLineupEditItem[]>([]);
  const [savingLineup, setSavingLineup] = useState(false);
  const [lineupError, setLineupError] = useState<string | null>(null);
  const [confirmingCancellation, setConfirmingCancellation] = useState(false);
  const beanNames = new Map(beans.map((bean) => [bean.id, bean.name]));
  const sortedLineup = tasting.lineup
    .slice()
    .sort((a, b) => a.position - b.position);

  const confirmedCount = signups.filter(
    (signup) =>
      signup.tastingId === tasting.id && signup.status === "confirmed",
  ).length;

  const waitingCount = signups.filter(
    (signup) =>
      signup.tastingId === tasting.id && signup.status === "waiting",
  ).length;

  function startEditingLineup() {
    setDraftLineup(sortedLineup);
    setLineupError(null);
    setEditingLineup(true);
  }

  function moveLineupItem(index: number, direction: -1 | 1) {
    setDraftLineup((current) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }

      const updated = [...current];
      const [movedItem] = updated.splice(index, 1);
      if (!movedItem) {
        return current;
      }
      updated.splice(targetIndex, 0, movedItem);
      return updated;
    });
  }

  function handleSaveLineup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingLineup) {
      return;
    }

    const lineupToSave: TastingLineupSaveItem[] = [];
    for (const item of draftLineup) {
      if (item.beanId === "") {
        setLineupError("Choose a bean for every lineup position.");
        return;
      }
      lineupToSave.push({ id: item.id, beanId: item.beanId });
    }

    if (new Set(lineupToSave.map((item) => item.beanId)).size !== lineupToSave.length) {
      setLineupError("Each bean can only appear once in the lineup.");
      return;
    }

    setSavingLineup(true);
    setLineupError(null);
    void onSaveLineup(tasting.id, lineupToSave)
      .then(() => setEditingLineup(false))
      .catch((err: unknown) => {
        setLineupError(
          err instanceof Error ? err.message : "Could not save the lineup.",
        );
      })
      .finally(() => setSavingLineup(false));
  }

  return (
    <article className="card">
      <h2>Tasting op {tasting.date}</h2>

      <p>Tijd: {tasting.time}</p>
      <p>Status: {tasting.cancelled ? "Cancelled" : tasting.keyStatus}</p>
      <p>Capaciteit: {tasting.capacity}</p>
      <p>Bevestigde deelnemers: {confirmedCount}</p>
      <p>Wachtlijst: {waitingCount}</p>

      <h3>Line-up</h3>
      {!editingLineup ? (
        sortedLineup.map((item) => (
          <p key={item.id}>
            Positie {item.position}:{" "}
            {beanNames.get(item.beanId) ?? `Onbekende boon (${item.beanId})`}
          </p>
        ))
      ) : (
        <form onSubmit={handleSaveLineup}>
          {draftLineup.map((item, index) => (
            <div key={item.id ?? `new-${index}`}>
              <label htmlFor={`lineup-bean-${tasting.id}-${index}`}>
                Positie {index + 1}:
              </label>
              <select
                id={`lineup-bean-${tasting.id}-${index}`}
                value={item.beanId}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setDraftLineup((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index
                        ? { ...entry, beanId: value === "" ? "" : Number(value) }
                        : entry,
                    ),
                  );
                }}
                required
                disabled={savingLineup}
              >
                <option value="">Select a bean</option>
                {beans.map((bean) => {
                  const beanUsedElsewhere = draftLineup.some(
                    (entry, entryIndex) =>
                      entryIndex !== index && entry.beanId === bean.id,
                  );
                  return (
                    <option
                      key={bean.id}
                      value={bean.id}
                      disabled={beanUsedElsewhere}
                    >
                      {bean.name}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                onClick={() => moveLineupItem(index, -1)}
                disabled={savingLineup || index === 0}
              >
                Move up
              </button>
              <button
                type="button"
                onClick={() => moveLineupItem(index, 1)}
                disabled={savingLineup || index === draftLineup.length - 1}
              >
                Move down
              </button>
              <button
                type="button"
                onClick={() =>
                  setDraftLineup((current) =>
                    current.filter((_, entryIndex) => entryIndex !== index),
                  )
                }
                disabled={savingLineup || draftLineup.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setDraftLineup((current) => [...current, { id: null, beanId: "" }])
            }
            disabled={savingLineup || draftLineup.length >= beans.length}
          >
            Add bean
          </button>
          {lineupError && <p role="alert">{lineupError}</p>}
          <button type="submit" disabled={savingLineup}>
            {savingLineup ? "Saving lineup..." : "Save lineup"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingLineup(false);
              setLineupError(null);
            }}
            disabled={savingLineup}
          >
            Cancel
          </button>
        </form>
      )}

      {!tasting.cancelled && !editingLineup && (
        <>
          <button type="button" onClick={startEditingLineup}>
            Line-up aanpassen
          </button>
          {confirmingCancellation ? (
            <div>
              <p>Weet je zeker dat je deze tasting wilt annuleren?</p>
              <button
                type="button"
                disabled={cancellingTastingId !== null}
                onClick={() => void onCancelTasting(tasting.id)}
              >
                {cancellingTastingId === tasting.id
                  ? "Annuleren..."
                  : "Ja, annuleren"}
              </button>
              <button
                type="button"
                disabled={cancellingTastingId !== null}
                onClick={() => setConfirmingCancellation(false)}
              >
                Nee
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingCancellation(true)}
            >
              Tasting annuleren
            </button>
          )}
        </>
      )}
    </article>
  );
}