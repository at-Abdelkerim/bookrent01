"use client";

import { MenuItem, Select } from "@mui/material";
import React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { VictoryArea, VictoryChart } from "victory";

export default function AreaChartUI({
  data,
}: {
  data: { month: string; thisYear: number; lastYear: number }[];
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-5 overflow-y-hidden overflow-x-auto">
      <div className="grid grid-cols-[1fr_auto] p-4">
        <div className="flex gap-x-5">
          <p className="text-2xl font-extrabold">Earning Summary</p>
          <Select
            variant="filled"
            labelId="date-interval"
            id="date-interval"
            defaultValue={2024}
            sx={{ border: "none", outline: "none" }}
            inputProps={{ border: "none" }}
          >
            <MenuItem value={2023}>jan 2023 - dec 2024</MenuItem>
            <MenuItem value={2024}>jan 2024 - dec 2025</MenuItem>
            <MenuItem value={2025}>jan 2025 - dec 2026</MenuItem>
          </Select>
        </div>
        <div className="flex gap-x-5">
          <div className="grid items-center grid-cols-[auto_1fr] gap-x-2">
            <span className="p-2 bg-blue-500 rounded-full" />
            <span className="">This Year</span>
          </div>
          <div className="grid items-center grid-cols-[auto_1fr] gap-x-2">
            <span className="p-2 bg-gray-500 rounded-full" />
            <span className="">Last Year</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer
        width={"100%"}
        height={"100%"}
        className="grid justify-center"
      >
        <ComposedChart width={800} height={200} data={data}>
          <defs>
            <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="10 0" horizontal={false} />
          <Tooltip />
          <XAxis
            dataKey="month"
            height={40}
            orientation="top"
            axisLine={false}
            tickLine={false}
            tickMargin={20}
          />
          <YAxis
            type="number"
            width={100}
            orientation="left"
            scale={"linear"}
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            tickFormatter={(val) => val + " ETB"}
          />
          <Area
            type="monotone"
            dataKey={"thisYear"}
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorThisYear)"
          />
          <Line
            type="monotone"
            dataKey={"lastYear"}
            stroke="#6b7280"
            strokeDasharray={"10 5"}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
