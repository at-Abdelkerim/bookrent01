"use client";

import { Gift, Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <div className="relative shadow">
      <div className="lg:gap-x-10 grid grid-cols-[auto_1fr_auto] px-2 lg:px-10 py-2">
        <div className="flex max-lg:flex-row-reverse items-center lg:gap-x-10">
          <span className="text-orange-500 text-xl lg:text-3xl">Esty</span>
          <button
            onClick={() => {
              setIsMenu(true);
            }}
            className="flex items-center gap-x-2 group/menu"
          >
            <Menu className="group-hover/menu:bg-orange-200 group-hover/menu:text-orange-700 p-1 rounded-md size-6 lg:size-8" />
            <span className="group-hover/menu:text-orange-500 max-lg:hidden">
              Categories
            </span>
          </button>
        </div>
        <div className="flex gap-x-2 border-gray-600 grid-cols-[auto_1fr] py-1 pr-2 pl-5 border rounded-full overflow-hidden">
          <input
            type="search"
            placeholder="Soccer"
            className="focus-visible:outline-none flex-1- w-full"
          />
          <Search className="bg-orange-500 p-1 rounded-full text-white lg:size-10" />
        </div>
        <div className="flex items-center lg:gap-x-2">
          <Link href={"/login"} className="hover:text-orange-500">
            <User className="lg:hidden size-4" />
            <span className="max-lg:hidden">Sign In</span>
          </Link>
          <button className="max-lg:hidden hover:bg-orange-200 p-2 rounded-md">
            <Heart className="size-4 lg:size-8" />
          </button>
          <button className="hover:bg-orange-200 p-2 rounded-md">
            <Gift className="size-4 lg:size-8" />
          </button>
          <button className="hover:bg-orange-200 p-2 rounded-md">
            <ShoppingCart className="size-4 lg:size-8" />
          </button>
        </div>
      </div>
      <div
        className={`max-lg:absolute inset-0 flex max-lg:flex-col lg:justify-center items-center gap-y-2 lg:gap-x-10 max-lg:bg-gray-200/50 backdrop-blur-xl p-2 max-md:pt-10 max-lg:h-screen ${
          isMenu ? "" : "max-lg:hidden"
        }`}
      >
        <button
          onClick={() => {
            setIsMenu(false);
          }}
          className="top-2 left-1 absolute lg:hidden active:bg-red-200 p-1 rounded-md text-red-700 size-8"
        >
          <X />
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md hover:text-orange-500">
          <Gift />
          Gift Mode
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md hover:text-orange-500">
          Back-to-school Savings
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md hover:text-orange-500">
          Home Favorites
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md hover:text-orange-500">
          Fashion Finds
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md hover:text-orange-500">
          Registry
        </button>
      </div>
    </div>
  );
}
