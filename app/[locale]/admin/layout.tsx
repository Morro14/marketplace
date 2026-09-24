import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full gap-3 pb-20 ">
      {/* ADMIN HEADER */}
      <div className="w-screen h-10 bg-blue-black shrink-0">
        <div className="h-full mx-auto content-container text-white font-serif flex items-center">
          <Link
            className="font-bold text-lg flex items-center h-full"
            href="/admin"
          >
            Admin
          </Link>
        </div>
      </div>
      <div className="content-container h-full flex flex-col gap-4 mx-auto">
        <div className="size-full flex flex-col items-center mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
