import BasketSummaryEmbedded from "@/src/components/basket/BasketSummaryImbedded";
import Entries from "@/src/components/basket/Entries";
import TopBar from "@/src/components/basket/TopBar";
import { getBasketWithProducts } from "@/src/data/basketQueries";

export default async function Basket() {
  const basket = await getBasketWithProducts();
  return (
    <div className="flex w-full lg:flex-row max-lg:flex-col lg:gap-5 gap-3">
      <div className="flex w-full flex-col 2xl:w-[1152px] max-sm:h-[calc(100vh-148px)] max-lg:h-[calc(100dvh-135px)]">
        <TopBar></TopBar>
        <Entries basket={basket}></Entries>
      </div>
      <BasketSummaryEmbedded></BasketSummaryEmbedded>
    </div>
  );
}
