"use client";
import Image from "next/image";
import MobileBtnTemplate from "./MobileBtnTemplate";
import homeIcon from "@/src/assets/home-icon.svg";
import Link from "next/link";

export default function HomeBtn() {
  return (
    <MobileBtnTemplate>
      <Link href="/" className="flex relative size-full rounded-full">
        <Image
          className="m-auto"
          aria-selected="false"
          src={homeIcon}
          alt="sort-icon"
        ></Image>
      </Link>
    </MobileBtnTemplate>
  );
}
