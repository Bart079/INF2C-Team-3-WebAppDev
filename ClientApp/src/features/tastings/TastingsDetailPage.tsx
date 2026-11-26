import { Link, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import * as tastingsApi from "../../api/Tastings";

export function TastingsDetailPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    () => tastingsApi.getById(Number(id)),
    [id],
  );
  const tasting = data?.tasting;
  const beans = data?.beans ?? [];
  const signups = data?.signups ?? [];

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
