"use client";

import { ReactNode, useEffect } from "react";

export default function Modal({
  children,
  active,
}: {
  children: ReactNode;
  active: boolean;
}) {
  useEffect(() => {
    if (active) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [active]);
  return (
    <div
      className={`backdrop-modal ${active ? "flex" : "hidden"} overscroll-contain`}
    >
      {children}
    </div>
  );
}
