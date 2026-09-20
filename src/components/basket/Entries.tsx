"use client";

import { BasketEntryWithProduct } from "@/src/data/basketTypes";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { selectBasket, setBasket } from "@/src/state/basketSlice";
import { useEffect } from "react";
import BasketEntry from "./BasketEntry";

export default function Entries({
  basket,
}: {
  basket: BasketEntryWithProduct[];
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBasket(basket));
  }, [basket, dispatch]);
  const basketState = useAppSelector(selectBasket);
  return (
    <div className="basket-entries bg-bg rounded-b-lg">
      {basketState.map((item, i) => (
        <BasketEntry
          key={`basket-entry-${item.productId}`}
          basketEntry={item}
          index={i}
          size={basket.length}
        ></BasketEntry>
      ))}
    </div>
  );
}
