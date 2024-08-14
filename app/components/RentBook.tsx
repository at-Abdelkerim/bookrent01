"use client";

import React, { useState } from "react";
import UploadBook from "./UploadBook";
import AddNewBook from "./AddNewBook";
import { TBook } from "../lib/definitions";

export default function RentBook({ book }: { book: TBook[] }) {
  const [newBook, setNewBook] = useState(book),
    [isOpen, setIsOpen] = useState(false),
    openDialog = () => setIsOpen(true),
    closeDialog = () => setIsOpen(false);
  return (
    <div className="place-content-center grid bg-white rounded-xl  ">
      <UploadBook book={newBook} openDialog={openDialog} />
      <AddNewBook
        open={isOpen}
        closeDialog={closeDialog}
        setNewBook={setNewBook}
      />
    </div>
  );
}
