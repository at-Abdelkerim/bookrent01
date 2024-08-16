"use client";

import React from "react";
import { VictoryPie } from "victory";

export default function PieChartUI({
  data,
}: {
  data: { category: string; quantity: number }[];
}) {
  const color = [
    "red",
    "blue",
    "green",
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
  ];
  return (
    <div className="w-[200px]- grid grid-rows-[auto_1fr_auto] justify-center p-2 rounded-md shadow-md shadow-black/30">
      <div className="flex items-center justify-between  ">
        <span className="text-xl">Available Books</span>
        <span className="bg-gray-200 rounded-md py-1 px-2 ">Today</span>
      </div>
      <VictoryPie
        data={data.map(({ category, quantity }) => ({
          label: category,
          y: quantity,
        }))}
        colorScale={color}
        radius={120}
        innerRadius={80}
        labelComponent={<span></span>}
        style={{ parent: { height: 250, width: 250 } }}
      />
      <div className="px-2  ">
        {data
          .map((value, index) => ({
            ...value,
            color: color[index + 3],
          }))
          .map(({ category, quantity, color }, index) => (
            <div
              key={index.toString()}
              className="py-2 grid grid-cols-[auto_1fr_60px] gap-x-2 items-center"
            >
              <span className={`p-2 rounded-full ${color}`} />
              <span className="">{category}</span>
              <span className="">{quantity}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
