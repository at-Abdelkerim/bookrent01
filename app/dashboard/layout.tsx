"use server";

import React from "react";
import { auth } from "../lib/auth";

export default async function Layout({
  admin,
  owner,
}: {
  admin: React.ReactNode;
  owner: React.ReactNode;
}) {
  const session = await auth();
  console.log("SESSION:", session);
  return session?.user?.role === "admin" ? admin : owner;
}
