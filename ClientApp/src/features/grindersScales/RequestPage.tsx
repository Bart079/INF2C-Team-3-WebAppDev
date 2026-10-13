import { useState, type FormEvent } from "react";
import "../../css/styles.css";
import "../../css/grindersScales.css";

export function RequestPage() {
    const [submitted, setSubmitted] = useState(false);

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
                    <option value="Comandante C60">Comandante C60</option>
                    <option value="Comandante C40">Comandante C40</option>
                    <option value="Comandante X25">Comandante X25</option>
                    <option value="Brewista">Brewista</option>
                    <option value="Acaia Lunar">Acaia Lunar</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="TimeofRequest">Date and time:</label>
                    <input
                        type="datetime-local"
                        id="RequestTime"
                        name="RequestTime"
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