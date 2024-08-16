"use client";

import { Skeleton } from "@mui/material";
import { useActionState } from "react";
import { toggleApprove } from "../lib/actions";

export default function Approved({
  id,
  approved,
}: {
  id: string;
  approved: boolean;
}) {
  const [state, action, isPending] = useActionState(toggleApprove, approved);
  return isPending ? (
    <Skeleton
      animation="wave"
      variant="rounded"
      width={"10rem"}
      height={"2.5rem"}
      sx={{ borderRadius: "1rem" }}
    />
  ) : (
    <form action={action}>
      <input name="id" type="text" value={id} className="hidden" />
      <input
        name="approved"
        type="text"
        value={approved ? "" : "true"}
        className="hidden"
      />
      <button
        className={`w-40  rounded-[0.875rem] py-1 px-4 text-white text-lg ${
          approved ? "bg-sky-600/80" : "bg-gray-600/80"
        }`}
      >
        {approved ? "Approved" : "Approve"}
      </button>
    </form>
  );
}
