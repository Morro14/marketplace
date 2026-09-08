"use server";

import { saveDeliveryInfo } from "@/src/data/deliveryQueries";
import type { DeliveryInfoInput } from "@/src/data/deliveryTypes";
import {
  type AddAddressFormData,
  validateAddAddressForm,
} from "@/src/utils/validation";
import { redirect } from "next/navigation";

export type AddAddressFormState = {
  errors: Partial<Record<keyof AddAddressFormData, string>>;
};

function getFormString(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function handleAddAddress(
  _previousState: AddAddressFormState,
  formData: FormData,
): Promise<AddAddressFormState> {
  const validation = validateAddAddressForm(formData);
  const errors = Object.fromEntries(
    Object.entries(validation)
      .filter(([, result]) => !result.valid)
      .map(([field, result]) => [field, result.message]),
  ) as AddAddressFormState["errors"];
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const formObj: DeliveryInfoInput = {
    fullName: getFormString(formData, "username"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone-number") || null,
    address: {
      apartment: getFormString(formData, "apartment") || null,
      building: getFormString(formData, "building"),
      street: getFormString(formData, "street"),
      town: getFormString(formData, "town"),
      province: getFormString(formData, "province"),
      state: getFormString(formData, "country"),
    },
  };

  await saveDeliveryInfo(formObj);
  redirect("/checkout");
}
