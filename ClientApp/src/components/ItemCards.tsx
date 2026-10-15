import type {Item} from "../types/Item";
import "../css/Card.css";
import {Link} from "react-router";
import { useAuth } from "../auth/AuthContext";
import { hasRole } from "../auth/roles";

type ItemCardProps = 
{
  item: Item;
};

export function ItemCard({item}: ItemCardProps) {
  const { user } = useAuth();
  const committee = hasRole(user, "committee");
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
          {item.status === "on hold" && (
        <div className="four-info">
        <p>Reserved by: Tabitha</p>
        <p>Dates: 10 October - 28 October 2026</p>
        </div>
        )}
        {item.status === "not available" && (
        <div className="four-info">
        <p>Dates: 15 October - 17 October 2026</p>
        </div>
        )}
        {item.status === "requested" && (
        <div className="four-info">
        <p>Requested by: Bart</p>
        <p>Dates: 17 October - 31 October 2026</p>
        </div>
        )}
        </div>
        {committee && (
        <button type="button">
          Edit item
        </button>
      )}
      </div>
    </div>
  );
}