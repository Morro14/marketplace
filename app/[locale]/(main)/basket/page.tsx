import BasketSummaryEmbedded from "@/src/components/basket/BasketSummaryImbedded";
import Entries from "@/src/components/basket/Entries";
import TopBar from "@/src/components/basket/TopBar";
import { getBasketWithProducts } from "@/src/data/basketQueries";

export default async function Basket() {
  const basket = await getBasketWithProducts();
  return (
    <div className="w-full flex ">
      <div className="flex gap-7">
        <div className="flex w-full flex-col 2xl:w-[1152px]">
          <TopBar></TopBar>
          <Entries basket={basket}></Entries>
        </div>
        <BasketSummaryEmbedded></BasketSummaryEmbedded>
      </div>
    </div>
  );
}
