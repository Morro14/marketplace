import { useEffect } from "react";

export function useCloseOnClick<T extends any[]>(
  nonClickableRefs: React.RefObject<null | HTMLDivElement>[],
  callback: ((...args: any) => any) | null = null,
  callBackArgs: T | [] = [],
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      let blockClick = false;
      nonClickableRefs?.forEach((ref) => {
        if (!ref.current) return;
        if (ref.current?.contains(target)) {
          blockClick = true;
          return;
        }
      });
      if (blockClick) return;
      if (callback) {
        callback(...callBackArgs);
      }
    };
    // TODO separate key press logic
    const handleEscapePress = (e: KeyboardEvent) => {
      const key = e.code;
      if (callback && key === "Escape") callback();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [nonClickableRefs, callback, callBackArgs]);
}
