import Header from "@/src/components/header/Header";
import HeaderMobile from "@/src/components/header/HeaderMobile";
import React from "react";

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full gap-3 sm:pt-[43px] pt-1 relative">
      <Header></Header>
      <HeaderMobile></HeaderMobile>
      <div className="content-container h-full flex flex-col gap-4 mx-auto">
        <div className="size-full flex flex-col items-center mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
