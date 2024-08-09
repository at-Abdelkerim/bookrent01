import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { Star } from "lucide-react";

export default async function Card({
  id,
  img,
  title,
  price,
  owner: { name, rate },
}: {
  id: string;
  img: string;
  title: string;
  price: number;
  owner: { name: string; rate: number };
}) {
  return (
    <div className="group/card inline-grid grid-rows-[auto_1fr] ">
      <div className="relative grid place-content-center">
        <Link href={"/" + id}>
          <Image
            src={await import(`@/public/image/${img}`)}
            alt=""
            className="rounded-lg size-[400px]"
          />
        </Link>
        <LikeButton id={id} hide />
      </div>
      <Link href={"/" + id} className="text-xl">
        <p className="">{title}</p>
        <div className="flex gap-x-2">
          <Star fill="black" strokeWidth={0} className="" />
          <Star fill="black" strokeWidth={0} className="" />
          <Star fill="black" strokeWidth={0} className="" />
          <Star fill="black" strokeWidth={0} className="" />
          <Star fill="black" strokeWidth={0} className="" />
          <span className="">{rate}</span>
        </div>
        <p className="text-2xl font-bold">USD {price}</p>
        <p className="">{name}</p>
      </Link>
    </div>
  );
}
