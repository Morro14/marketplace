import logoBg from "@/src/assets/logo-bg.png";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="w-full flex gap-3 mt-2">
      <div
        className={`h-[170px] w-[274px] border-3 border-primary font-serif font-bold text-2xl text-center flex relative`}
      >
        <Image
          src={logoBg}
          alt="logo-bg"
          className="absolute object-cover border-none size-full"
        ></Image>
        <span className="mt-[12%] mx-auto z-10 text-white">Vasily's Farm</span>
      </div>
      <div className="bg-gray-200 grow"></div>
    </div>
  );
}
