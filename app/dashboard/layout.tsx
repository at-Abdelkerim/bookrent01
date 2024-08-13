"use server";

import React from "react";
import { auth } from "../lib/auth";

export default async function Layout({
  children,
  admin,
  owner,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  owner: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="">{session?.user?.role === "admin" ? admin : children}</div>
  );
}
