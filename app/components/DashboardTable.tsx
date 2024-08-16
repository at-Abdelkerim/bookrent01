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
import { TBook } from "../lib/definitions";

function TopToolbar({ table }: { table: MRT_TableInstance<TBook> }) {
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

export default function AdminDashboardTable({
  data,
  isOwner,
}: {
  data: TBook[];
  isOwner: Boolean;
}) {
  const columns = useMemo<MRT_ColumnDef<TBook>[]>(() => {
    const columnsData: MRT_ColumnDef<TBook>[] = [
      {
        accessorKey: "no",
        header: "Book No.",
        size: 30,
      },
      {
        accessorKey: isOwner ? "name" : "owner.name",
        header: isOwner ? "Book Name" : "Owner Name",
        size: 50,
      },
      {
        header: "Status",
        accessorFn: ({ status }) =>
          status ? (
            <p className="flex items-center gap-x-2 ">
              <span className="p-2 bg-red-500 rounded-full ring-1 ring-red-500 ring-offset-1 ring-offset-white" />{" "}
              Rented
            </p>
          ) : (
            <p className="flex items-center gap-x-2 ">
              <span className="p-2 bg-green-500 rounded-full ring-1 ring-green-500 ring-offset-1 ring-offset-white" />{" "}
              Free
            </p>
          ),
        size: 50,
      },
      {
        accessorFn: ({ price }) => price + " ETB",
        header: "Price",
        size: 50,
      },
    ];
    if (isOwner)
      columnsData.push({
        header: "Action",
        accessorFn: ({}) => (
          <div className="flex">
            <IconButton onClick={() => {}} aria-label="delete">
              <Edit className="text-black" />
            </IconButton>
            <IconButton onClick={() => {}} aria-label="delete" color="error">
              <Delete />
            </IconButton>
          </div>
        ),
        size: 50,
      });
    return columnsData;
  }, [isOwner]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableSorting: false,
    enableColumnActions: false,
    enablePagination: false,
    renderTopToolbar: TopToolbar,
    muiTablePaperProps: {
      style: {
        boxShadow: "none",
        backgroundColor: "white",
      },
    },
  });
  return (
    <div className="bg-white rounded-lg p-4 overflow-y-scroll ">
      <MaterialReactTable table={table} />
    </div>
  );
}
