import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { useTranslations } from "next-intl";

export default function HeaderNav() {
  const t = useTranslations();
  return (
    <div className="flex h-7 relative text-lg gap-3">
      <BurgerMenu></BurgerMenu>
      <Link className="header-nav-link" href={"/about"}>
        {t("About us")}
      </Link>
      <Link className="header-nav-link" href={"/products"}>
        {t("Our products")}
      </Link>
      <Link className="header-nav-link" href={"/for-partners"}>
        {t("Become our partners")}
      </Link>
    </div>
  );
}
