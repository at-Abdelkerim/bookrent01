import { Check, Hand, Ruler, Sparkles, Star } from "lucide-react";
import AddToCart from "./AddToCart";
import { TBook } from "../lib/definitions";

export default async function BookDetail({
  id,
  name,
  price,
  owner,
  author,
}: TBook) {
  return (
    <div className="lg:[grid-area:detail] px-5   ">
      <div className="">
        <p className="font-semibold text-red-500 text-xl">Rare find</p>
        <p className="text-5xl font-semibold py-2">ETB {price}</p>
        <p className="text-gray-500">Local taxes included (where applicable)</p>
        <p className="text-xl py-4 text-gray-700 min-h-24">{name}</p>
        <div className="flex items-center gap-x-4">
          <p className="text-lg capitalize">{name} </p>
          <div className="flex lg:gap-x-2 items-center">
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
            <span className="max-lg:text-sm">{owner?.rate}</span>
          </div>
        </div>
        <p className="flex items-center gap-x-2 py-4">
          <Check className="text-blue-400" />
          Return & exchange accepted
        </p>
        <AddToCart id={id!} />
      </div>
      <div className="py-5 grid">
        <button className="border py-4">item details</button>
        <div className="">
          <div className="">
            <p className="text-xl font-semibold">Highlights</p>
            <div className="px-4 py-2 flex flex-col gap-y-2 text-xl">
              <p className="flex gap-x-2">
                <Hand /> Author
                <span className="font-semibold capitalize">{author}</span>
              </p>
            </div>
          </div>
          <div className="">
            <p className="text-xl font-semibold">About this item</p>
            <p className="indent-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              molestiae minus, blanditiis voluptatem corporis atque beatae
              consequatur provident adipisci porro quisquam voluptatibus amet
              deleniti cumque voluptatum cupiditate? Ipsa, dolorem nostrum!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
