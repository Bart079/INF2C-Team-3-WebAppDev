import { Link } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import * as tastingsApi from "../../api/Tastings";
import { UpcomingTastings } from "../../components/UpcomingTastings";
import { hasRole } from "../../auth/roles";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import * as tastingSignupsApi from "../../api/TastingSignups";
import type { SignupFeedback } from "../../types/UpcomingTastingsProps";

import "../../css/styles.css";
import "../../css/tastings.css";


export function TastingsPage() {
    const { data, loading, error, setData } = useFetch(tastingsApi.getAll, []);
    const tastings = data?.tastings ?? [];
    const beans = data?.beans ?? [];
    const signups = data?.signups ?? [];
    const { user } = useAuth();
    const isHost = hasRole(user, "host");
    const [signingUpTastingId, setSigningUpTastingId] = useState<number | null>(null);
    const [signupFeedback, setSignupFeedback] = useState<
        Record<number, SignupFeedback>
    >({});

    async function handleSignup(tastingId: number) {
        if (!user) {
            return;
        }

        setSigningUpTastingId(tastingId);
        setSignupFeedback((current) => {
            const next = { ...current };
            delete next[tastingId];
            return next;
        });

        try {
            const signup = await tastingSignupsApi.create({
                tastingId,
                memberId: user.id,
            });

            setData((current) =>
                current
                    ? { ...current, signups: [...current.signups, signup] }
                    : current,
            );
        } catch (err) {
            setSignupFeedback((current) => ({
                ...current,
                [tastingId]: {
                    message:
                        err instanceof Error
                            ? err.message
                            : "Could not sign up for this tasting.",
                },
            }));
        } finally {
            setSigningUpTastingId(null);
        }
    }

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
                onSignup={handleSignup}
                signingUpTastingId={signingUpTastingId}
                signupFeedback={signupFeedback}
            />
        </div>
    );
}