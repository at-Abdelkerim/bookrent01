import {
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { TBook } from "../lib/definitions";

export default function AddNewBook({
  open,
  closeDialog,
  setNewBook,
}: {
  open: boolean;
  closeDialog: () => void;
  setNewBook: (val: (prev: TBook[]) => TBook[]) => void;
}) {
  const bookCategory = ["Fiction", "Business", "Self Help"],
    [bookData, setBookDate] = useState<TBook>({
      name: "",
      author: "",
      category: bookCategory[0],
    });
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      PaperProps={{ className: "p-5 rounded-2xl" }}
    >
      <DialogTitle>Add Book</DialogTitle>
      <div className="grid place-content-center gap-y-4">
        <TextField
          id="name"
          label="Book Name"
          variant="filled"
          value={bookData?.name}
          onChange={({ target }) =>
            setBookDate((prev) => ({ ...prev, name: target.value }))
          }
          className="w-80 "
        />
        <TextField
          id="author"
          label="Author Name"
          variant="filled"
          value={bookData?.author}
          onChange={({ target }) =>
            setBookDate((prev) => ({ ...prev, author: target.value }))
          }
          className="w-80 "
        />
        <Select
          id="category"
          label="Category"
          variant="filled"
          value={bookData?.category}
          onChange={({ target }) =>
            setBookDate((prev) => ({ ...prev, category: target.value }))
          }
          className="w-80 "
        >
          {bookCategory.map((value, index) => (
            <MenuItem key={index.toString()} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          size="large"
          type="submit"
          onClick={() => {
            if (bookData.name && bookData.author && bookData.category) {
              setNewBook((prev) => [...prev, bookData]);
            }
            closeDialog();
          }}
          className="w-80 my-2 py-4 bg-sky-500 rounded-xl"
        >
          Add
        </Button>
      </div>
    </Dialog>
  );
}
