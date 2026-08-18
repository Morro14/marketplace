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
      className="px-3 py-0.5 font-sm font-sans font-medium outline-2 
      outline-primary -outline-offset-4 rounded-lg opacity-0 group-hover:opacity-100
      transition-opacity duration-100 group-hover:cursor-pointer
      text-primary bg-white"
    >
      {t("Quick view")}
    </div>
  );
}
