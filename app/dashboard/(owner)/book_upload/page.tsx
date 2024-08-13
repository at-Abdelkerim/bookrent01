"use client";

import React, { useState } from "react";
import { Autocomplete, Button, PopperProps, TextField } from "@mui/material";

export default function Page() {
  const [isAddBook, setIsAddBook] = useState(false);
  return (
    <div className="place-content-center grid h-full">
      <Autocomplete
        disablePortal
        id="book"
        options={[
          { label: "book 1", id: "01" },
          { label: "book 2", id: "02" },
        ]}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search book by name"
            placeholder="Search"
          />
        )}
        PaperComponent={({ children }) => (
          <div className="bg-white shadow p-5" onClick={() => {}}>
            {children}
            <Button
              fullWidth
              onClick={() => {
                console.log("HERE:::");
                setIsAddBook(true);
              }}
            >
              Add
            </Button>
          </div>
        )}
        disableCloseOnSelect
      />
      {isAddBook && (
        <div className="z-10 fixed inset-0 bg-black/50 grid place-content-center">
          <div className="size-80 bg-white rounded-xl"></div>
        </div>
      )}
    </div>
  );
}
