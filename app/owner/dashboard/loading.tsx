import { CircularProgress } from "@mui/material";
import React from "react";

export default function loading() {
  return (
    <div className="grid place-content-center bg-white rounded-xl">
      <CircularProgress />
    </div>
  );
}
