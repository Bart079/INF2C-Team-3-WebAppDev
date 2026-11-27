import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import * as beansApi from "../../api/Beans";
import * as tastingLineupsApi from "../../api/TastingLineups";
import * as tastingsApi from "../../api/Tastings";
import { useFetch } from "../../hooks/useFetch";
import "../../css/styles.css";
import "../../css/tastings.css";
import coffeeCupsBeansImage from "../../assets/row_of_coffee_cups_with_beans.jpg";

type CreateFeedback = {
    type: "success" | "error";
    message: string;
    tastingId?: number;
};

export function CreateTastingPage() {
    const { user } = useAuth();
    const {
        data: beans,
        loading: beansLoading,
        error: beansError,
    } = useFetch(beansApi.getAll, []);
    const availableBeans = beans ?? [];
    const [amountOfBeans, setAmountOfBeans] = useState(1);
    const [beanIds, setBeanIds] = useState<Array<number | "">>([""]);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<CreateFeedback | null>(null);

    function changeAmountOfBeans(event: ChangeEvent<HTMLInputElement>) {
        const amount = Math.max(0, Math.floor(Number(event.currentTarget.value)));
        setAmountOfBeans(amount);
        setBeanIds((current) =>
            Array.from({ length: amount }, (_, index) => current[index] ?? ""),
        );
    }

    function changeBean(index: number, value: string) {
        setBeanIds((current) =>
            current.map((beanId, currentIndex) =>
                currentIndex === index
                    ? value === ""
                        ? ""
                        : Number(value)
                    : beanId,
            ),
        );
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFeedback(null);

        if (!user) {
            setFeedback({
                type: "error",
                message: "You need to log in before creating a tasting.",
            });
            return;
        }

        const formData = new FormData(event.currentTarget);
        const dateTimeValue = String(formData.get("tastingTime") ?? "");
        const [date, time] = dateTimeValue.split("T");
        const capacity = Number(formData.get("capacity"));
        const selectedBeanIds = beanIds.filter(
            (beanId): beanId is number => beanId !== "",
        );

        if (!date || !time || !Number.isFinite(capacity) || capacity < 1) {
            setFeedback({
                type: "error",
                message: "Enter a valid date, time, and capacity.",
            });
            return;
        }

        if (selectedBeanIds.length !== amountOfBeans) {
            setFeedback({
                type: "error",
                message: "Choose a bean for every lineup position.",
            });
            return;
        }

        setSaving(true);
        let createdTastingId: number | undefined;
        let savedLineupCount = 0;

        try {
            const tasting = await tastingsApi.create({
                hostId: user.id,
                date,
                time,
                capacity,
                cancelled: false,
                keyStatus: "awaiting",
            });
            createdTastingId = tasting.id;

            for (const [index, beanId] of selectedBeanIds.entries()) {
                await tastingLineupsApi.create({
                    tastingId: tasting.id,
                    beanId,
                    position: index + 1,
                });
                savedLineupCount += 1;
            }

            setFeedback({
                type: "success",
                message: "Tasting and lineup created successfully.",
                tastingId: tasting.id,
            });
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Could not create the tasting.";
            setFeedback({
                type: "error",
                message: createdTastingId
                    ? `Tasting #${createdTastingId} was created, but only ${savedLineupCount} of ${selectedBeanIds.length} lineup beans were saved. ${errorMessage}`
                    : errorMessage,
                tastingId: createdTastingId,
            });
        } finally {
            setSaving(false);
        }
    }

    return (
        <div>
            <h1>Create a tasting</h1>
            <p className="text">
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
                    <label htmlFor="tastingTime">Datum en Tijd:</label>
                    <input
                        type="datetime-local"
                        id="tastingTime"
                        name="tastingTime"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="capacity">Capaciteit van de ruimte:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="amountOfBeans">Aantal bonen:</label>
                    <input
                        type="number"
                        id="amountOfBeans"
                        name="amountOfBeans"
                        min="1"
                        value={amountOfBeans}
                        onChange={changeAmountOfBeans}
                        required
                    />
                </div>

                {beansLoading && <p>Loading beans...</p>}
                {beansError && <p role="alert">{beansError}</p>}
                {!beansLoading && !beansError && availableBeans.length === 0 && (
                    <p role="alert">No beans are available for the lineup.</p>
                )}
                {!beansLoading &&
                    !beansError &&
                    availableBeans.length > 0 &&
                    beanIds.map((beanId, index) => (
                        <div key={index}>
                            <label htmlFor={`bean-${index}`}>
                                Bean for lineup position {index + 1}:
                            </label>
                            <select
                                id={`bean-${index}`}
                                value={beanId}
                                onChange={(event) =>
                                    changeBean(index, event.currentTarget.value)
                                }
                                required
                            >
                                <option value="">Select a bean</option>
                                {availableBeans.map((bean) => (
                                    <option key={bean.id} value={bean.id}>
                                        {bean.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                <button
                    type="submit"
                    disabled={
                        saving ||
                        beansLoading ||
                        Boolean(beansError) ||
                        !availableBeans.length
                    }
                >
                    {saving ? "Creating tasting..." : "Create tasting"}
                </button>
            </form>

            {feedback && (
                <p role={feedback.type === "error" ? "alert" : "status"}>
                    {feedback.message}{" "}
                    {feedback.tastingId && (
                        <Link to={`/tastings/${feedback.tastingId}`}>
                            View tasting
                        </Link>
                    )}
                </p>
            )}
        </div>
    );
}
