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
    <div>
      {basketState.map((item, i) => (
        <BasketEntry
          key={`basket-entry-${i}`}
          basketEntry={item}
          index={i}
          size={basket.length}
        ></BasketEntry>
      ))}
    </div>
  );
}
