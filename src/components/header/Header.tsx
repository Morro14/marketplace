import Link from "next/link";
import HeaderNav from "./HeaderNav";
import { useTranslations } from "next-intl";
import HeaderNavRight from "./HeaderNavRight";

export default function Header() {
  const t = useTranslations("Header");
  return (
    <header className="w-full bg-[#00162D] flex items-center px-3 justify-between relative border-b-3 border-accent">
      <Link
        className="absolute left-3 text-white font-serif text-xl font-bold"
        href="/"
      >
        {t("Marketplace")}
      </Link>
      <div className="content-container h-[40px] mx-auto flex justify-between items-center">
        <HeaderNav></HeaderNav>
        <HeaderNavRight></HeaderNavRight>
      </div>
    </header>
  );
}
