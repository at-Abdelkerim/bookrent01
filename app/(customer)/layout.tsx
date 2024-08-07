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
