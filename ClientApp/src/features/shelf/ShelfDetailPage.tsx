import { useParams, Link } from "react-router";
import "../../css/shelf.css";
import { useFetch } from "../../hooks/useFetch";
import type { Bag } from "../../types/Bag";
import type { Bean } from "../../types/Bean";
import type { BrewingNote } from "../../types/BrewingNote";
import { BrewingNotes } from "../../components/BrewingNotes";

// Detail page: toont alle info van de bag, de bean en brewing notess

export function ShelfDetailPage() {
    // Haal de id van de bag op uit de url
    const { id } = useParams<{ id: string }>();

    // Haal de drie datasets op met de gedeelde useFetch hook
    const bags = useFetch<Bag[], Bag[]>("/bags.json", (raw) => raw);
    const beans = useFetch<Bean[], Bean[]>("/shelf_beans.json", (raw) => raw);
    const notes = useFetch<BrewingNote[], BrewingNote[]>("/brewing_notes.json", (raw) => raw);

    // Wachten op alle 3 de bestanden tot ze geladen zijn.
    if (bags.loading || beans.loading || notes.loading) {
        return <p>Loading shelf...</p>;
    }

    // Zoek de juiste bag op basis van de id uit de url
    const bag = bags.data?.find((bag) => bag.id === parseInt(id ?? "", 10));

    // Onbekend id: toon een melding in plaats van een lege pagina
    if (!bag) {
        return (
            <section>
                <p>Bag not found.</p>
                <Link to="/shelf">Back to shelf</Link>
            </section>
        );
    }
            
    // Zoek de juiste bean op basis van de beanId van de bag
    const bean = (beans.data ?? []).find((b) => b.id === bag.beanId);
    const bagNotes = (notes.data ?? []).filter((note) => note.bagId === bag.id);

    return (
        <>
            <section className="shelf_intro">
                <h2 className="underlined">{bean?.name ?? "Unknown bean"}</h2>
                <p><strong>Roaster: </strong>{bean?.roaster}</p>
                <p><strong>Origin: </strong>{bean?.origin}</p>
                <p><strong>Roast Level: </strong>{bean?.roastLevel}</p>
                <p><strong>Grams: </strong>{bag?.grams}</p>
                <p><strong>Arrival Date: </strong>{bag?.arrivalDate}</p>
                <p><strong>Finished: </strong>{bag.finished ? "Yes" : "No"}</p>
            </section>

            <section className="my_notes">
                <h2 className="underlined">Brewing Notes</h2>
                {bagNotes.length === 0 ? (
                    <p>No brewing notes for this bag.</p>
                ) : (
                    <BrewingNotes notes={bagNotes} />
                )}
            </section>

            <Link to="/shelf">Back to shelf</Link>
        </>
    );
}