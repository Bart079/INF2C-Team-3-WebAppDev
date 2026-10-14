import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { HostedTastingCard } from "../../components/HostedTastingCard";
import type {
  Tasting,
  TastingBean,
  TastingSignup,
} from "../../types/tasting";

import "../../css/styles.css";
import "../../css/tastings.css";

export function MyHostedTastingsPage() {
  const { user } = useAuth();

  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [beans, setBeans] = useState<TastingBean[]>([]);
  const [signups, setSignups] = useState<TastingSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
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
          tastingsResponse.json(),
          beansResponse.json(),
          signupsResponse.json(),
        ]);

        setTastings(tastingsData);
        setBeans(beansData);
        setSignups(signupsData);
      } catch (err) {
        console.error(err);
        setError("Could not load your hosted tastings.");
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, []);

  if (loading) {
    return <p>Loading your tastings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>You need to log in to view your tastings.</p>;
  }

  const myTastings = tastings.filter(
    (tasting) => tasting.hostId === user.id,
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
              beans={beans}
              signups={signups}
            />
          ))}
        </div>
      )}
    </main>
  );
}