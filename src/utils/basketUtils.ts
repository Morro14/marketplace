import { AppDispatch } from "@/src/state/store";
import { setProductCount } from "@/src/state/basketSlice";
import { getBasketProductsStock, ProductBasketStatus } from "@/src/api/basket";

/**
 * Updates the Redux state with product data from a ProductBasketStatus response
 * This syncs both product information and count in one action
 */
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

/**
 * Fetches and updates product data for all products in the basket
 * This is useful for periodic updates and checkout validation
 */
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
