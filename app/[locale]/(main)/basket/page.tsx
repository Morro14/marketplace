import BasketSummaryEmbedded from "@/src/components/basket/BasketSummaryImbedded";
import Entries from "@/src/components/basket/Entries";
import TopBar from "@/src/components/basket/TopBar";
import { getBasketWithProducts } from "@/src/data/basketQueries";

export default async function Basket() {
  const basket = await getBasketWithProducts();
  return (
    <div className="w-full flex ">
      <div className="flex w-full sm:flex-row max-sm:flex-col sm:gap-7 gap-3">
        <div className="flex w-full flex-col 2xl:w-[1152px] h-[calc(100dvh-218px)] overflow-y-scroll">
          <TopBar></TopBar>
          <Entries basket={basket}></Entries>
        </div>
        <BasketSummaryEmbedded></BasketSummaryEmbedded>
      </div>
    </div>
  );
}
