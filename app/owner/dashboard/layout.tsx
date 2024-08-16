import React from "react";
import { Book, LayoutPanelLeft } from "lucide-react";
import Header from "@/app/components/header";
import SideBar from "@/app/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gap-x-4 grid grid-cols-[auto_1fr] bg-zinc-200 p-4 h-screen overflow-hidden">
      <SideBar role="owner" />
      <div className="gap-y-5 grid grid-rows-[auto_1fr] overflow-hidden">
        <Header />
        <div className="grid overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
