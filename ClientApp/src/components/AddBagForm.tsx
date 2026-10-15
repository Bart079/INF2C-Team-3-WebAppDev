import { useState, type SubmitEvent } from "react";
import type { Bean } from "../types/Bean";

type AddBagFormProps = {
    beans: Bean[];
    onAdd: (beanId: number, grams: number, arrivalDate: string) => void;
};

// Formulier om een nieuwe bag aan de shelf toe te voegen
export function AddBagForm({ beans, onAdd }: AddBagFormProps) {
    //Ingevulde waarden uit formulier
    const [beanId, setBeanId] = useState("");
    const [grams, setGrams] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");

    function handleSubmit(event: SubmitEvent<HTMLFormElement>){
        // voorkomt dat pagina herlaad bij sturen
        event.preventDefault();

        onAdd(Number(beanId), Number(grams), arrivalDate);

        // Maak het formulier leeg na toevoegen
        setBeanId("");
        setGrams("");
        setArrivalDate("");

    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="bean">Bean: </label>
            <select
                id="bean"
                value={beanId}
                onChange={(e) => setBeanId(e.target.value)}
                required
            >
                <option value="">Choose a bean</option>
                {beans.map((bean) => (
                    <option key={bean.id} value={bean.id}>
                    {bean.name} ({bean.roaster})
                    </option>
                ))}
            </select>
            </div>

            <div>
                <label htmlFor="grams">Grams: </label>
                <input
                    id="grams"
                    type="number"
                    min="1"
                    value={grams}
                    onChange={(e) => setGrams(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="arrivalDate">Arrival date: </label>
                <input
                    id="arrivalDate"
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Add a bag</button>
        </form>
    );
}
