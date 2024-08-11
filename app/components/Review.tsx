import { ChevronDown, Star } from "lucide-react";

export default async function Review({ rate }: { rate: number }) {
  return (
    <div className="lg:[grid-area:review] px-5 pt-5 pb-20 lg:text-xl    ">
      <div className="pb-10 flex max-lg:flex-col lg:items-center lg:justify-between">
        <div className="flex  gap-x-2">
          <p className="">Other reviews from this shop </p>
          <div className="flex lg:gap-x-2 items-center">
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <span className="max-lg:text-sm">({rate})</span>
          </div>
        </div>
        <button className="hover:bg-orange-200 rounded-full py-2 px-4 flex items-center justify-between gap-x-2 ">
          Sort by: Suggested <ChevronDown />
        </button>
      </div>
      <div className="flex flex-col gap-y-20">
        {[{}, {}, {}].map(({}, index) => (
          <div key={index.toString()} className="grid lg:grid-cols-[1fr_auto]">
            <div className="">
              <div className="flex lg:gap-x-2 items-center">
                <Star
                  fill="black"
                  strokeWidth={0}
                  className="size-3 lg:size-5"
                />
                <Star
                  fill="black"
                  strokeWidth={0}
                  className="size-3 lg:size-5"
                />
                <Star
                  fill="black"
                  strokeWidth={0}
                  className="size-3 lg:size-5"
                />
                <Star
                  fill="black"
                  strokeWidth={0}
                  className="size-3 lg:size-5"
                />
                <Star
                  fill="black"
                  strokeWidth={0}
                  className="size-3 lg:size-5"
                />
              </div>
              <p className="w-[75%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                dolorem nisi quam aut quis, velit explicabo nam praesentium
                libero dolores, minima accusamus autem quod sint voluptas eaque
                veritatis fugiat quasi.
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="grid items-center grid-cols-[1fr_auto_auto] gap-x-2">
                <span className="text-end">Item quality</span>
                <span className="">5</span>
                <Star
                  fill="black"
                  strokeWidth={0}
                  className="size-3 lg:size-5"
                />
              </div>
              <div className="grid items-center grid-cols-[1fr_auto_auto] gap-x-2">
                <span className="text-end">Shipping</span>
                <span className="">5</span>
                <Star
                  fill="black"
                  strokeWidth={0}
                  className="size-3 lg:size-5"
                />
              </div>
              <div className="grid items-center grid-cols-[1fr_auto_auto] gap-x-2">
                <span className="text-end">Customer service</span>
                <span className="">5</span>
                <Star
                  fill="black"
                  strokeWidth={0}
                  className="size-3 lg:size-5"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
