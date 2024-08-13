import React from "react";
import { MoveDown } from "lucide-react";
import dynamic from "next/dynamic";
import { getOwnerDashboardData } from "@/app/lib/actions";

const PieChartUI = dynamic(() => import("../../components/PieChartUI"), {
  ssr: false,
});

const AdminDashboardTable = dynamic(
  () => import("../../components/AdminDashboardTable"),
  {
    ssr: false,
  }
);
const AreaChart = dynamic(() => import("../../components/AreaChartUI"), {
  ssr: false,
});

const data = await getOwnerDashboardData();

export default function Page() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 overflow-hidden">
      {/*  */}
      <div className="w-[400px] bg-gray-50 rounded-lg p-4 grid grid-rows-[auto_auto_1fr] gap-y-4 overflow-hidden">
        <div className=" ">
          <p className="text-xl font-semibold">This month statistics</p>
          <p className="text-gray-400">Tue, 14 Nov, 2024, 11:30 AM</p>
        </div>
        <div className="bg-white- shadow-md rounded-lg p-4 ">
          <div className="py-2 flex gap-x-4 items-center justify-between">
            <span className="text-xl">Income</span>
            <span className="bg-gray-100 rounded-md px-2 py-1">This month</span>
          </div>
          <hr className="border" />
          <div className="py-4">
            <span className="text-4xl font-extrabold">ETB 9460.00</span>
            <span className="px-2 text-red-600 inline-flex items-center">
              <MoveDown className="size-3" /> 1.5%
            </span>
          </div>
          <div className="font-light">
            <span className="">Compare to Last Month</span>
            <span className="px-2">ETB 9640.00</span>
          </div>
          <div className="font-semibold">
            <span className="">Last Month Income</span>
            <span className="px-2">ETB 25658.00</span>
          </div>
        </div>
        <PieChartUI data={data.pieChart} />
      </div>
      {/*  */}
      <div className="grid grid-rows-[1fr_350px] gap-y-4 overflow-hidden">
        <AdminDashboardTable data={data.table} />
        <AreaChart data={data.areaChart} />
      </div>
    </div>
  );
}
