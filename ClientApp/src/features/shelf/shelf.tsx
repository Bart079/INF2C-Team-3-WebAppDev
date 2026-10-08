import "../../css/shelf.css";
import {bags, beans, brewingNotes} from "./mockData";
import {BagList} from "./BagList";
import {BrewingNotes} from "./BrewingNotes";

export function ShelfPage() {
  const myBags = bags.filter(bag => bag.holderId === 1);
  const myNotes = brewingNotes.filter((note) => note.writerId === 1);

  return (
    <>
      <section className="shelf_intro">
        <h1 className="title">Shelf</h1>
        <h3 className="sub">Who has what, and since when</h3>
        <p className="text">Here you can find the coffee bags you have home.</p>
      </section>

      <section className="my_bags">
        <h2>My Bags</h2>

        <BagList bags={myBags} beans={beans} />
      </section>

      <section className="my_notes">
        <h2>Brewing Notes</h2>
        <BrewingNotes notes={myNotes} />
      </section>
    </>
  );
}