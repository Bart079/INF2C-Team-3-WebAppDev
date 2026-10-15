import type {BagCardProps} from "../types/BagCardProps";

export function BagCard({ bag, bean }: BagCardProps) {
    return (
        <article className="card">
            <h3>{bean?.name}</h3>
            <p><strong>Roaster: </strong>{bean?.roaster}</p>
            <p><strong>Origin: </strong>{bean?.origin}</p>
            <p><strong>Roast Level: </strong>{bean?.roastLevel}</p>
            <p><strong>Grams: </strong>{bag.grams}</p> 
            <p><strong>Arrival Date: </strong>{bag.arrivalDate}</p>
            <p><strong>Finished: </strong>{bag.finished ? "Yes" : "No"}</p>
            <button>Mark as Finished</button>
        </article>
    );
}
    