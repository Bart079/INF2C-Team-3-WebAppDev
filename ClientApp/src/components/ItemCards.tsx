import type {Item } from "../../types/Item";
import "../../css/card.css";

type ItemCardProps = 
{
  item: Item;
};

export function ItemCard({item}: ItemCardProps) {
  return (
    <div className="card">
      <div className="card-body">
      <h3 className="card-title">{item.name}</h3>
        <div className="card-text">
          <p>{item.kind}</p>
          <p>{item.condition}</p>
          <p>{item.status}</p>
        </div>
      </div>
    </div>
  );
}