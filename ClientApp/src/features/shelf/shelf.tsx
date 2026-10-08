import "../../css/shelf.css";
import {bags, beans} from "./mockData";
import {BagList} from "./BagList";

export function ShelfPage() {
  const myBags = bags.filter(bag => bag.holderId === 1);

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
    </>
  );
}