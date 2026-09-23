import logoBg from "@/src/assets/logo-bg.png";
import engraving from "@/src/assets/engraving-1.png";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="w-full flex max-sm:flex-col sm:gap-3 gap-2 sm:mt-2 sm:pt-0 pt-4">
      <div
        className={`h-[170px] sm:w-[274px] w-full border-3 border-primary font-serif font-bold text-2xl text-center flex relative`}
      >
        <Image
          src={engraving}
          alt="logo-bg"
          className="absolute object-cover border-none size-full"
        ></Image>
        <Image
          src={logoBg}
          alt="logo-bg"
          className="absolute object-cover border-none size-full"
        ></Image>
        <span className="mt-[12%] mx-auto z-10 text-white">Vasily's Farm</span>
      </div>
      <div className="sm:block hidden bg-gray-200 grow"></div>
      <div className="sm:hidden block h-8 w-full bg-gray-light rounded-lg"></div>
    </div>
  );
}
