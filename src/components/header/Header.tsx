import HeaderNav from "./HeaderNav";
import { useTranslations } from "next-intl";
import HeaderNavRight from "./HeaderNavRight";
import Link from "next/link";

export default function Header() {
  const t = useTranslations("Header");
  return (
    <header className="w-full fixed z-50 top-0 sm:flex hidden bg-[#00162D] items-center px-3 justify-between border-b-3 border-accent">
      <div className="content-container h-[40px] mx-auto flex justify-between items-center">
        <HeaderNav></HeaderNav>
        <HeaderNavRight></HeaderNavRight>
      </div>
    </header>
  );
}
