import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Tasting, TastingBean, TastingSignup } from "../../types/tasting";

export function TastingsDetailPage() {
  const { id } = useParams();
  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [beans, setBeans] = useState<TastingBean[]>([]);
  const [signups, setSignups] = useState<TastingSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTastingData() {
      try {
        const [tastingsResponse, beansResponse, signupsResponse] =
          await Promise.all([
            fetch("/upcoming_tastings.json"),
            fetch("/beans.json"),
            fetch("/signups.json"),
          ]);

        if (
          !tastingsResponse.ok ||
          !beansResponse.ok ||
          !signupsResponse.ok
        ) {
          throw new Error("Could not load tasting data.");
        }

        const [tastingsData, beansData, signupsData] = await Promise.all([
          tastingsResponse.json() as Promise<Tasting[]>,
          beansResponse.json() as Promise<TastingBean[]>,
          signupsResponse.json() as Promise<TastingSignup[]>,
        ]);

        setTastings(tastingsData);
        setBeans(beansData);
        setSignups(signupsData);
      } catch (err) {
        console.error(err);
        setError("Could not load tasting details.");
      } finally {
        setLoading(false);
      }
    }

    void loadTastingData();
  }, []);

  const tasting = tastings.find((item) => item.id === Number(id));
  const confirmedSignups = signups.filter(
    (signup) =>
      signup.tastingId === tasting?.id && signup.status === "confirmed",
  );
  const beanNames = new Map(beans.map((bean) => [bean.id, bean.name]));

  return (
    <section
      className="tasting_details"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Tasting Details</h1>
      {loading && <p>Loading tasting...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (!tasting || tasting.cancelled) && (
        <p role="alert">Tasting not found</p>
      )}

      {!loading && !error && tasting && !tasting.cancelled && (
        <article className="card" style={{ width: "min(100%, 600px)" }}>
          <h2>Tasting #{tasting.id}</h2>
          <p>
            Status:{" "}
            {tasting.keyStatus === "available"
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
        </article>
      )}

      <Link to="/tastings" className="button-link">
        Back to Tastings
      </Link>
    </section>
  );
}
