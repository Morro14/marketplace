import Input from "@/src/components/form/Input"
import { getTranslations } from "next-intl/server"

export default async function AddAddress() {
  const t = await getTranslations()
  return <div className="2xl:w-[954px] bg-bg drop-shadow-lg min-h-200 flex justify-center">
    <div className="flex flex-col 2xl:w-145 gap-4 py-4">
      <h2 className="text-2xl font-serif">{t("Add delivery information")}</h2>
      <Input label={t("Full name *")} name={"username"} type="text" placeholder={t("Enter your full name")}></Input>
      <Input label={t("Email address *")} name={"email"} type="text" placeholder={t("Enter your email")}></Input>
      <Input label={t("Phone number")} name={"phone-number"} type="text" placeholder={t("Enter your phone number")}></Input>
      <h4 className="text-lg">{t("Address")}</h4>
      <div className="flex gap-2 w-full ">
        <div className="basis-full">
          <Input label={t("Apartment")} name={"apartment"} type="text" placeholder={t("Apartment number")}></Input>
        </div>
        <div className="basis-full">
          <Input label={t("Building *")} name={"building"} type="text" placeholder={t("Building number")}></Input>
        </div>
      </div>
      <Input label={t("Street name *")} name={"street"} type="text" placeholder={t("Street name")}></Input>
      <div className="flex gap-2 w-full ">
        <div className="basis-full">
          <Input label={t("Town/City *")} name={"town"} type="text" placeholder={t("Town name")}></Input>
        </div>
        <div className="basis-full">
          <Input label={t("Province *")} name={"province"} type="text" placeholder={t("Province name")}></Input>
        </div>
      </div>
      <Input label={t("State *")} name={"state"} type="text" placeholder={t("State")}></Input>
    </div>
  </div>
}
