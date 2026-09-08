"use client";

export default function Input({
  label,
  attrs,
  error,
  ref,
}: {
  label: string;
  attrs: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium" htmlFor={attrs.name}>
        {label}
      </label>
      <div className="relative">
        <input
          {...attrs}
          id={attrs.name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${attrs.name}-error` : undefined}
          className={`my-auto placeholder:text-gray-mid pl-6 border rounded h-[42px] flex w-full focus:outline-accent ${error ? "border-red-warning" : "border-gray-form"}`}
          ref={ref}
        />
        {error ? (
          <div
            id={`${attrs.name}-error`}
            className="absolute -bottom-2.5 px-1 left-6 text-sm text-red-warning bg-bg"
            role="alert"
          >
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}
