import { Gift, Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import NavBar from "../components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen overflow-hidden">
      <NavBar />
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
}
