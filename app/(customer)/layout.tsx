"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { useCookies } from "next-client-cookies";
import { CartContext } from "../hooks/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookies = useCookies(),
    [cart, setCart] = useState<string[]>([
      ...JSON.parse(cookies.get("cart") || "[]"),
    ]);
  useEffect(() => {
    cookies.set("cart", JSON.stringify(cart));
  }, [cart, cookies]);
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen overflow-hidden">
      <NavBar {...{ cart: cart.length }} />
      <div className="overflow-y-auto">
        <CartContext.Provider value={{ cart, setCart }}>
          {children}
        </CartContext.Provider>
      </div>
    </div>
  );
}
