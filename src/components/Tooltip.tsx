export default function Tooltip({
  pos = { x: 0, y: 0 },
  content,
  attrs = {},
  styleProps = {},
}: {
  pos?: { x: number; y: number };
  content: string;
  attrs?: React.HTMLAttributes<HTMLDivElement>;
  styleProps?: React.CSSProperties;
}) {
  return (
    <div
      {...attrs}
      className="absolute z-1000 bg-[#73706f] text-sm p-2 text-center font-medium hidden group-hover:flex text-white min-w-40 rounded origin-bottom-left starting:opacity-0 opacity-100 duration-150 transition-opacity font-sans"
      style={{ ...styleProps }}
    >
      {content}
    </div>
  );
}
