import { useEffect } from "react";

export function useCloseOnClick<T extends any[]>(
  modalRefs: React.RefObject<null | HTMLElement>[],
  callback: ((...args: any) => any) | null = null,
  callBackArgs: T | [] = [],
  blockFirstClickOutside: boolean = true,
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const targetIsModal = modalRefs?.some((ref) => {
        if (!ref.current) return false;
        const contains = ref.current?.contains(target)
        return contains
      });
      if (!targetIsModal) {
        if (blockFirstClickOutside) {
          e.stopPropagation()
        }
        if (callback) {
          callback(...callBackArgs);
        }
        return
      }
      return
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
  }, [modalRefs, callback, callBackArgs]);
}
