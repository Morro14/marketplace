import plusIcon from "@/src/assets/plus-icon-tiny.svg";
import crossIcon from "@/src/assets/cross-icon-tiny.svg";
import Image from "next/image";
import { CSSProperties } from "react";

interface ChipVariant {
  bg?: "gray" | "accent" | "transparent";
  shape?: "rect" | "rounded";
  icon?: "cross" | "plus" | "none";
  border?: "none" | "thin";
}
const variantDefault: ChipVariant = {
  bg: "gray",
  shape: "rounded",
  icon: "none",
  border: "none",
};
type ChipVariantStyles = {
  [P in keyof ChipVariant]?: {
    [V in NonNullable<ChipVariant[P]>]?: CSSProperties;
  };
};
export default function Chip({
  variant,
  label,
  attrs,
  styleProps,
}: {
  variant: ChipVariant;
  label: string;
  attrs?: React.HTMLAttributes<HTMLDivElement>;
  styleProps?: React.CSSProperties;
}) {
  const variantsMerged = { ...variantDefault, ...variant };
  const styles: ChipVariantStyles = {
    bg: {
      gray: {
        backgroundColor: "var(--color-gray-light)",
      },

      accent: { backgroundColor: "var(--color-accent-2)" },
      transparent: { backgroundColor: "#00000000" },
    },
    shape: {
      rounded: { borderRadius: "16px" },
      rect: { borderRadius: "0px" },
    },
    border: {
      thin: { border: "1px solid var(--color-primary)" },
      none: { border: "none" },
    },
  };
  type Icons = Record<NonNullable<ChipVariant["icon"]>, any>;
  const icons: Icons = {
    cross: crossIcon,
    plus: plusIcon,
    none: "",
  };

  const applyStyle = () => {
    const keys = Object.keys(styles) as Array<keyof ChipVariant>;
    const stylesAcc = keys.reduce((prev, key) => {
      const selectedVariant = variantsMerged[key];
      const propStyle = styles[key] as
        Record<string, CSSProperties | undefined> | undefined;
      if (selectedVariant && propStyle) {
        const style = propStyle[selectedVariant];
        return { ...prev, ...style };
      }
      return prev;
    }, {});
    return stylesAcc;
  };
  return (
    <div
      {...attrs}
      className={`cursor-pointer  
        flex items-center gap-2 h-7 
        text-sm font-semibold pr-4 
        ${variant.icon !== "none" ? "pl-2" : "pl-4"}`}
      style={{ ...applyStyle(), ...styleProps }}
    >
      {variant.icon === "none" ? (
        ""
      ) : (
        <Image
          src={icons[variantsMerged.icon as NonNullable<keyof Icons>]}
          alt={variant.icon === "cross" ? "chip-cross-tiny" : "chip-plus-tiny"}
        ></Image>
      )}
      <span className="text-nowrap">{label}</span>
    </div>
  );
}
