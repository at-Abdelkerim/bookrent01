"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const session = useSession(),
    pathname = usePathname();
  return (
    <div className="bg-gray-50 px-20 py-4 rounded-xl">
      <span className="font-extrabold capitalize">
        {session?.data?.user?.role}
      </span>
      <span className="font-light text-gray-500 capitalize">
        /
        {pathname
          .split("/")
          [pathname.split("/").length - 1].split("_")
          .join(" ")}
      </span>
    </div>
  );
}
