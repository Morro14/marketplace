"use client";
import HeaderNav from "./HeaderNav";
import HeaderNavRight from "./HeaderNavRight";

export default function Header() {
  return (
    <header className="w-full fixed z-50 top-0 sm:flex hidden bg-[#00162D] items-center px-3 justify-between border-b-3 border-accent">
      <div className="content-container h-[40px] mx-auto flex justify-between items-center">
        <HeaderNav></HeaderNav>
        <HeaderNavRight></HeaderNavRight>
      </div>
    </header>
  );
}
