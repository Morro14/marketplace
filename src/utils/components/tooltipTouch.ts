import type { TouchEvent } from "react";

export const handleTooltipTouch = (e: TouchEvent) => {
  e.stopPropagation();
  const tooltip = e.currentTarget.firstElementChild as HTMLDivElement;
  const tooltipTrigger = tooltip.parentElement;
  if (!tooltip) return;
  const displayHidden = tooltip.classList.contains("hidden");
  if (displayHidden) {
    tooltip.classList.add("flex");
    tooltip.classList.remove("hidden");
  } else {
    tooltip.classList.remove("flex");
    tooltip.classList.add("hidden");
  }
  const handleCloseTouch = (e: any) => {
    if (!Object.is(e.target, tooltipTrigger)) {
      tooltip.classList.remove("flex");
      tooltip.classList.add("hidden");
    }
    document.removeEventListener("pointerdown", handleCloseTouch);
  };
  document.addEventListener("pointerdown", handleCloseTouch);
};
