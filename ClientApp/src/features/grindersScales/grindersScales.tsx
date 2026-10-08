import "../../css/grindersScales.css";
import type {Item } from "../../types/Item";
import {ItemCard } from "./ItemCards";
// npm run dev

export function GrindersScalesPage() {
  return (
    <>
    <h1>Grinders and Scales</h1>
    <GrindersScales />
    </>
  );
}

const item1: Item ={
  name: "Handgrinder Comandante 1",
  kind: "grinder",
  condition: "new",
  status: "available"
}
const item2: Item ={
  name: "Handgrinder Comandante 2",
  kind: "grinder",
  condition: "mint",
  status: "available"
}
const item3: Item ={
  name: "Handgrinder Comandante 3",
  kind: "grinder",
  condition: "calibration needed",
  status: "not available"
}
const item4: Item ={
  name: "Scale 1",
  kind: "scale",
  condition: "new",
  status: "requested"
}
const item5: Item ={
  name: "Scale 2",
  kind: "scale",
  condition: "mint",
  status: "available"
}

//de 4 blokken available, on hold, request, calibration needed  
export function GrindersScales() {
  return (
    <>
    <div className="pagina">
      <div className= "container">
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
        <div className="image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlVNEHCp-9DWAPPEJRdB-LxfD-C2XMoY4FvvKDjZ1m9Q&s=10" />
          </div>
          <div className="image">
          <img src="https://img.kavosdraugas.lt/0908cfe4-2bb0-4111-9d4f-3588409fa7f7/1000x1000/sorsoscaleclassicupd6png.jpg" />
        </div>
      </div>
    </div>
      </>
    )
  }

