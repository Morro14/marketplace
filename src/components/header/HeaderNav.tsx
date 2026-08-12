import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { useTranslations } from "next-intl";

export default function HeaderNav() {
  const t = useTranslations();
  return (
    <div className="flex relative top-3 gap-3">
      <BurgerMenu></BurgerMenu>
      <Link
        className="header-nav-link text-xl text-white font-serif font-bold"
        href={"/about"}
      >
        {t("About us")}
      </Link>
      <Link
        className="header-nav-link text-xl text-white font-serif font-bold"
        href={"/products"}
      >
        {t("Our products")}
      </Link>
      <Link
        className="header-nav-link text-xl text-white font-serif font-bold"
        href={"/for-partners"}
      >
        {t("Become our partners")}
      </Link>
    </div>
  );
}
