
import {BagCard} from "./BagCard";
import type {BagListProps} from "../types/BagListProps";

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