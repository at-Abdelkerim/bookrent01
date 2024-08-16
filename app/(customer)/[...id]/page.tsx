"use server";

import BookDetail from "@/app/components/BookDetail";
import ImagesList from "@/app/components/ImagesList";
import Review from "@/app/components/Review";
import { getCustomerBook } from "@/app/lib/actions";
import React from "react";

export default async function Page({ params }: { params: { id: string[] } }) {
  const data = await getCustomerBook(params.id[0]);
  console.log("DATA :: ", data);
  return (
    !!data[0] && (
      <div className="grid gap-4 lg:[grid-template-areas:'img_detail''review_detail'] grid-cols-1 lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_1fr] lg:h-full lg:pt-10 lg:px-32  ">
        <ImagesList img={data[0].img} ownerId={data[0].owner.id} />
        <BookDetail
          {...{
            id: data[0].id,
            name: data[0].name,
            price: data[0].price,
            owner: data[0].owner,
            author: data[0].author,
          }}
        />
        <Review {...{ rate: data[0].owner.rate }} />
      </div>
    )
  );
}
