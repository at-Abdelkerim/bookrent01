import React from "react";
import { getOwnerBookName } from "@/app/lib/actions";
import RentBook from "@/app/components/RentBook";
import { NoSsr } from "@mui/material";

export default async function Page() {
  const book = await getOwnerBookName();
  return (
    <NoSsr>
      <RentBook book={book} />
    </NoSsr>
  );
}
