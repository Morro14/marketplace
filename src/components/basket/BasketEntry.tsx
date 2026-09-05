import Image from "next/image";
import demoImg from "@/src/assets/product-demo.jpeg";
import { BasketEntryWithProduct } from "@/src/data/basketTypes";
import Count from "./Count";
import { heartEmpty, bin } from "./icons";
import { calcCost, formatCost } from "@/src/utils/basketUtils";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import { useEffect, useRef, useState } from "react";

export default function BasketEntry({
  basketEntry,
  index,
  size,
}: {
  basketEntry: BasketEntryWithProduct;
  index: number;
  size: number;
}) {
  const product = basketEntry.product;
  const entryCostVal = calcCost(product.price, basketEntry.count);
  const entryCost = formatCost(entryCostVal);
  const CURRENCY_SIGN = CURRENCY_SIGNS[CURRENCY];
  const [prevCost, setPrevCost] = useState(entryCostVal);
  const snapPrevCost = useRef(entryCost);
  // console.log("entryCost", entryCost);
  const costDiv = useRef<null | HTMLDivElement>(null);
  const costDivPrev = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (!costDiv.current || !costDivPrev.current) return;
    if (prevCost === entryCostVal) return;
    costDiv.current.style.transitionDuration = "0ms";
    costDiv.current.style.opacity = "0";
    costDivPrev.current.style.transitionDuration = "0ms";
    costDivPrev.current.style.opacity = "1";
    costDivPrev.current.style.translate = "0px 0px";
    if (prevCost < entryCostVal) {
      costDiv.current.style.translate = "0px 28px";
    } else {
      costDiv.current.style.translate = "0px -28px";
    }

    window.requestAnimationFrame(() => {
      if (!costDivPrev.current || !costDiv.current) return;
      costDiv.current.style.transitionDuration = "300ms";
      costDiv.current.style.opacity = "1";
      costDivPrev.current.style.transitionDuration = "300ms";
      costDivPrev.current.style.opacity = "0";
      if (prevCost < entryCostVal) {
        costDiv.current.style.translate = "0px 0px";
        costDivPrev.current.style.translate = "0px -28px";
      } else {
        costDiv.current.style.translate = "0px 0px";
        costDivPrev.current.style.translate = "0px 28px";
      }
    });
    setPrevCost(entryCostVal);
    setTimeout(() => {}, 300);
    snapPrevCost.current = entryCost;
  }, [entryCost]);
  return (
    <div
      className={`flex justify-between p-3 gap-3 h-[162px] w-[1152px] ${index < size ? "border-b border-gray-light" : ""}`}
    >
      {/* RESPONSIVE */}
      <div className="flex gap-3">
        <div className="h-full rounded-lg overflow-hidden">
          <Image
            src={demoImg}
            loading="eager"
            width={126}
            alt="demo-img"
            className="object-cover h-full"
            style={{ width: "auto" }}
          ></Image>
        </div>
        <div className="flex flex-col justify-between pb-1.5">
          <div>
            <div className="text-lg">{product.name}</div>
            <div className="text-sm">{product.description}</div>
          </div>
          <span className="text-gray-passive">{`${product.quantity} ${product.priceUnit}`}</span>
          <div className="flex gap-2">
            <div className="relative top-px">{heartEmpty}</div>
            <div>{bin}</div>
          </div>
        </div>
      </div>
      {/* RESPONSIVE */}
      <div className="flex 2xl:w-60 justify-between">
        <Count product={basketEntry.product}></Count>
        <div className="flex gap-1">
          <div className="text-xl">{CURRENCY_SIGN}</div>
          <div className="basket-entry-cost text-xl w-18 relative">
            <div
              className="absolute"
              style={{
                transitionProperty: "translate, opacity",
                transitionDuration: "300ms",
              }}
              ref={costDivPrev}
            >{`${snapPrevCost.current}`}</div>
            <div
              className=""
              style={{
                transitionProperty: "translate, opacity",
                transitionDuration: "300ms",
              }}
              ref={costDiv}
            >{`${entryCost}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
