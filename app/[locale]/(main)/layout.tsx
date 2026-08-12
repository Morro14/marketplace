import Header from "@/src/components/header/Header";
import React from "react";

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header></Header>
      <div className="content-container size-full flex flex-col items-center mx-auto">
        {children}
      </div>
    </div>
  );
}
