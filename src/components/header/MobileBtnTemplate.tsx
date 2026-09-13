import { ReactNode } from "react";

export default function MobileBtnTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-[38px] h-[38px] rounded-full border-2 bg-gray-light border-gray-light">
      {children}
    </div>
  );
}
