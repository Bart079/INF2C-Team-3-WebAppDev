import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import { HostedTastingCard } from "../../components/HostedTastingCard";
import { useFetch } from "../../hooks/useFetch";
import * as tastingsApi from "../../api/Tastings";
import * as tastingLineupsApi from "../../api/TastingLineups";
import type { TastingLineupSaveItem } from "../../types/tasting";

import "../../css/styles.css";
import "../../css/tastings.css";

export function MyHostedTastingsPage() {
  const { user } = useAuth();
  const { data, loading, error, setData } = useFetch(tastingsApi.getAll, []);
  const [cancellingTastingId, setCancellingTastingId] = useState<number | null>(null);
  const [cancellationFeedback, setCancellationFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function saveLineup(
    tastingId: number,
    lineup: TastingLineupSaveItem[],
  ) {
    const tasting = data?.tastings.find((item) => item.id === tastingId);
    if (!tasting) {
      throw new Error("Could not find this tasting.");
    }

    const retainedIds = new Set(
      lineup.flatMap((item) => (item.id === null ? [] : [item.id])),
    );
    const removedItems = tasting.lineup.filter(
      (item) => !retainedIds.has(item.id),
    );
    const retainedItems = lineup.filter((item) => item.id !== null);
    const maxPosition = Math.max(
      0,
      ...tasting.lineup.map((item) => item.position),
    );

    try {
      for (const item of removedItems) {
        await tastingLineupsApi.remove(item.id);
      }

      for (const [index, item] of retainedItems.entries()) {
        if (item.id === null) {
          continue;
        }
        await tastingLineupsApi.update(item.id, {
          tastingId,
          beanId: item.beanId,
          position: maxPosition + index + 1,
        });
      }

      for (const [index, item] of lineup.entries()) {
        if (item.id === null) {
          continue;
        }
        await tastingLineupsApi.update(item.id, {
          tastingId,
          beanId: item.beanId,
          position: index + 1,
        });
      }

      for (const [index, item] of lineup.entries()) {
        if (item.id !== null) {
          continue;
        }
        await tastingLineupsApi.create({
          tastingId,
          beanId: item.beanId,
          position: index + 1,
        });
      }

      setData(await tastingsApi.getAll());
    } catch (err) {
      try {
        setData(await tastingsApi.getAll());
      } catch (refreshError) {
        const saveMessage =
          err instanceof Error ? err.message : "Could not save the lineup.";
        const refreshMessage =
          refreshError instanceof Error
            ? refreshError.message
            : "Could not reload the tasting.";
        throw new Error(`${saveMessage} ${refreshMessage}`);
      }
      throw err;
    }
  }

  async function cancelTasting(tastingId: number) {
    const tasting = data?.tastings.find((item) => item.id === tastingId);
    if (!user || !tasting || tasting.hostId !== user.id) {
      return;
    }

    setCancellingTastingId(tastingId);
    setCancellationFeedback(null);

    try {
      await tastingsApi.update(tastingId, {
        hostId: tasting.hostId,
        date: tasting.date,
        time: tasting.time,
        capacity: tasting.capacity,
        cancelled: true,
        keyStatus: tasting.keyStatus,
      });

      setData((current) =>
        current
          ? {
              ...current,
              tastings: current.tastings.map((item) =>
                item.id === tastingId ? { ...item, cancelled: true } : item,
              ),
            }
          : current,
      );
      setCancellationFeedback({
        type: "success",
        message: "Tasting cancelled.",
      });
    } catch (err) {
      setCancellationFeedback({
        type: "error",
        message:
          err instanceof Error ? err.message : "Could not cancel this tasting.",
      });
    } finally {
      setCancellingTastingId(null);
    }
  }

  if (loading) {
    return <p>Loading your tastings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>You need to log in to view your tastings.</p>;
  }

  const now = new Date();
  const myTastings = (data?.tastings ?? []).filter(
    (tasting) =>
      tasting.hostId === user.id &&
      !tasting.cancelled &&
      new Date(`${tasting.date}T${tasting.time}`) >= now,
  );

  return (
    <main>
      <h1>My Hosted Tastings</h1>
      {cancellationFeedback && (
        <p role={cancellationFeedback.type === "error" ? "alert" : "status"}>
          {cancellationFeedback.message}
        </p>
      )}

      {myTastings.length === 0 ? (
        <p>You have not hosted any upcoming tastings.</p>
      ) : (
        <div className="card_list">
          {myTastings.map((tasting) => (
            <HostedTastingCard
              key={tasting.id}
              tasting={tasting}
              beans={data?.beans ?? []}
              signups={data?.signups ?? []}
              onSaveLineup={saveLineup}
              onCancelTasting={cancelTasting}
              cancellingTastingId={cancellingTastingId}
            />
          ))}
        </div>
      )}
    </main>
  );
}