import { useState, type FormEvent } from "react";
import "../../css/styles.css";
import "../../css/grindersScales.css";
import {useEffect} from "react";
import type {Item} from "../../types/Item";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";

export function RequestPage() {
    const [submitted, setSubmitted] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth(); //checkt of er ingelogd is
    const navigation = useNavigate();

    useEffect(() => { //controle van of de user ingelogd is of niet
        if(!user){ //reageert op of de user veranderd auth heeft user op null als je uitlogt
            navigation("/"); }
        },[user, navigation]);
        useEffect(() => { //doorgaan met de rest als je wel ingelogd bent
        async function loadItems() {
            try { /*fetch items */
                const response = await fetch("/items.json");

                if (!response.ok) { /* failed to fetch data */
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                setItems(data);
            } catch (err) {
                console.error(err);
                setError("Could not load items.");
            } finally {
                setLoading(false);
            }
        }
    
        loadItems();
    }, []);

    if (loading) {
        return <p>Loading items...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!user){
        return null;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <div>
            <h1>Create a request</h1>
            <p className="text">
                Please fill in the form so you will be on the requested list!
            </p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Last name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                    />
                </div>

                <div>
                    <h1>Choose an item</h1>
                    <label htmlFor="item">Choose an item:</label>
                    <select id="item" name="item" required>
                        {items.map(item => (
                        <option key={item.name} value={item.name}> {item.name} </option>
                        ))}
                    </select>
                </div>

                <div>

                    <label htmlFor="TimeofRequest">Startdate of loaning</label>
                    <input
                        type="datetime-local"
                        id="TimeofRequest"
                        name="TimeofRequest"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="EndTimeofRequest">Enddate of loaning</label>
                    <input
                        type="datetime-local"
                        id="EndTimeofRequest"
                        name="EndTimeofRequest"
                        required
                    />
                </div>
                <button type="submit">Create request</button>
            </form>

            {submitted && (
                <p role="status">
                    Form submitted.
                </p>
            )}
        </div>
    );
}