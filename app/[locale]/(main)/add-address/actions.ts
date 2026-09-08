"use server";

import { redirect } from "@/src/i18n/navigations";
import {
  type AddAddressFormData,
  validateAddAddressForm,
} from "@/src/utils/validation";
import { getLocale } from "next-intl/server";

export type AddAddressFormState = {
  errors: Partial<Record<keyof AddAddressFormData, string>>;
};

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

  // Add address persistence here.
  console.log("Address form is valid");
  redirect({ href: "/", locale: await getLocale() });

  return { errors: {} };
}