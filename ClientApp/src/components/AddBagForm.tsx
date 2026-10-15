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
    //Foutmeldinge
    const [errors, setErrors] = useState<{ bean?: string; grams?: string; date?: string}>({});

    function handleSubmit(event: SubmitEvent<HTMLFormElement>){
        // voorkomt dat pagina herlaad bij sturen
        event.preventDefault();

        
        const newErrors: {bean?: string; grams?: string; date?: string} = {};
        const today = new Date().toISOString().slice(0,10);

        if (beanId === "") {
            newErrors.bean = "Choose a bean.";
        }

        if (grams === "" || Number(grams) <1 ) {
            newErrors.grams = "Grams must be at least 1.";
        }

        else if (Number(grams) > 5000 ){
            newErrors.grams = "Grams can be at most 5000.";
        }

        if (arrivalDate ==="") {
            newErrors.date = "Choose an arrival date.";

        }

        else if (arrivalDate > today){
            newErrors.date = "Arrival date can't be in the future.";

        }

        setErrors(newErrors);
        // Stop als er fouten zijn
        if (Object.keys(newErrors).length>0){
            return;
        }

        onAdd(Number(beanId), Number(grams), arrivalDate);

        // Maak het formulier leeg na toevoegen
        setBeanId("");
        setGrams("");
        setArrivalDate("");
        setErrors({});

    }

    return(
        <form onSubmit={handleSubmit} noValidate>
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
                {errors.bean && <p className="error">{errors.bean}</p>}
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
                {errors.grams && <p className="error">{errors.grams}</p>}
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
                {errors.date && <p className="error">{errors.date}</p>}
            </div>

            <button type="submit">Add a bag</button>
        </form>
    );
}
