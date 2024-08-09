import { SlidersHorizontal, X } from "lucide-react";

export default function Filter() {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <button className="hover:bg-gray-200 border border-gray-600 rounded-full py-2 px-4 flex gap-x-2">
          <SlidersHorizontal />
          All filters
        </button>
        <div className="flex items-center gap-x-4">
          <span className="">365 results, with Ads </span>
          <button className="hover:bg-gray-200 border border-gray-600 rounded-full py-2 px-4">
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
