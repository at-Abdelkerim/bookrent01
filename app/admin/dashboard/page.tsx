import React from "react";
import { MoveDown, MoveUp } from "lucide-react";
import { getDashboardData } from "@/app/lib/actions";
import { NoSsr } from "@mui/material";
import DashboardTable from "../../components/DashboardTable";
import AreaChartUI from "../../components/AreaChartUI";
import PieChartUI from "../../components/PieChartUI";
import { auth } from "@/app/lib/auth";

export default async function Page() {
  const data = await getDashboardData(),
    month = new Date().getMonth(),
    session = await auth();
  return (
    data && (
      <div className="grid grid-cols-[auto_1fr] gap-x-4 overflow-hidden">
        {/*  */}
        <div className=" bg-gray-50 rounded-lg p-4 grid grid-rows-[1fr_auto] gap-y-4 overflow-hidden">
          <div className="grid ">
            <div className=" ">
              <p className="text-xl font-semibold">This month statistics</p>
              <p className="text-gray-400">
                {new Date().toDateString()}, {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="bg-white- shadow-md rounded-lg p-4 ">
              <div className="py-2 flex gap-x-4 items-center justify-between">
                <span className="text-xl">Income</span>
                <span className="bg-gray-100 rounded-md px-2 py-1">
                  This month
                </span>
              </div>
              <hr className="border" />
              <div className="py-4">
                <span className="text-3xl font-extrabold">
                  ETB {data.income[month].thisYear}
                </span>
                <span
                  className={`px-2 inline-flex items-center ${
                    data.income[month].thisYear - data.income[month].lastYear >
                    0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {data.income[month].thisYear - data.income[month].lastYear >
                  0 ? (
                    <MoveUp className="size-3" />
                  ) : (
                    <MoveDown className="size-3" />
                  )}
                  {Math.round(
                    (100 *
                      (data.income[month].thisYear -
                        data.income[month].lastYear)) /
                      data.income[month].thisYear
                  )}
                  %
                </span>
              </div>
              <div className="font-light text-sm flex justify-between">
                <span className="">Compare to Last Month</span>
                <span className="px-2">
                  ETB{" "}
                  {Math.abs(
                    data.income[month].lastYear - data.income[month].thisYear
                  )}
                </span>
              </div>
              <div className="font-semibold text-sm flex justify-between">
                <span className="">Last Month Income</span>
                <span className="px-2">ETB {data.income[month].lastYear}</span>
              </div>
            </div>
          </div>
          <NoSsr>
            <PieChartUI data={data.categoryData} />
          </NoSsr>
        </div>
        {/*  */}
        <div className="grid grid-rows-[1fr_350px] gap-y-4 overflow-hidden">
          <NoSsr>
            <DashboardTable
              data={data.books}
              isOwner={session?.user?.role == "owner"}
            />
            <AreaChartUI data={data.income} />
          </NoSsr>
        </div>
      </div>
    )
  );
}
