"use client";

import { Check, X } from "lucide-react";
import { useActionState } from "react";
import { toggleStatus } from "../lib/actions";
import { Skeleton } from "@mui/material";

export default function Status({
  id,
  dataType,
  status,
}: {
  id: string;
  dataType: string;
  status: boolean;
}) {
  const [state, action, isPending] = useActionState(toggleStatus, status);
  return (
    <form action={action}>
      <input name="id" type="text" value={id} className="hidden" />
      <input name="dataType" type="text" value={dataType} className="hidden" />
      <input
        name="status"
        type="text"
        value={status ? "" : "true"}
        className="hidden"
      />
      {isPending ? (
        <Skeleton
          animation="wave"
          variant="rounded"
          width={"10rem"}
          height={"2.5rem"}
          sx={{ borderRadius: "1rem" }}
        />
      ) : (
        <button
          disabled={isPending}
          className={`flex gap-x-1 items-center w-40  rounded-2xl py-2 px-4  ${
            status
              ? "bg-green-500/20 text-green-600"
              : "bg-red-500/20 text-red-600"
          }`}
        >
          {status ? <Check /> : <X />}
          <span className="">{status ? "Active" : "Inactive"}</span>
          <span
            className={`w-10 flex rounded-full ${
              status ? "bg-green-400 justify-end" : "bg-red-400 justify-start"
            }`}
          >
            <span
              className={`p-2  rounded-full scale-125 shadow-md ${
                status ? "bg-green-600" : "bg-red-600"
              }`}
            />
          </span>
        </button>
      )}
    </form>
  );
}
