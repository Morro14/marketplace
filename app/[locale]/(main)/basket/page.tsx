import BasketEntry from "@/src/components/basket/BasketEntry";
import TopBar from "@/src/components/basket/TopBar";
import { getBasket, getBasketWithProducts } from "@/src/data/basketQueries";

export default async function Basket() {
  const basket = await getBasketWithProducts();
  return (
    <div className="w-full flex">
      <div className="flex flex-col">
        <TopBar></TopBar>
        {basket.map((item, i) => (
          <BasketEntry
            key={`basket-entry-${i}`}
            basketEntry={item}
          ></BasketEntry>
        ))}
      </div>
    </div>
  );
}
