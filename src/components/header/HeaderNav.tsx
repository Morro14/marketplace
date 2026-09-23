"use  client";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { useTranslations } from "next-intl";
import Tooltip from "../Tooltip";
import { handleTooltipTouch } from "@/src/utils/components/tooltipTouch";

export default function HeaderNav() {
  const t = useTranslations();
  return (
    <div className="flex h-7 relative text-lg gap-3 ">
      <BurgerMenu></BurgerMenu>
      <Link
        className="lg:hidden block left-3 text-white font-serif font-bold"
        href="/"
      >
        {t("Marketplace")}
      </Link>
      <div className="gap-3 lg:flex hidden">
        {/* disabled for demo; added tooltip */}
        <div
          onTouchStart={handleTooltipTouch}
          className="header-nav-link group relative"
        >
          {t("About us")}
          <Tooltip
            styleProps={{ top: 24 }}
            content={t("This page is not implemented yet")}
          ></Tooltip>
        </div>
        <Link className="header-nav-link" href={"/products"}>
          {t("Our products")}
        </Link>
        {/* disabled for demo; added tooltip */}
        <div
          onTouchStart={handleTooltipTouch}
          className="header-nav-link group relative"
        >
          {t("Become our partners")}
          <Tooltip
            content={t("This page is not implemented yet")}
            styleProps={{ top: 24 }}
          ></Tooltip>
        </div>
      </div>
    </div>
  );
}
