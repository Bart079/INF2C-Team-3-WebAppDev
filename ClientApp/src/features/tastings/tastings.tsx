import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Tasting, TastingBean, TastingSignup } from "../../types/tasting";
import { UpcomingTastings } from "../../components/UpcomingTastings";
import { hasRole } from "../../auth/roles";
import { useAuth } from "../../auth/AuthContext";
import "../../css/styles.css";
import "../../css/tastings.css";
import coffeeCupsImage from "../../assets/row_of_coffee_cups.jpg";


export function TastingsPage() {
    const [tastings, setTastings] = useState<Tasting[]>([]);
    const [beans, setBeans] = useState<TastingBean[]>([]);
    const [signups, setSignups] = useState<TastingSignup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useAuth();
    const isHost = hasRole(user, "host");
    

    useEffect(() => {
        async function loadTastings() {
            try {
                const [tastingsResponse, beansResponse, signupsResponse] = await Promise.all([
                    fetch("/upcoming_tastings.json"),
                    fetch("/beans.json"),
                    fetch("/signups.json"),
                ]);

                if (!tastingsResponse.ok || !beansResponse.ok || !signupsResponse.ok) {
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
        
        <div >
            <section className="tasting_intro">
                <h1 className="title">Tastings</h1>
                <h3 className="sub">
                Join us for an amazing coffee tasting experience
                </h3>
                {isHost && (
                    <p className="text boxedintro">
                    <Link to="/my-hosted-tastings">My Hosted Tastings</Link>
                    </p>
                )}
                
                

                <p className="text boxedintro">
                Here you can find upcoming tastings.
                </p>
            </section>
            

            <p className="text boxedintro">
                There are a lot of amazing types of beans!
                We love to share beautiful beans and different types of
                roasts with you.
            </p>

            <p className="text">
                We are excited for you to join one of our tastings.
                The tastings fill up fast.
            </p>

            <p className="text">
                If you want to host a tasting, click{" "}
                <Link to="/create-tastings">here</Link>
            </p>

            <UpcomingTastings
                tastings={tastings}
                beans={beans}
                signups={signups}
            />
        </div>
    );
}