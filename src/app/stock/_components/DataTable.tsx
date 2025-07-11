"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

type Props<TData> = {
  data: TData[];
  columns: GridColDef[];
};

export function DataTable<TData>({ data, columns }: Props<TData>) {
  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
}
