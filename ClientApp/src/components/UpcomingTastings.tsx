import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { hasRole } from "../auth/roles";
import type { UpcomingTastingsProps } from "../types/UpcomingTastingsProps";


export function UpcomingTastings({
  tastings,
  beans,
  signups,
  onSignup,
  signingUpTastingId,
  signupFeedback,
}: UpcomingTastingsProps) {
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
    <div className="card_list">
      {upcomingTastings.map((tasting) => {
        const confirmedSignups = signups.filter(
          (signup) =>
            signup.tastingId === tasting.id && signup.status === "confirmed",
        );
        const userSignup = signups.find(
          (signup) =>
            signup.tastingId === tasting.id && signup.memberId === user?.id,
        );
        const feedback = signupFeedback[tasting.id];

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
              userSignup ? (
                <p role="status">
                  {userSignup.status === "waiting"
                    ? `You are on the waiting list${userSignup.queuePosition === null ? "." : ` at position ${userSignup.queuePosition}.`}`
                    : "Your participation is confirmed."}
                </p>
              ) : (
                <button
                  type="button"
                  disabled={signingUpTastingId === tasting.id}
                  onClick={() => void onSignup(tasting.id)}
                >
                  {signingUpTastingId === tasting.id
                    ? "Signing up..."
                    : "I want to participate"}
                </button>
              )
            ) : (
              <p>
                To participate, you need to <Link to="/login">log in</Link>.
              </p>
            )}
            {feedback && (
              <p role="alert">{feedback.message}</p>
            )}
            <br />
             <br />

            <Link to={`/tastings/${tasting.id}`} className="button-link">
              Details
            </Link>
          </article>
        );
      })}
    </div>
  );
}