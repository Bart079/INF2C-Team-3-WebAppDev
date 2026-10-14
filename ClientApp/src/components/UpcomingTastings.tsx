import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { hasRole } from "../auth/roles";
import type { Tasting, TastingBean, TastingSignup } from "../types/tasting";

type UpcomingTastingsProps = {
  tastings: Tasting[];
  beans: TastingBean[];
  signups: TastingSignup[];
};

export function UpcomingTastings({ tastings, beans, signups }: UpcomingTastingsProps) {
  const { user } = useAuth();
  const committee = hasRole(user, "committee");
  const beanNames = new Map(beans.map((bean) => [bean.id, bean.name]));
  const now = new Date();
  const upcomingTastings = tastings.filter(
    (tasting) =>
      !tasting.cancelled &&
      new Date(`${tasting.date}T${tasting.time}`) >= now,
  );

  return (
    <div className="card_list" style={{ justifyContent: "center" }}>
      {upcomingTastings.map((tasting) => {
        const confirmedSignups = signups.filter(
          (signup) =>
            signup.tastingId === tasting.id && signup.status === "confirmed",
        );

        return (
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
              {Math.max(0, tasting.capacity - confirmedSignups.length)}
            </p>
            <p>
              Beans:{" "}
              {tasting.lineup
                .slice()
                .sort((a, b) => a.position - b.position)
                .map(
                  (item) =>
                    beanNames.get(item.beanId) ?? `Unknown bean (${item.beanId})`,
                )
                .join(", ")}
            </p>
            {committee && !tasting.cancelled && (
              <>
                {tasting.keyStatus !== "available" && (
                  <button type="button">I will bring the key</button>
                )}
                <button type="button">Cancel tasting</button>
              </>
            )}
            {user ? (
              <button type="button">I want to participate </button>
            ) : (
              <p>
                To participate, you need to <Link to="/login">log in</Link>.
              </p>
              {user ? (
                <button>I want to participate</button>
              ) : (
                <p>
                  To participate, you must <Link to="/login">log in</Link>.
                </p>
              )}
          </article>
        );
      })}
    </div>
  );
}