import { useState, type FormEvent } from "react";
import "../../css/styles.css";
import "../../css/tastings.css";
import coffeeCupsBeansImage from "../../assets/row_of_coffee_cups_with_beans.jpg";

export function CreateTastingPage() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <div>
            <h1>Create a tasting</h1>
            <p>
                Welcome, we are excited for you to create a tasting.
                Please fill in the details below to create your tasting.
            </p>

            <img
                className="row_of_coffee_cups"
                src={coffeeCupsBeansImage}
                alt="Row of coffee cups with coffee beans"
            />

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
                    <label htmlFor="tastingTime">Date and time:</label>
                    <input
                        type="datetime-local"
                        id="tastingTime"
                        name="tastingTime"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="capacity">Capacity of the room:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="amountOfBeans">Amount of beans:</label>
                    <input
                        type="number"
                        id="amountOfBeans"
                        name="amountOfBeans"
                        min="1"
                        required
                    />
                </div>

                <button type="submit">Create tasting</button>
            </form>

            {submitted && (
                <p role="status">
                    Form submitted.
                </p>
            )}
        </div>
    );
}