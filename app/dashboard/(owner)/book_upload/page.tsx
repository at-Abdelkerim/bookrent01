import React from "react";
import { getOwnerBookName } from "@/app/lib/actions";
import RentBook from "@/app/components/RentBook";

export default async function Page() {
  const book = await getOwnerBookName();
  return <RentBook book={book} />;
}
