"use server";

import BookDetail from "@/app/components/BookDetail";
import ImagesList from "@/app/components/ImagesList";
import Review from "@/app/components/Review";
import { getBook } from "@/app/lib/actions";
import React from "react";

export default async function Page({ params }: { params: { id: string[] } }) {
  const [
    {
      id,
      img,
      title,
      price,
      owner: { name, rate },
    },
  ] = await getBook(params.id[0]);
  return (
    <div className="grid gap-4 lg:[grid-template-areas:'img_detail''review_detail'] grid-cols-1 lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_1fr] lg:h-full lg:pt-10 lg:px-32  ">
      <ImagesList img={img} />
      <BookDetail {...{ id, title, price, name, rate }} />
      <Review {...{ rate }} />
    </div>
  );
}
