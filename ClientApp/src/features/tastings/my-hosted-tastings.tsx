import { useAuth } from "../../auth/AuthContext";
import { HostedTastingCard } from "../../components/HostedTastingCard";
import { useFetch } from "../../hooks/useFetch";
import * as tastingsApi from "../../api/Tastings";

import "../../css/styles.css";
import "../../css/tastings.css";

export function MyHostedTastingsPage() {
  const { user } = useAuth();
  const { data, loading, error } = useFetch(tastingsApi.getAll, []);

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
            />
          ))}
        </div>
      )}
    </main>
  );
}