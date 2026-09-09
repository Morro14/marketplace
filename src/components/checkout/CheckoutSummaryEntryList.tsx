"use client";
import { BasketEntryWithProduct } from "@/src/data/basketTypes";
import { CURRENCY_SIGN } from "@/src/utils/appVars";
import { calcCost, formatCost } from "@/src/utils/basketUtils";

export default function CheckoutSummaryEntryList({
  basket,
}: {
  basket: BasketEntryWithProduct[];
}) {
  return (
    <table>
      <caption className="hidden">Basket entries</caption>
      <tbody>
        {basket.map((entry, i) => {
          return (
            <tr key={i} className="text-primary">
              <td>{`(${entry.count}) ${entry.product.name}`}</td>
              <td>{`${CURRENCY_SIGN} ${formatCost(calcCost(entry.product.price, entry.count))}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
