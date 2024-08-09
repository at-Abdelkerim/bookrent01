"use client";

import { useCookies } from "next-client-cookies";
import { useActionState } from "react";
import { giveLike } from "../lib/actions";
import { Heart } from "lucide-react";

export default function LikeButton({
  id,
  hide,
}: {
  id: string;
  hide?: boolean;
}) {
  const cookies = useCookies();
  const [state, likeAction, isPending] = useActionState(
    giveLike,
    !!cookies.get(id)
  );
  return (
    <form action={likeAction}>
      <input value={id} name="id" className="hidden" readOnly />
      <button
        disabled={isPending}
        className={`top-2 right-2 absolute border-gray-600 bg-white p-1 border rounded-full ${
          hide && !state && "hidden group-hover/card:block"
        }`}
      >
        <Heart
          fill={state ? "red" : "transparent"}
          strokeWidth={state ? 0 : 1}
          className={`size-8 ${isPending ? "blur" : ""}`}
        />
      </button>
    </form>
  );
}
