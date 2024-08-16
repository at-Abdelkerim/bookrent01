import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { Maximize, Star } from "lucide-react";
import { TBook } from "../lib/definitions";

export default async function Card({ id, img, name, price, owner }: TBook) {
  return (
    <div className="group/card inline-grid grid-rows-[auto_1fr] ">
      <div className="relative grid place-content-center">
        <Link href={"/" + id}>
          <Image
            src={
              img?.[0]
                ? await import(`@/public/image/book/${owner?.id}/${img?.[0]}`)
                : ""
            }
            alt=""
            className="rounded lg:rounded-md size-[150px] lg:size-[400px]"
          />
        </Link>
        <LikeButton id={id!} hide />
      </div>
      <Link href={"/" + id} className="lg:text-xl">
        <p className="max-lg:w-32 w-80 line-clamp-1">{name}</p>
        <div className="flex gap-x-2 items-center">
          <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
          <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
          <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
          <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
          <Star fill="black" strokeWidth={0} className="size-3 lg:size-5" />
          <span className="">{owner?.rate}</span>
        </div>
        <p className="lg:text-2xl font-bold">ETB {price}</p>
        <p className="capitalize">{name}</p>
        <button className="hover:bg-gray-200 rounded-full py-1 px-2 lg:hidden flex items-center gap-x-2 my-4">
          <Maximize />
          <span className="font-semibold">quick view</span>
        </button>
      </Link>
    </div>
  );
}
