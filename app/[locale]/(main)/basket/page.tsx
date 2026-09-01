import BasketEntry from "@/src/components/basket/BasketEntry";
import TopBar from "@/src/components/basket/TopBar";
import { getBasketWithProducts } from "@/src/data/basketQueries";

export default async function Basket() {
  const basket = await getBasketWithProducts();
  console.log("basket", basket);
  return (
    <div className="w-full flex ">
      <div className="flex flex-col rounded-xl drop-shadow-lg bg-bg">
        <TopBar></TopBar>
        {basket.map((item, i) => (
          <BasketEntry
            key={`basket-entry-${i}`}
            basketEntry={item}
            index={i}
            size={basket.length}
          ></BasketEntry>
        ))}
      </div>
    </div>
  );
}
