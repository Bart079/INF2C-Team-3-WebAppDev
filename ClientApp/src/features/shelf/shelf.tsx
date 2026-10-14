import "../../css/shelf.css";
import { useFetch } from "../../hooks/useFetch";
import type { Bag } from "../../types/Bag";
import type { Bean } from "../../types/Bean";
import type { BrewingNote } from "../../types/BrewingNote";
import { BagList } from "../../components/BagList";
import { BrewingNotes } from "../../components/BrewingNotes";

export function ShelfPage() {
  const bags = useFetch<Bag[], Bag[]>("/bags.json", (raw) => raw);
  const beans = useFetch<Bean[], Bean[]>("/shelf_beans.json", (raw) => raw);
  const notes = useFetch<BrewingNote[], BrewingNote[]>("/brewing_notes.json", (raw) => raw);

  if (bags.loading || beans.loading || notes.loading) {
    return <p>Loading shelf...</p>;
  }

  if (bags.error || beans.error || notes.error) {
    return <p>Could not load the shelf.</p>;
  }

  const myBags = (bags.data ?? []).filter((bag) => bag.holderId === 1);
  const myNotes = (notes.data ?? []).filter((note) => note.writerId === 1);

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
        <button>Add Bag</button>
      </section>
        

      <section className="my_notes">
        <h2 className="underlined">Brewing Notes</h2>
        <BrewingNotes notes={myNotes} />
      </section>
    </>
  );
}