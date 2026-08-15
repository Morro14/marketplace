import Header from "@/src/components/header/Header";
import Hero from "@/src/components/index/Hero";
import ProductsNav from "@/src/components/products/nav/ProductsNav";
import React from "react";

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full gap-3">
      <Header></Header>
      <div className="content-container flex flex-col gap-4 mx-auto">
        <Hero></Hero>
        <ProductsNav></ProductsNav>
        <div className="size-full flex flex-col items-center mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
