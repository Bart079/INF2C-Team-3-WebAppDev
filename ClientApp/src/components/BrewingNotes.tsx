import type {BrewingNote} from "../types/BrewingNote";

type BrewingNotesProps = {
    notes: BrewingNote[];
};

export function BrewingNotes({ notes }: BrewingNotesProps) {
    return (
        <div className="card_list">
            {notes.map((note) => (
                <article key={note.id} className="card">
                    <h3>{note.method}</h3>
                    <p><strong>Dose (grams): </strong>{note.doseGrams} g</p>
                    <p><strong>Grind: </strong>{note.grind}</p>
                    <p><strong>Result: </strong>{note.result}</p>
                    <p><strong>Reference Brew: </strong>{note.isReference ? "Yes" : "No"}</p>
                    <button>Set as Reference</button>
                </article>
            ))}
        </div>
    );
}