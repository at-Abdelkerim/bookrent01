import { SlidersHorizontal, X } from "lucide-react";

export default function Filter() {
  return (
    <div className="px-2">
      <div className="flex max-lg:flex-col lg:justify-between items-end lg:items-center ">
        <button className="hover:bg-gray-200 border border-gray-600 rounded-full py-2 px-2 lg:px-4 flex gap-x-2">
          <SlidersHorizontal />
          <span className="max-lg:hidden">All filters</span>
        </button>
        <div className="flex items-center gap-x-4">
          <span className="">365 results, with Ads </span>
          <button className="max-lg:hidden hover:bg-gray-200 border border-gray-600 rounded-full py-2 px-4">
            <span className="font-semibold">Sort by</span> : most relevant
          </button>
        </div>
      </div>
      <div className="py-5">
        <span className="bg-gray-200 rounded-full py-1 px-2 inline-flex ">
          Etsys pick
          <button className="">
            <X />
          </button>
        </span>
      </div>
    </div>
  );
}
