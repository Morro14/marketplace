import { deliveryAddresses, deliveryInfo } from "@/db/schema";

export type DeliveryInfo = typeof deliveryInfo.$inferSelect;
export type DeliveryAddress = typeof deliveryAddresses.$inferSelect;

export type DeliveryInfoWithAddress = DeliveryInfo & {
  address: DeliveryAddress | null;
};

export type DeliveryInfoInput = {
  fullName: string;
  phone?: string | null;
  email: string;
  address: {
    apartment?: string | null;
    building: string;
    street: string;
    town: string;
    province: string;
    state: string;
  };
};