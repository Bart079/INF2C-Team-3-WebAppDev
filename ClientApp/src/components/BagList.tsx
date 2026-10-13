import type { Bag } from "../types/Bag";
import type { Bean } from "../types/Bean";
import {BagCard} from "./BagCard";

type BagListProps = {
  bags: Bag[];
  beans: Bean[];
};

export function BagList({ bags, beans }: BagListProps) {
  return (
    <div className="card_list"> 
        {bags.map((bag) => (
            <BagCard
                key={bag.id}
                bag={bag}
                bean={beans.find((bean) => bean.id === bag.beanId)}
            />
        ))}
    </div>
    );
}