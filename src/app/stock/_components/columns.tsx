"use client";
import { GridColDef } from "@mui/x-data-grid";
import { ActionsMenu } from "./ActionsMenu";
import { Button } from "@mui/material";
import Link from "next/link";

export type ProductRow = {
  id: string;
  name: string;
  code: string | null;
  stockQuantity: number | null;
  listPrice: string | null;
  brand?: { name: string } | null;
};

export const columns: GridColDef[] = [
  {
    field: "actions",
    headerName: "",
    width: 80,
    sortable: false,
    renderCell: (params) => (
      <ActionsMenu rowId={params.row.id} productName={params.row.name} />
    ),
  },
  {
    field: "name",
    headerName: "Nombre",
    flex: 1,
    minWidth: 200,
    renderCell: (params) => (
      <Button
        component={Link}
        href={`/stock/${params.row.id}`}
        variant="text"
        sx={{
          textTransform: "none",
          p: 0,
          minWidth: "auto",
          color: "inherit",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {params.value}
      </Button>
    ),
  },
  {
    field: "code",
    headerName: "Código",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "stockQuantity",
    headerName: "Stock",
    flex: 1,
    minWidth: 100,
    type: "number",
  },
  {
    field: "listPrice",
    headerName: "Precio",
    flex: 1,
    minWidth: 120,
    type: "number",
    valueFormatter: (params: { value: any }) => {
      if (params.value == null) return "";
      return `$${params.value}`;
    },
  },
];
