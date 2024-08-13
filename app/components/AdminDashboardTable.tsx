"use client";

import React, { useMemo } from "react";
import { IconButton } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TableInstance,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  useMaterialReactTable,
} from "material-react-table";
import { Edit, Delete } from "@mui/icons-material";

type Person = {
  no: number;
  bookNo: number;
  name: string;
  status: boolean;
  price: number;
};

export default function AdminDashboardTable({ data }: { data: Person[] }) {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "no",
        header: "No",
        size: 150,
      },
      {
        accessorKey: "bookNo",
        header: "Book no.",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Book Name",
        size: 250,
      },
      {
        header: "Status",
        accessorFn: ({ status }) =>
          status ? (
            <p className="flex items-center gap-x-2 ">
              <span className="p-2 bg-green-500 rounded-full ring-1 ring-green-500 ring-offset-1 ring-offset-white" />{" "}
              Free
            </p>
          ) : (
            <p className="flex items-center gap-x-2 ">
              <span className="p-2 bg-red-500 rounded-full ring-1 ring-red-500 ring-offset-1 ring-offset-white" />{" "}
              Rented
            </p>
          ),
        size: 150,
      },
      {
        accessorFn: ({ price }) => price + " ETB",
        header: "Price",
        size: 150,
      },
      {
        header: "Action",
        accessorFn: ({}) => (
          <div className="flex">
            <IconButton aria-label="delete">
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" color="error">
              <Delete />
            </IconButton>
          </div>
        ),
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableSorting: false,
    enableColumnActions: false,
    enablePagination: false,
    renderTopToolbar: TopToolbar,
    muiTablePaperProps: {
      style: { boxShadow: "none", backgroundColor: "white" },
    },
  });
  return (
    <div className="bg-white rounded-lg p-4 overflow-y-scroll ">
      <MaterialReactTable table={table} />
    </div>
  );
}

function TopToolbar({ table }: { table: MRT_TableInstance<Person> }) {
  return (
    <div className="flex justify-between">
      <p className="p-2 text-lg font-semibold">Live Book Status</p>
      <div className="flex">
        <MRT_GlobalFilterTextField table={table} />
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </div>
    </div>
  );
}
