import type { HostedTastingCardProps } from "../types/tasting";

export function HostedTastingCard({
  tasting,
  beans,
  signups,
}: HostedTastingCardProps) {
  const beanNames = new Map(beans.map((bean) => [bean.id, bean.name]));

  const confirmedCount = signups.filter(
    (signup) =>
      signup.tastingId === tasting.id && signup.status === "confirmed",
  ).length;

  const waitingCount = signups.filter(
    (signup) =>
      signup.tastingId === tasting.id && signup.status === "waiting",
  ).length;

  return (
    <article className="card">
      <h2>Tasting op {tasting.date}</h2>

      <p>Tijd: {tasting.time}</p>
      <p>Status: {tasting.cancelled ? "Cancelled" : tasting.keyStatus}</p>
      <p>Capaciteit: {tasting.capacity}</p>
      <p>Bevestigde deelnemers: {confirmedCount}</p>
      <p>Wachtlijst: {waitingCount}</p>

      <h3>Line-up</h3>
      {tasting.lineup
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((item) => (
          <p key={item.id}>
            Positie {item.position}:{" "}
            {beanNames.get(item.beanId) ?? `Onbekende boon (${item.beanId})`}
          </p>
        ))}

      {!tasting.cancelled && (
        <>
          <button type="button">Line-up aanpassen</button>
          <button type="button">Tasting annuleren</button>
        </>
      )}
    </article>
  );
}