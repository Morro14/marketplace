"use client";

import logoBg from "@/src/assets/logo-bg.png";
import engraving from "@/src/assets/engraving-1.png";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const t = useTranslations();
  useEffect(() => {
    if (!emblaRef) return;
    const interval = setInterval(() => emblaApi?.scrollNext(), 1000);
  }, [emblaRef]);
  const arrowLeft = (
    <svg
      width="11"
      height="26"
      viewBox="0 0 11 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.2019 0.554688L1.2019 12.5547L9.2019 24.5547"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
  return (
    <div className="relative">
      <div
        onClick={() => {
          emblaApi?.scrollPrev();
        }}
        className="hero-carousel-arrow top-[74px] left-3"
      >
        {arrowLeft}
      </div>
      <div
        onClick={() => {
          emblaApi?.scrollNext();
        }}
        className="hero-carousel-arrow  right-3 -scale-x-100 "
      >
        {arrowLeft}
      </div>
      <div
        ref={emblaRef}
        className={`embla__viewport h-[170px] sm:w-[274px] w-full border-3 border-primary font-serif font-bold text-2xl text-center flex relative`}
      >
        <div className="embla__container h-full w-full">
          <div className="hero-carousel__slide">
            <div className="absolute font-serif text-white top-7 text-center w-full z-25 font-bold text-2xl">
              {t("Vasiliy's farm")}
            </div>
            <div className="absolute font-serif text-white bottom-5 text-center w-full z-25 font-bold text-base">
              {t("Integer sit amet")}
            </div>
            <Image
              src={engraving}
              alt="logo-bg"
              className="absolute object-cover border-none size-full"
            ></Image>
          </div>
          <div className="hero-carousel__slide">
            <div className="absolute font-serif text-white top-7 text-center w-full z-25 font-bold text-2xl">
              {t("Vasiliy's farm")}
            </div>
            <Image
              src={logoBg}
              alt="logo-bg"
              className="absolute object-cover border-none size-full"
            ></Image>
          </div>
        </div>
        <span className="mt-[12%] mx-auto z-10 text-white">Vasily's Farm</span>
      </div>
    </div>
  );
}
