"use client";

import { useTranslations } from "next-intl";

export default function RemoveEntryDialog({
  confirmAction,
  cancelAction,
}: {
  confirmAction: () => void;
  cancelAction: () => void;
}) {
  const t = useTranslations();
  return (
    <div className="size-full absolute flex top-0 left-0 z-15 bg-[#ffffffbf]">
      <div className="m-auto">
        <div className="text-lg">{t("Remove the item?")}</div>
        <div className="w-full flex justify-between">
          <button
            className="btn__accent px-2 h-7 rounded-lg"
            onClick={confirmAction}
          >
            {t("Remove")}
          </button>
          <button
            onClick={cancelAction}
            className="btn__secondary px-2 h-7 rounded-lg"
          >
            {t("Keep")}
          </button>
        </div>
      </div>
    </div>
  );
}
