"use client";

import { BasketItemWithProduct } from "@/src/state/basketSlice";
import { ReactNode } from "react";

export default function Entries({
  basket,
  children,
}: {
  basket: BasketItemWithProduct[];
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
