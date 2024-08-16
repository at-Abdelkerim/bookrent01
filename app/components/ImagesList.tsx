"use client";

import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import LikeButton from "./LikeButton";
import { Fragment, useState } from "react";
import Image from "next/image";

export default function ImagesList({
  img,
  ownerId,
}: {
  img: string[];
  ownerId: string;
}) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="lg:[grid-are:img] aspect-[1] lg:aspect-[2] grid lg:gap-x-4 lg:grid-cols-[auto_1fr]  ">
      <div className="border border-gray-400 rounded-md w-[104px] max-lg:py-2 grid max-lg:grid-flow-col gap-2 justify-center auto-rows-min max-lg:order-2 ">
        {img.map((value, index) => (
          <Fragment key={index.toString()}>
            <Image
              src={`/image/book/${ownerId}/${value}`}
              alt=""
              width={100}
              height={100}
              onClick={() => setSelected(index)}
              className={`rounded-md object-cover object-center max-lg:hidden ${
                index === selected ? "border-4 border-black" : "opacity-50"
              }`}
            />
            <span
              onClick={() => setSelected(index)}
              className={`lg:hidden p-2 rounded-full ${
                index === selected ? "bg-gray-950" : "bg-gray-400"
              }`}
            />
          </Fragment>
        ))}
      </div>
      <div className="relative lg:overflow-hidden max-lg:order-1">
        <Image
          src={`/image/book/${ownerId}/${img[selected]}`}
          alt=""
          width={100}
          height={100}
          className="size-full lg:rounded-xl object-cover object-center"
        />
        <LikeButton id="here" />
        <div className="absolute top-2 left-2 bg-orange-300 rounded-full py-1 px-2 flex gap-x-2">
          <Sparkles className="" />
          <span className="underline">{"Estsy's Pick"}</span>
        </div>
        <button
          onClick={() =>
            setSelected((prev) => (prev - 1 >= 0 ? prev - 1 : img.length - 1))
          }
          className="max-lg:hidden absolute top-[50%] left-2 bg-white shadow-md shadow-black hover:bg-gray-200 rounded-full p-2"
        >
          <ChevronLeft className="size-10" />
        </button>
        <button
          onClick={() =>
            setSelected((prev) => (prev + 1 < img.length ? prev + 1 : 0))
          }
          className="max-lg:hidden absolute top-[50%] right-2 bg-white shadow-md shadow-black hover:bg-gray-200 rounded-full p-2"
        >
          <ChevronRight className="size-10" />
        </button>
      </div>
    </div>
  );
}
