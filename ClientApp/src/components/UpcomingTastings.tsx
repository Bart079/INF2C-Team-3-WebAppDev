import type { Tasting } from "../types/tasting";

type UpcomingTastingsProps = {
  tastings: Tasting[];
};

export function UpcomingTastings({ tastings }: UpcomingTastingsProps) {
  return (
    <div className="card_list">
        {tastings.map((tasting) => (
          <article className="card" key={tasting.id}>
              <p>Upcoming Tasting:</p>
              <p>Date: {tasting.date}</p>
              <p>Time: {tasting.time}</p>
              <p>Capacity: {tasting.capacity}</p>
              <p>Available spots: {tasting.availableSpots}</p>
              <p>Beans: {tasting.beans}</p>
              <button>I want to participate</button>
          </article>
        ))}
    </div>
  );
}