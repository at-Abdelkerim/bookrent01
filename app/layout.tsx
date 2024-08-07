import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "./lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Rent",
  description: "Rent a book by exploring our site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={` ${inter.className}`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
