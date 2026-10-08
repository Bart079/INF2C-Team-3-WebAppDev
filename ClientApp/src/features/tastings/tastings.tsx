import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Tasting } from "../../types/tasting";
import { UpcomingTastings } from "../../components/UpcomingTastings";

import "../../css/styles.css";
import "../../css/tastings.css";
import coffeeCupsImage from "../../assets/row_of_coffee_cups.jpg";

export function TastingsPage() {
    const [tastings, setTastings] = useState<Tasting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    

    useEffect(() => {
        async function loadTastings() {
            try {
                const response = await fetch("/upcoming_tastings.json");

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                setTastings(data);
            } catch (err) {
                console.error(err);
                setError("Could not load tastings.");
            } finally {
                setLoading(false);
            }
        }

        loadTastings();
    }, []);

    if (loading) {
        return <p>Loading tastings...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Tastings</h1>
            <p>Welcome to the Tastings page!</p>

            <img
                className="row_of_coffee_cups"
                src={coffeeCupsImage}
                alt="row of coffee cups"
            />

            <p>
                There are a lot of amazing types of beans!
                We love to share beautiful beans and different types of
                roasts with you.
            </p>

            <p>
                We are excited for you to join one of our tastings.
                The tastings fill up fast.
            </p>

            <p>
                If you want to host a tasting, click{" "}
                <Link to="/create-tastings">here</Link>
            </p>

            <UpcomingTastings tastings={tastings} />
        </div>
    );
}