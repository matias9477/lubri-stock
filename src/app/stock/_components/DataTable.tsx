"use client";

import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";

type Props<TData> = {
  data: TData[];
  columns: GridColDef[];
  pagination?: {
    page: number;
    pageSize: number;
    rowCount: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
};

export function DataTable<TData>({ data, columns, pagination }: Props<TData>) {
  const handlePaginationModelChange = (model: GridPaginationModel) => {
    if (pagination) {
      // Only call the appropriate function based on what changed
      if (model.page !== pagination.page) {
        pagination.onPageChange(model.page);
      }
      if (model.pageSize !== pagination.pageSize) {
        pagination.onPageSizeChange(model.pageSize);
      }
    }
  };

  // Always provide valid numbers
  const paginationModel: GridPaginationModel = {
    page: pagination?.page ?? 0,
    pageSize: pagination?.pageSize ?? 10,
  };

  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        rowCount={pagination?.rowCount ?? data.length}
        onPaginationModelChange={handlePaginationModelChange}
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
