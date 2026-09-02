import Entries from "@/src/components/basket/Entries";
import TopBar from "@/src/components/basket/TopBar";
import { getBasketWithProducts } from "@/src/data/basketQueries";

export default async function Basket() {
  const basket = await getBasketWithProducts();
  return (
    <div className="w-full flex ">
      <div className="flex w-full flex-col rounded-xl drop-shadow-lg bg-bg">
        <TopBar></TopBar>
        <Entries basket={basket}></Entries>
      </div>
    </div>
  );
}
