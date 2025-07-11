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
      pagination.onPageChange(model.page);
      pagination.onPageSizeChange(model.pageSize);
    }
  };

  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        paginationMode={pagination ? "server" : "client"}
        paginationModel={
          pagination
            ? { page: pagination.page, pageSize: pagination.pageSize }
            : undefined
        }
        rowCount={pagination?.rowCount ?? data.length}
        onPaginationModelChange={
          pagination ? handlePaginationModelChange : undefined
        }
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
