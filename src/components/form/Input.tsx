'use client'

import { HTMLInputTypeAttribute } from "react";

export default function Input({
  type, name, placeholder, label }: { type: HTMLInputTypeAttribute; name: string; placeholder: string; label: string }) {
  return <div className="space-y-1">
    <label className="text-sm font-medium" htmlFor="">{label}</label>
    <input type={type} placeholder={placeholder} name={name} className="my-auto pl-6 border-gray-form border rounded h-[42px] flex w-full focus:outline-accent" />
  </div>
}
