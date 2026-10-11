import "../../css/grindersScales.css";
import type {Item } from "../../types/Item";
import {ItemCard } from "./ItemCards";
import coffeegrinder from "../../assets/coffeegrinder.jpg";
import coffeescale from "../../assets/coffeescale.jpg";
import "../../css/styles.css";
// npm run dev
//--host

export function GrindersScalesPage() {
  return (
    <>
    <h1>Grinders and Scales</h1>
    <GrindersScales />
    </>
  );
}

const item1: Item ={
  name: "Comandante C60",
  kind: "handgrinder",
  condition: "new",
  status: "available"
}
const item2: Item ={
  name: "Comandante C40",
  kind: "handgrinder",
  condition: "mint",
  status: "available"
}
const item3: Item ={
  name: "Comandante X25",
  kind: "handgrinder",
  condition: "calibration soon needed",
  status: "requested"
}
const item4: Item ={
  name: "Brewista",
  kind: "scale",
  condition: "new",
  status: "not available"
}
const item5: Item ={
  name: "Acaia Lunar",
  kind: "scale",
  condition: "mint",
  status: "not available"
}

//de 4 blokken available, on hold, request, calibration needed  
export function GrindersScales() {
  return (
    <>
      <section className="grinders_scales_intro">
        <h2 className="sub">
        Lend your scales and grinders here!
        </h2>

        <p className="text boxedintro">
        See what is available to borrow from other members of the Zetsel community. Sometimes we need to calibrate our scales and grinders, they will be available again after a few days.
        </p>
    </section>
    <div className="pagina">
      <div className= "box">
        <div>
          <h2>Available</h2>
          <ItemCard item={item1} />
        </div>

        <div>
          <h2>On Hold</h2>
          <ItemCard item={item2} />
        </div>

        <div>
          <h2>Request</h2>
          <ItemCard item={item3} />
        </div>

        <div>
          <h2>Calibration Needed</h2>
          <ItemCard item={item4} />
          <ItemCard item={item5} />
        </div>
      </div>
      <div className="images">
        <img
        className="medium coffee_grinder"
        src={coffeegrinder}
        alt="coffee grinder"
        />
        <img
          className="medium scale"
          src={coffeescale}
          alt="scale"
        />
      </div>
    </div>
      </>
    )
  }

