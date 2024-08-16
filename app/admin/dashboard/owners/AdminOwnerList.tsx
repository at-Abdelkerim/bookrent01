"use client";

import React, { useActionState, useMemo, useState } from "react";
import { TSelectedOwner, TUser } from "@/app/lib/definitions";
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Delete,
  Edit,
  PanoramaFishEye,
  RemoveRedEye,
} from "@mui/icons-material";
import Approved from "@/app/components/Approved";
import OwnerDetail from "@/app/components/OwnerDetail";

function TopToolbar({
  table,
}: {
  table: MRT_TableInstance<TUser & { bookNumber: number }>;
}) {
  return (
    <div className="flex justify-between">
      <p className="p-2 text-lg font-semibold">List of Owner</p>
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

export default function AdminOwnerList({
  data,
}: {
  data: (TUser & { bookNumber: number })[];
}) {
  const [selected, setSelected] = useState<TSelectedOwner | undefined>();
  const columns = useMemo<MRT_ColumnDef<TUser & { bookNumber: number }>[]>(
    () => [
      //   {
      //     accessorFn: ({}) => "",
      //     header: "Book No.",
      //     size: 10,
      //   },
      {
        accessorKey: "name",
        header: "Owner",
        size: 50,
      },
      {
        accessorFn: ({ bookNumber }) => bookNumber + " Books",
        header: "Upload",
        size: 50,
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 50,
      },
      {
        header: "Status",
        accessorFn: ({ id, status }) => (
          <Status id={id!} dataType="owner" status={!!status} />
        ),
        size: 50,
      },
      {
        accessorFn: ({ name, email, location, phoneNumber }) => (
          <div className="flex ">
            <IconButton
              onClick={() => {
                setSelected({ name, email, location, phoneNumber });
              }}
              aria-label="delete"
            >
              <RemoveRedEye className="text-black" />
            </IconButton>
            <IconButton onClick={() => {}} aria-label="delete" color="error">
              <Delete />
            </IconButton>
          </div>
        ),
        header: "Action",
        size: 50,
      },

      {
        accessorFn: ({ id, approved }) => (
          <Approved id={id!} approved={!!approved} />
        ),
        header: "Approved",
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
  return (
    <>
      <MaterialReactTable table={table} />
      <OwnerDetail
        selected={selected}
        onClose={() => {
          setSelected(undefined);
        }}
      />
    </>
  );
}
