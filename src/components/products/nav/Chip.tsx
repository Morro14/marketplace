import plusIcon from "@/src/assets/plus-icon-tiny.svg";
import crossIcon from "@/src/assets/cross-icon-tiny.svg";
import Image from "next/image";

interface ChipVariant {
  bg: "gray" | "accent" | "transparent";
  shape: "square" | "rounded";
  icon: "cross" | "plus";
  border?: boolean;
}
export default function Chip({
  variant,
  label,
  attrs,
}: {
  variant: ChipVariant;
  label: string;
  attrs?: React.HTMLAttributes<HTMLDivElement>;
}) {
  const bgColors = {
    gray: "bg-gray-light",
    accent: "bg-accent-2",
    transparent: "bg-transparent",
  };
  const icons = { cross: crossIcon, plus: plusIcon, none: "" };
  const rounded = { square: "rounded-0", rounded: "rounded-full" };
  return (
    <div
      {...attrs}
      className={`cursor-pointer ${variant.border ? "border border-primary" : ""} flex items-center gap-2 ${bgColors[variant.bg]} h-7 md:h-8 text-sm md:text-base ${rounded[variant.shape]} font-medium pr-4 pl-2`}
    >
      <Image
        src={icons[variant.icon]}
        alt={variant.icon === "cross" ? "chip-cross-tiny" : "chip-plus-tiny"}
      ></Image>
      <span>{label}</span>
    </div>
  );
}
