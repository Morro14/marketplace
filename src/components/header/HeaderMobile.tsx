import BurgerMenu from "./BurgerMenu";
import SortModal from "../products/nav/SortModal";
import FilterModal from "../products/nav/FilterModal";
import BasketMobileBtn from "../basket/BasketMobileBtn";
import { db } from "@/db";
import SortNav from "./SortNav";

export default async function HeaderMobile() {
  // TODO move fetching data to a dedicated component
  const categories = await db.query.categories.findMany({
    orderBy: (category, { asc }) => asc(category.name),
  })
  return (
    <div className="fixed max-sm:flex hidden justify-between items-center bottom-0 w-screen bg-bg z-50 h-14 px-3">
      <BurgerMenu variant="mobile"></BurgerMenu>
      <div className="flex items-end gap-3">
        <FilterModal categories={categories}></FilterModal>
        <SortNav></SortNav>
        <BasketMobileBtn></BasketMobileBtn>
      </div>
    </div>
  );
}
