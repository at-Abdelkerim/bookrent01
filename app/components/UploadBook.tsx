import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Upload } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { uploadBook } from "../lib/actions";
import SuccessDialog from "./SuccessDialog";
import { useRouter } from "next/navigation";
import { TBook } from "../lib/definitions";

export default function UploadBook({
  book,
  openDialog,
}: {
  book: TBook[];
  openDialog: () => void;
}) {
  const [state, action, pending] = useActionState(uploadBook, false),
    [isSuccess, setIsSuccess] = useState(false),
    router = useRouter();

  useEffect(() => {
    if (state) setIsSuccess(true);
  }, [state]);

  return pending ? (
    <CircularProgress />
  ) : (
    <form action={action} className="flex flex-col items-center">
      <Select
        id="book"
        label="Search book by name"
        variant="filled"
        defaultValue={book?.[0].id}
        required
        name="book"
        className="w-80"
      >
        {book.map(({ id, name, author, category }, index) => (
          <MenuItem
            key={index.toString()}
            value={id || name + " " + author + " " + category}
          >
            {name}
          </MenuItem>
        ))}
        <Button fullWidth onClick={openDialog}>
          Add
        </Button>
      </Select>
      <div className="flex gap-x-5 py-10">
        <TextField
          id="quantity"
          label="Book Quantity"
          variant="filled"
          name="quantity"
          required
          className="w-80"
        />
        <TextField
          id="price"
          label="Rent price for 2 weeks"
          variant="filled"
          name="price"
          required
          className="w-80"
        />
      </div>
      <Button variant="text" component="label" className="gap-x-2">
        <Upload />
        <span className="">Upload Book Cover</span>
        <input
          accept="image/*"
          type="file"
          name="bookCover"
          required
          className="absolute opacity-0 "
        />
      </Button>
      <Button
        variant="contained"
        size="large"
        type="submit"
        className="w-80 my-10 py-4 rounded-xl"
      >
        Submit
      </Button>
      <SuccessDialog
        open={isSuccess}
        onClose={() => {
          router.replace("/dashboard");
        }}
      />
    </form>
  );
}
