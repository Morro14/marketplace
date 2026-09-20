import Image from "next/image";
import demoImg from "@/src/assets/product-demo.jpeg";
import Count from "./Count";
import { heartEmpty, bin } from "./icons";
import { calcCost, formatCost } from "@/src/utils/basketUtils";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import { useEffect, useRef, useState } from "react";
import type { BasketEntry } from "@/src/state/basketSlice";

export default function BasketEntry({
  basketEntry,
  index,
  size,
}: {
  basketEntry: BasketEntry;
  index: number;
  size: number;
}) {
  const product = basketEntry.product;
  const entryCostVal = calcCost(product?.price, basketEntry.count);
  const entryCost = entryCostVal ? formatCost(entryCostVal) : "";
  const CURRENCY_SIGN = CURRENCY_SIGNS[CURRENCY];
  const [prevCost, setPrevCost] = useState(entryCostVal);
  const snapPrevCost = useRef(entryCost);
  // console.log("entryCost", entryCost);
  const costDiv = useRef<null | HTMLDivElement>(null);
  const costDivPrev = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (!costDiv.current || !costDivPrev.current) return;
    if (!entryCostVal || !prevCost) return;
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
    setTimeout(() => {
      snapPrevCost.current = entryCost;
    }, 300);
  }, [entryCost]);
  return (
    <div
      className={`basket-entry flex flex-col justify-between lg:p-3 p-2 w-full ${index < size ? "border-b border-gray-light" : ""}`}
    >
      {/* RESPONSIVE */}
      <div className="flex gap-3 h-full">
        <div className="basket-entry-image rounded-lg overflow-hidden shrink-0">
          <Image
            src={demoImg}
            loading="eager"
            alt="demo-img"
            className="object-cover size-full"
          ></Image>
        </div>
        <div className="flex flex-col justify-between pb-1.5">
          <div>
            <div className="text-lg">{product?.name}</div>
            <div className="text-sm/4">{product?.description}</div>
          </div>
          <span className="text-gray-passive">{`${product?.quantity} ${product?.priceUnit}`}</span>
          <div className="lg:flex hidden gap-2">
            <div className="relative top-px">{heartEmpty}</div>
            <div>{bin}</div>
          </div>
          {/* RESPONSIVE <lg */}
          <div className="lg:hidden flex justify-between items-start gap-3 ">
            {basketEntry.product ? (
              <Count product={basketEntry.product}></Count>
            ) : (
              ""
            )}
            <div className="flex gap-1 h-auto">
              <div className="text-xl">{CURRENCY_SIGN}</div>
              <div className="basket-entry-cost text-xl w-18">
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
      </div>
      {/* RESPONSIVE >lg */}
      <div className="lg:flex hidden xl:flex-row flex-col xl:justify-between items-start xl:gap-5 gap-3 ">
        {basketEntry.product ? (
          <Count product={basketEntry.product}></Count>
        ) : (
          ""
        )}
        <div className="flex gap-1 h-auto">
          <div className="text-xl">{CURRENCY_SIGN}</div>
          <div className="basket-entry-cost text-xl w-18">
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
