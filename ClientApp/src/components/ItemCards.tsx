import type {Item} from "../types/Item";
import "../css/Card.css";
import {Link} from "react-router"

type ItemCardProps = 
{
  item: Item;
};

export function ItemCard({item}: ItemCardProps) {
  return (
    <div className="card">
      <div className="card-body">
      <h3 className="card-title">
        <Link to={`/grindersScales/${item.id}`}>
          {item.name}
        </Link>
      </h3>
        <div className="card-text">
          <p>{item.kind}</p>
          <p>{item.condition}</p>
          <p>{item.status}</p>
        </div>
      </div>
    </div>
  );
}