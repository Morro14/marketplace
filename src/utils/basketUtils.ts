import { AppDispatch } from "@/src/state/store";
import { BasketEntry, setProductCount } from "@/src/state/basketSlice";
import { getBasketProductsStock, ProductBasketStatus } from "@/src/api/basket";
import { Product } from "../data/productTypes";

export function updateBasketProductData(
  dispatch: AppDispatch,
  status: ProductBasketStatus,
) {
  dispatch(
    setProductCount({
      productId: status.productId,
      count: status.count,
    }),
  );
}
// Add Product instances to the BasketEntry's for easier access to product data
export function populateBasketProductData(basket: BasketEntry[], products: Product[]) {

  const basketClone = structuredClone(basket) as BasketEntry[]
  const basketWithProducts = basketClone.map((entry) => {
    entry.product = products.find(p => p.id === entry.productId)
    return entry
  })
  return basketWithProducts
}
export async function fetchAndUpdateBasketProductsStock(
  productIds: number[],
  dispatch: AppDispatch,
) {
  if (productIds.length === 0) return;

  try {
    const stockMap = await getBasketProductsStock(productIds);

    stockMap.forEach((status) => {
      dispatch(
        setProductCount({
          productId: status.productId,
          count: status.count,
        }),
      );
    });
  } catch (error) {
    console.error("Failed to update basket products stock:", error);
  }
}

export function calcCost(price: number | undefined, count: number): number {
  {
    /* const calc logic*/
  }
  const price_ = price ? price : 0
  const value = price_ * count;
  const floor = Math.floor(value);
  let result = value.toString();
  if (value !== floor) {
    result = value.toFixed(2);
  }

  return value;
}
export function formatCost(value_: number | undefined): string {
  const value = value_ ? value_ : 0
  const floor = Math.floor(value);
  let result = value.toString();
  if (value !== floor) {
    result = value.toFixed(2);
  }
  return result;
}
