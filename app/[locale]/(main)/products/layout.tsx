import Hero from "@/src/components/index/Hero";
import ProductsNav from "@/src/components/products/nav/ProductsNav";
import { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="content-container h-full flex flex-col gap-4 mx-auto">
      <Hero></Hero>
      <ProductsNav></ProductsNav>
      {children}
    </div>
  );
}
