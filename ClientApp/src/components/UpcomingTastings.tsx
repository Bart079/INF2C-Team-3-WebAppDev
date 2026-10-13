import type { Tasting, TastingBean, TastingSignup } from "../types/tasting";

type UpcomingTastingsProps = {
  tastings: Tasting[];
  beans: TastingBean[];
  signups: TastingSignup[];
};

export function UpcomingTastings({ tastings, beans, signups }: UpcomingTastingsProps) {
  const beanNames = new Map(beans.map((bean) => [bean.id, bean.name]));
  const now = new Date();
  const upcomingTastings = tastings.filter(
    (tasting) => new Date(`${tasting.date}T${tasting.time}`) >= now,
  );

  return (
    <div className="card_list">
        {upcomingTastings.map((tasting) => (
          <article className="card" key={tasting.id}>
              <p>Upcoming Tasting:</p>
              <p>
                Status:{" "}
                {tasting.cancelled
                  ? "Cancelled"
                  : tasting.keyStatus === "available"
                    ? "Confirmed"
                    : tasting.keyStatus === "awaiting"
                      ? "Waiting for confirmation"
                      : "Unavailable"}
              </p>
              <p>Date: {tasting.date}</p>
              <p>Time: {tasting.time}</p>
              <p>Capacity: {tasting.capacity}</p>
              <p>
                Available spots:{" "}
                {Math.max(
                  0,
                  tasting.capacity -
                    signups.filter(
                      (signup) =>
                        signup.tastingId === tasting.id &&
                        signup.status === "confirmed",
                    ).length,
                )}
              </p>
              <p>
                Beans:{" "}
                {tasting.lineup
                  .slice()
                  .sort((a, b) => a.position - b.position)
                  .map((item) => beanNames.get(item.beanId) ?? `Unknown bean (${item.beanId})`)
                  .join(", ")}
              </p>
              <button>I want to participate</button>
          </article>
        ))}
    </div>
  );
}