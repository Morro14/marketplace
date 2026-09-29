import adNarrow from "@/src/assets/ad-section-narrow.png";
import logo from "@/src/assets/pigs-resized.jpeg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HeroCarousel from "../HeroCarousel";
export default async function Hero() {
  const t = await getTranslations();
  return (
    <div className="hero-section w-full flex max-sm:flex-col sm:gap-3 gap-2 sm:mt-2 sm:pt-0 pt-4">
      <div className="sm:hidden block">
        <HeroCarousel></HeroCarousel>
      </div>
      <div className="sm:block hidden border-3 border-primary relative">
        <div className="absolute font-serif text-white top-7 text-center w-full z-25 font-bold text-2xl">
          {t("Vasiliy's farm")}
        </div>
        <div className="absolute font-serif text-white bottom-5 text-center w-full z-25 font-bold text-base">
          {t("Integer sit amet")}
        </div>
        <Image
          className="brightness-75 h-full min-w-[272px] object-cover"
          src={logo}
          width={272}
          alt="logo"
        ></Image>
      </div>
      <div className="sm:flex hidden relative bg-linear-65 from-gray-200 to-gray-100 grow border-3 border-gray-300">
        <span className="bg-linear-to-r from-white to-gray-light bg-clip-text text-5xl font-semibold font-serif text-transparent mb-4 ml-6 flex items-end">
          Promotion section
        </span>
      </div>
      <div className="relative cursor-pointer sm:hidden flex">
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
