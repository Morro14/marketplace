import { useTranslations } from "next-intl";
import Image from "next/image";
import loginIcon from "@/src/assets/login-icon.svg";
import basketIcon from "@/src/assets/basket-icon-40x40.png";

export default function HeaderNavRight() {
  const t = useTranslations();
  return (
    <div className="flex gap-4 relative top-[14px]">
      <button className="flex items-center gap-5 bg-[#eee] h-8 rounded-2xl font-serif font-bold px-3 border-b-3 border-primary">
        <span className="mt-0.5">{t("login")}</span>
        <Image src={loginIcon} alt="login-icon"></Image>
      </button>
      <button className="flex items-center gap-5 bg-[#eee] h-8 rounded-2xl font-serif font-bold px-3 border-b-3 border-primary">
        <span className="mt-0.5">{t("basket")}</span>
        <Image className="-mt-2" src={basketIcon} alt="login-icon"></Image>
      </button>
    </div>
  );
}
