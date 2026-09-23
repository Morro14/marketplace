"use client";

import CountryInput from "@/src/components/addAddress/CountryInput";
import Input from "@/src/components/form/Input";
import Form from "next/form";
import { useActionState, useState } from "react";
import { handleAddAddress, type AddAddressFormState } from "./actions";
import { useTranslations } from "next-intl";
import {
  type AddAddressFormData,
  validateAddAddressForm,
} from "@/src/utils/validation";
import type { DeliveryInfoWithAddress } from "@/src/data/deliveryTypes";

const initialAddAddressFormState: AddAddressFormState = {
  errors: {},
};

export default function AddAddressForm({
  deliveryInfo,
}: {
  deliveryInfo: DeliveryInfoWithAddress | null;
}) {
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(
    handleAddAddress,
    initialAddAddressFormState,
  );
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<keyof AddAddressFormData, string>>
  >({});

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    const validation = validateAddAddressForm(
      new FormData(event.currentTarget),
    );
    const errors = Object.fromEntries(
      Object.entries(validation)
        .filter(([, result]) => !result.valid)
        .map(([field, result]) => [field, result.message]),
    ) as Partial<Record<keyof AddAddressFormData, string>>;

    setClientErrors(errors);

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
    }
  }

  const errors = { ...state?.errors, ...clientErrors };
  const address = deliveryInfo?.address;

  return (
    <Form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6 pt-6 pb-12 px-2"
    >
      <div className="flex flex-col 2xl:w-145 gap-6 ">
        <h2 className="text-2xl font-serif">{t("Add delivery information")}</h2>
        <Input
          label={t("Full name *")}
          error={errors.username}
          attrs={{
            name: "username",
            type: "text",
            placeholder: t("Enter your full name"),
            defaultValue: deliveryInfo?.fullName,
          }}
        />
        <Input
          label={t("Email address *")}
          error={errors.email}
          attrs={{
            name: "email",
            type: "email",
            placeholder: t("Enter your email"),
            defaultValue: deliveryInfo?.email,
          }}
        />
        <Input
          label={t("Phone number")}
          error={errors["phone-number"]}
          attrs={{
            name: "phone-number",
            type: "text",
            placeholder: t("Enter your phone number"),
            defaultValue: deliveryInfo?.phone ?? "",
          }}
        />
        <h4 className="text-lg">{t("Address")}</h4>
        <div className="flex gap-2 w-full">
          <div className="basis-full">
            <Input
              label={t("Apartment")}
              error={errors.apartment}
              attrs={{
                name: "apartment",
                type: "text",
                placeholder: t("Apartment number"),
                defaultValue: address?.apartment ?? "",
              }}
            />
          </div>
          <div className="basis-full">
            <Input
              label={t("Building *")}
              error={errors.building}
              attrs={{
                name: "building",
                type: "text",
                placeholder: t("Building number"),
                defaultValue: address?.building,
              }}
            />
          </div>
        </div>
        <Input
          label={t("Street name *")}
          error={errors.street}
          attrs={{
            name: "street",
            type: "text",
            placeholder: t("Street name"),
            defaultValue: address?.street,
          }}
        />
        <div className="flex gap-2 w-full">
          <div className="basis-full">
            <Input
              label={t("Town/City *")}
              error={errors.town}
              attrs={{
                name: "town",
                type: "text",
                placeholder: t("Town name"),
                defaultValue: address?.town,
              }}
            />
          </div>
          <div className="basis-full">
            <Input
              label={t("Province *")}
              error={errors.province}
              attrs={{
                name: "province",
                type: "text",
                placeholder: t("Province name"),
                defaultValue: address?.province,
              }}
            />
          </div>
        </div>
        <CountryInput
          error={errors.country}
          initialValue={address?.state ?? ""}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn__accent px-4 h-8 rounded-lg shrink disabled:opacity-50 mt-3"
      >
        {t("Save address")}
      </button>
    </Form>
  );
}
