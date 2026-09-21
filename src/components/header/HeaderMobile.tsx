import BurgerMenu from "./BurgerMenu";
import BasketMobileBtn from "../basket/BasketMobileBtn";
import { db } from "@/db";
import SortNav from "./SortNav";
import FilterNav from "./FilterNav";

export default async function HeaderMobile() {
  // TODO move fetching data to a dedicated component
  const categories = await db.query.categories.findMany({
    orderBy: (category, { asc }) => asc(category.name),
  });
  return (
    <div className="w-screen max-sm:flex hidden bottom-0 bg-bg z-50 h-14">
      <div className=" mx-auto justify-between items-center w-[352px]">
        <BurgerMenu variant="mobile"></BurgerMenu>
        <div className="flex items-end gap-3">
          <FilterNav categories={categories}></FilterNav>
          <SortNav></SortNav>
          <BasketMobileBtn></BasketMobileBtn>
        </div>
      </div>
    </div>
  );
}
