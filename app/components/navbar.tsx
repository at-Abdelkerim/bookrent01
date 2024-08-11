"use client";

import { Gift, Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar({ cart }: { cart: number }) {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <div className="relative shadow">
      <div className="gap-x-1 lg:gap-x-10 grid grid-cols-[auto_1fr_auto] px-2 lg:px-10 py-2">
        <div className="flex max-lg:flex-row-reverse items-center lg:gap-x-10">
          <Link href={"/"} className="text-orange-500 text-xl lg:text-3xl">
            Esty
          </Link>
          <button
            onClick={() => {
              setIsMenu((prev) => !prev);
            }}
            className="flex items-center gap-x-2 hover:bg-orange-200 px-2 lg:px-4 py-2 rounded-full"
          >
            {isMenu ? (
              <X className="size-4 lg:size-6" />
            ) : (
              <Menu className="size-4 lg:size-6" />
            )}
            <span className="max-lg:hidden">Categories</span>
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
          <Link
            href={"/login"}
            className="hover:bg-orange-200 px-2 lg:px-4 py-2 rounded-full"
          >
            <User className="lg:hidden size-4" />
            <span className="max-lg:hidden">Sign In</span>
          </Link>
          <button className="max-lg:hidden hover:bg-orange-200 p-2 rounded-full">
            <Heart className="size-4 lg:size-8" />
          </button>
          <button className="hover:bg-orange-200 p-2 rounded-full">
            <Gift className="size-4 lg:size-8" />
          </button>
          <button className="relative hover:bg-orange-200 p-2 rounded-full">
            <ShoppingCart className="size-4 lg:size-8" />
            {cart > 0 && (
              <span className="absolute top-0 right-0 bg-red-200 font-extrabold text-red-700 px-1 rounded-full text-sm">
                {cart}
              </span>
            )}
          </button>
        </div>
      </div>
      <div
        className={`max-lg:fixed z-10 inset-x-0 b bottom-0 h- top-12 flex max-lg:flex-col lg:justify-center lg:items-center gap-y-2 lg:gap-x-10 max-lg:bg-gray-200/50 backdrop-blur-xl p-2 ${
          isMenu ? "" : "max-lg:hidden"
        }`}
      >
        <p className="lg:hidden text-xl">Browse Category</p>
        <button className="flex items-center gap-2 hover:bg-orange-200 px-4 py-2 rounded-full">
          <Gift />
          Gift Mode
        </button>
        <button className="flex items-center gap-2 hover:bg-orange-200 px-4 py-2 rounded-full">
          Back-to-school Savings
        </button>
        <button className="flex items-center gap-2 hover:bg-orange-200 px-4 py-2 rounded-full">
          Home Favorites
        </button>
        <button className="flex items-center gap-2 hover:bg-orange-200 px-4 py-2 rounded-full">
          Fashion Finds
        </button>
        <button className="flex items-center gap-2 hover:bg-orange-200 px-4 py-2 rounded-full">
          Registry
        </button>
      </div>
    </div>
  );
}
