
export default function MobileBtnTemplate({
  children, ...attrs

}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...attrs} className="w-[38px] h-[38px] rounded-full border-2 bg-gray-light border-gray-light">
      {children}
    </div>
  );
}
