import Link from "next/link";
import HeaderNav from "./HeaderNav";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations();
  return (
    <header className="w-full h-[43px] bg-[#00162D] flex items-center px-3 justify-between relative border-b-3 border-accent">
      <Link
        className="absolute left-3 text-white font-serif text-xl font-bold"
        href="/"
      >
        {t("Marketplace")}
      </Link>
      <div className="content-container h-full mx-auto">
        <HeaderNav></HeaderNav>
      </div>
    </header>
  );
}
