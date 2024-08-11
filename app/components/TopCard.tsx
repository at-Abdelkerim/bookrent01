// "use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { MoveRight, Star } from "lucide-react";

type TopCardProps = {
  id: string;
  img: string[];
  title: string;
  price: number;
  owner: { name: string; rate: number };
};

export default async function TopCard({
  id,
  img,
  title,
  price,
  owner: { name, rate },
}: TopCardProps) {
  return (
    <div className="overflow-hidden grid grid-cols-[auto_1fr] gap-x-2 p-2 lg:p-5">
      <div className="relative rounded-md overflow-hidden">
        <Link href={"/" + id}>
          <Image
            src={await import(`@/public/image/${img[0]}`)}
            alt=""
            className="rounded-md overflow-hidden w-40 h-40  lg:w-[600px]  lg:h-80 object-cover object-center"
          />
        </Link>
        <LikeButton id={id} />
      </div>
      <div className="lg:px-10 grid grid-rows-[1fr_auto] ">
        <div className=" ">
          <div className="flex flex-col-reverse  ">
            <div className="lg:flex lg:gap-x-5   ">
              <Link href={""} className=" underline">
                {name}
              </Link>
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
                <span className="max-lg:text-sm">{rate}</span>
              </div>
            </div>
            <Link href={"/" + id}>
              <button className="lg:text-3xl font-bold lg:py-2  text-start max-lg:line-clamp-1  hover:underline">
                {title}
              </button>
            </Link>
          </div>
          <p className="lg:text-2xl lg:py-2 font-bold  ">USD {price}</p>
          <span className="bg-green-300 text-xs lg:text-sm rounded-full px-2 py-1 font-semibold ">
            FREE shipping
          </span>
        </div>
        <div className="py-2 lg:py-10 ">
          <Link href={"/" + id}>
            <button className="flex items-center justify-between gap-x-4 lg:border border-black rounded-full py-2 lg:py-4 lg:px-10 lg:text-2xl hover:bg-gray-200">
              Shop this item
              <MoveRight className="lg:hidden size-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
