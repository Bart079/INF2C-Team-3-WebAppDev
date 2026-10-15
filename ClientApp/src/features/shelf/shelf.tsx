import { AddBagForm } from "../../components/AddBagForm";
import { useState } from "react";
import "../../css/shelf.css";
import { useFetch } from "../../hooks/useFetch";
import type { Bag } from "../../types/Bag";
import type { Bean } from "../../types/Bean";
import type { BrewingNote } from "../../types/BrewingNote";
import { BagList } from "../../components/BagList";
import { BrewingNotes } from "../../components/BrewingNotes";
import { useAuth } from "../../auth/AuthContext";

// Shelf page toont de bags en brewing notes van de gebruiker. De gebruiker kan ook een bag toevoegen aan zijn shelf.
export function ShelfPage() {
  // Haal de ingelogde gebruiker op
  const { user } = useAuth();
  // Bags die de gebruiker zelg toevoegt (word nog niet opgeslagen, geen backedn)
  const [addedBags, setAddedBags] = useState<Bag[]>([]);
  // Haal de 3 datasets op met de useFetch hook.
  const bags = useFetch<Bag[], Bag[]>("/bags.json", (raw) => raw);
  const beans = useFetch<Bean[], Bean[]>("/shelf_beans.json", (raw) => raw);
  const notes = useFetch<BrewingNote[], BrewingNote[]>("/brewing_notes.json", (raw) => raw);

  // Bags uit de JSON plus eigen bags
  const allBags = [...(bags.data ?? []), ...addedBags];
  const myBags = allBags.filter((bag) => bag.holderId === user?.id);
  const myNotes = (notes.data ?? []).filter((note) => note.writerId === user?.id);

//Voeg nieuwe bag toe aan shelf van ingelogde gebruiker
function handleAdd(beanId: number, grams: number, arrivalDate: string){
 // +1 id bij bestaand id
 const newId = Math.max(0, ...allBags.map((bag) => bag.id)) + 1;

 const newBag: Bag = {
  id: newId,
  beanId,
  holderId: user?.id ?? 0,
  grams,
  arrivalDate,
  finished: false,
  createdAt: new Date().toISOString(),

 };
 setAddedBags([...addedBags, newBag]);
}

// Wachten op alle 3 de bestanden tot ze geladen zijn.
  if (bags.loading || beans.loading || notes.loading) {
    return <p>Loading shelf...</p>;
  }
// Foutmelding als een van de bestanden niet geladen kan worden.
  if (bags.error || beans.error || notes.error) {
    return <p>Could not load the shelf.</p>;
  }

  return (
    <>
      <section className="shelf_intro">
        <h1 className="title">Shelf</h1>
        <h3 className="sub">Who has what, and since when</h3>
        <p className="text boxedintro">Here you can find the coffee bags you have home.</p>
      </section>

      <section className="my_bags">
        <h2 className="underlined">My Bags</h2>
        <BagList bags={myBags} beans={beans.data ?? []} />
      </section>
      
      <section className ="add_bag">
        <h2 className="underlined">Add a Bag</h2>
        <p>Record a bag you took home from the club room.</p>
        <AddBagForm beans={beans.data ?? []} onAdd={handleAdd} />
      </section>
        

      <section className="my_notes">
        <h2 className="underlined">Brewing Notes</h2>
        <BrewingNotes notes={myNotes} />
      </section>
    </>
  );
}