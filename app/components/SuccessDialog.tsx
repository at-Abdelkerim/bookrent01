import { Button, Dialog } from "@mui/material";
import { Smile } from "lucide-react"; 
import React from "react";

export default function SuccessDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: "rounded-xl w-full " }}
    >
      <div className="py-5 grid place-content-center text-sky-500">
        <Smile className="size-40" strokeWidth={1} />
      </div>
      <p className="text-3xl font-extrabold text-center">Congrats</p>
      <p className="py-5 px-5 text-sm text-center text-gray-500">
        You have uploaded the book successfully waite until we approve it.
      </p>
      <div className="grid pb-5 place-content-center">
        <Button
          variant="contained"
          size="large"
          className=" px-16 bg-sky-500"
          onClick={onClose}
        >
          Ok
        </Button>
      </div>
    </Dialog>
  );
}
