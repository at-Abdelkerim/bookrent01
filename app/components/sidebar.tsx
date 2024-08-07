"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, CircleUser, LogOut, Menu, Settings } from "lucide-react";
import { BookRent } from "./svg";

export default function SideBar({
  links,
}: {
  links: { link: string; label: string; icon: React.ReactNode }[];
}) {
  const pathname = usePathname(),
    [isExtract, setIsExtract] = useState(true);
  return (
    <div className="grid grid-rows-[auto_1fr_auto] px-10 bg-[#171B36] text-white rounded-2xl ">
      <div className="py-2 pb-5 flex items-center gap-x-4 border-b border-gray-500 ">
        <button onClick={() => [setIsExtract((prev) => !prev)]} className="">
          <Menu className="size-10" />
        </button>
        {isExtract && (
          <>
            <BookRent height={40} width={40} fill="#00ABFF" />
            <span className="text-[#00ABFF] text-2xl ">Book Rent</span>
          </>
        )}
      </div>
      <div className="">
        {[
          links,
          [
            {
              link: "/notification",
              label: "Notification",
              icon: <Bell />,
            },
            {
              link: "/settings",
              label: "Settings",
              icon: <Settings />,
            },
            {
              link: "/logout",
              label: "Login as Admin",
              icon: <CircleUser />,
            },
          ],
        ].map((value, index1) => (
          <div
            key={index1.toString()}
            className="grid py-4 border-b border-gray-500 gap-y-4"
          >
            {value.map(({ link, label, icon }, index2) => (
              <Link
                key={index2.toString()}
                href={link}
                className={`py-2 rounded-lg flex items-center gap-x-2 ${
                  isExtract ? "px-5" : "px-2"
                } ${
                  pathname === link ? "bg-[#00ABFF] " : "hover:bg-[#00ABFF]/30"
                }`}
              >
                {icon}
                {isExtract && <span className="">{label}</span>}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="py-5 grid">
        <Link
          href={"/logout"}
          className="bg-gray-700 hover:bg-red-700 p-2 rounded-lg flex items-center justify-center gap-x-2"
        >
          <LogOut />
          {isExtract && <span className="text-xl">Logout</span>}
        </Link>
      </div>
    </div>
  );
}
