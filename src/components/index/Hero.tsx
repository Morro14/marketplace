import adNarrow from "@/src/assets/ad-section-narrow.png";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HeroCarousel from "../HeroCarousel";
export default async function Hero() {
  const t = await getTranslations();
  return (
    <div className="w-full flex max-sm:flex-col sm:gap-3 gap-2 sm:mt-2 sm:pt-0 pt-4">
      <HeroCarousel></HeroCarousel>
      <div className="sm:block hidden bg-gray-200 grow"></div>
      <div className="relative cursor-pointer">
        <span className="absolute left-3 top-1 z-5 text-white text-lg font-serif font-bold">
          {t("Small ad section")}
        </span>
        <span className="absolute left-3 bottom-1 z-5 text-white text-sm font-serif font-bold">
          Fusce in fringilla nulla, ac eleifend dui
        </span>
        <Image
          src={adNarrow}
          alt="ad-narrow"
          className="sm:hidden block w-full bg-gray-light rounded-b-lg brightness-75 contrast-125"
        ></Image>
      </div>
    </div>
  );
}
