"use client";

import React from "react";
import { PieChart, Pie, Label } from "recharts";
import { VictoryPie } from "victory";

export default function PieChartUI({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] justify-center py-2 rounded-md shadow-md shadow-black/30">
      <div className="flex items-center justify-between">
        <span className="text-xl">Available Books</span>
        <span className="bg-gray-200 rounded-md py-1 px-2 ">Today</span>
      </div>
      {/* <PieChart width={200} height={200}>
        <Pie
          data={data}
          nameKey="name"
          dataKey="value"
          innerRadius={"60%"}
          fill="#82ca9d"
          label
        />
      </PieChart> */}
      <VictoryPie
        data={[
          { y: 54, label: "Fiction" },
          { y: 20, label: "Self Help" },
          { y: 26, label: "Business" },
        ]}
        innerRadius={100}
        colorScale={["red", "blue", "green"]}
      />
      <div className="px-5 ">
        {[
          { color: "bg-red-500", label: "Fiction", value: 54 },
          { color: "bg-blue-500", label: "Self Help", value: 20 },
          { color: "bg-green-500", label: "Business", value: 26 },
        ].map(({ color, label, value }, index) => (
          <div
            key={index.toString()}
            className="py-2 grid grid-cols-[auto_1fr_60px] gap-x-2 items-center"
          >
            <span className={`p-2 rounded-full ${color}`} />
            <span className="">{label}</span>
            <span className="">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
