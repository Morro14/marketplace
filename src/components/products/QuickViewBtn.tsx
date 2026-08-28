import { useTranslations } from "next-intl";

export default function QuickViewBtn({
  handleQuickViewClick,
}: {
  handleQuickViewClick: () => void;
}) {
  const t = useTranslations();
  return (
    <div
      onClick={handleQuickViewClick}
      className="my-auto px-3 py-0.5 font-sm font-sans font-medium h-[30px] 
      rounded-xl opacity-0 group-hover:opacity-100
      transition-[opacity,background-color] duration-100 group-hover:cursor-pointer
      text-white bg-[#00000070]  hover:bg-[#00000090] "
    >
      {t("Quick view")}
    </div>
  );
}
