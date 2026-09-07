"use client";

export default function Input({
  label,
  attrs,
  ref,
}: {
  label: string;
  attrs: React.InputHTMLAttributes<HTMLInputElement>;
  ref?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor="">
        {label}
      </label>
      <input
        {...attrs}
        className="my-auto pl-6 border-gray-form border rounded h-[42px] flex w-full focus:outline-accent"
        ref={ref}
      />
    </div>
  );
}
