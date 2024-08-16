"use client";

import React, { useMemo } from "react";
import { TBook } from "@/app/lib/definitions";
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
import Status from "@/app/components/Status";

function TopToolbar({ table }: { table: MRT_TableInstance<TBook> }) {
  return (
    <div className="flex justify-between">
      <p className="p-2 text-lg font-semibold">List of Books</p>
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

export default function AdminBookList({ data }: { data: TBook[] }) {
  const columns = useMemo<MRT_ColumnDef<TBook>[]>(
    () => [
      {
        accessorKey: "no",
        header: "Book No.",
        size: 10,
      },
      {
        accessorKey: "author",
        header: "Author",
        size: 50,
      },
      {
        accessorKey: "owner.name",
        header: "Owner",
        size: 50,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Book Name",
        size: 50,
      },
      {
        header: "Status",
        accessorFn: ({ id, status }) => (
          <Status id={id!} dataType="book" status={!!status} />
        ),
        size: 50,
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
      style: {
        boxShadow: "none",
        backgroundColor: "white",
      },
    },
  });
  return <MaterialReactTable table={table} />;
}
