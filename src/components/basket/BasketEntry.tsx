import Image from "next/image";
import demoImg from "@/src/assets/product-demo.jpeg";
import { BasketEntryWithProduct } from "@/src/data/basketTypes";
import Count from "./Count";
import { heartEmpty, bin } from "./icons";

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
      <div className="flex">
        <Count product={basketEntry.product}></Count>
        <span>{}</span>
      </div>
    </div>
  );
}
