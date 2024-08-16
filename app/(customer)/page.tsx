import React from "react";
import { getCustomerBook } from "../lib/actions";
import TopCard from "../components/TopCard";
import Filter from "../components/Filter";
import Card from "../components/Card";

export default async function Page() {
  const [firstData, ...data] = await getCustomerBook();
  return (
    <div className="grid lg:px-32">
      <TopCard {...firstData} />
      <hr className="py-5 border-gray-400" />
      <Filter />
      <div className="gap-10 flex flex-wrap lg:justify-center bg-yellow-pink p-2">
        {data.map((value, index) => (
          <Card key={index.toString()} {...value} />
        ))}
      </div>
    </div>
  );
}
