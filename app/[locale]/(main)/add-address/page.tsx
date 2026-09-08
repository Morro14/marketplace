import { getDeliveryInfo } from "@/src/data/deliveryQueries";
import type { DeliveryInfoWithAddress } from "@/src/data/deliveryTypes";
import AddAddressForm from "./AddAddressForm";

export default async function AddAddress() {
  const deliveryInfo: DeliveryInfoWithAddress | null = await getDeliveryInfo();
  return (
    <div className="2xl:w-[954px] bg-bg drop-shadow-lg h-auto mt-6 flex flex-col items-center">
      <AddAddressForm deliveryInfo={deliveryInfo} />
    </div>
  );
}
