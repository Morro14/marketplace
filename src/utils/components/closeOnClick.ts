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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [nonClickableRefs, callback, callBackArgs]);
}
