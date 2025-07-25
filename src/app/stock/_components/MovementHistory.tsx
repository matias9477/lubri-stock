"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { api } from "@/trpc/react";
import { DataTable } from "./DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { AddMovementDialog } from "./AddMovementDialog";

export type MovementRow = {
  id: string;
  quantity: number;
  movementType: string;
  reason: string;
  date: string;
  product: {
    id: string;
    name: string;
    code: string | null;
  };
};

interface MovementHistoryProps {
  productId: string;
  productName: string;
  currentStock: number;
}

const movementTypeLabels: Record<string, string> = {
  purchase: "Compra",
  sale: "Venta",
  adjustment: "Ajuste",
  return: "Devolución",
  transfer: "Transferencia",
  loss: "Pérdida",
  initial: "Stock Inicial",
};

export const MovementHistory = ({
  productId,
  productName,
  currentStock,
}: MovementHistoryProps) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [movementType, setMovementType] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const {
    data: movementsData,
    isLoading,
    isFetching,
    isError,
    error,
  } = api.stock.getMovements.useQuery(
    {
      productId,
      page,
      pageSize,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      movementType: movementType || undefined,
    },
    {
      // @ts-expect-error: keepPreviousData is a TanStack Query option
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000,
      enabled: !!productId,
    }
  );

  const {
    data: movementTypes,
    isLoading: isLoadingTypes,
    isFetching: isFetchingTypes,
    isError: isErrorTypes,
    error: errorTypes,
  } = api.stock.getMovementTypes.useQuery(undefined, {
    // @ts-expect-error: keepPreviousData is a TanStack Query option
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000,
  });

  const movements =
    movementsData?.data?.map((movement) => ({
      id: movement.id,
      quantity: Number(movement.quantity) || 0,
      movementType: movement.movementType || "",
      reason: movement.reason || "",
      date: movement.date
        ? new Date(movement.date).toISOString()
        : new Date().toISOString(),
      product: movement.product || { id: "", name: "", code: null },
    })) ?? [];
  const pagination = movementsData?.pagination;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Fecha",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        console.log("Date renderCell:", {
          value: params.value,
          type: typeof params.value,
        });
        try {
          const date = new Date(params.value);
          console.log("Parsed date:", date, "isValid:", !isNaN(date.getTime()));
          if (isNaN(date.getTime())) {
            return "Fecha inválida";
          }
          const formatted = date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
          console.log("Formatted date:", formatted);
          return formatted;
        } catch (error) {
          console.error("Date formatting error:", error, params.value);
          return "Fecha inválida";
        }
      },
    },
    {
      field: "movementType",
      headerName: "Tipo",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        console.log("Movement type renderCell:", {
          value: params.value,
          label: movementTypeLabels[params.value],
        });
        return movementTypeLabels[params.value] || params.value;
      },
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        const value = Number(params.value) || 0;
        console.log("Quantity renderCell:", {
          original: params.value,
          converted: value,
        });
        return (
          <span style={{ color: value > 0 ? "green" : "red" }}>
            {value > 0 ? `+${value}` : `${value}`}
          </span>
        );
      },
    },
    {
      field: "reason",
      headerName: "Motivo",
      flex: 2,
      minWidth: 200,
    },
  ];

  const handleAddMovement = () => {
    setShowAddDialog(true);
  };

  const handleMovementSuccess = () => {
    // No need to refetch, TanStack Query will handle it
  };

  if (isLoading || isLoadingTypes) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || isErrorTypes) {
    return (
      <Alert severity="error">
        Error al cargar movimientos:{" "}
        {error instanceof Error ? error.message : ""}{" "}
        {errorTypes instanceof Error ? errorTypes.message : ""}
      </Alert>
    );
  }

  console.log("movements", movements);
  console.log("movementTypeLabels", movementTypeLabels);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Historial de Movimientos</Typography>
        <Button variant="contained" onClick={handleAddMovement}>
          + Agregar Movimiento
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Fecha desde"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fecha hasta"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Tipo de Movimiento</InputLabel>
          <Select
            value={movementType}
            onChange={(e) => setMovementType(e.target.value)}
            label="Tipo de Movimiento"
          >
            <MenuItem value="">Todos</MenuItem>
            {movementTypes?.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {movements.length === 0 ? (
        <Alert severity="info">
          No hay movimientos registrados para este producto.
        </Alert>
      ) : (
        <DataTable<MovementRow>
          columns={columns}
          data={movements}
          pagination={{
            page,
            pageSize,
            rowCount: pagination?.total ?? 0,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
          }}
        />
      )}

      {/* Show background loading indicator */}
      {(isFetching || isFetchingTypes) && !isLoading && !isLoadingTypes && (
        <Box sx={{ position: "fixed", top: 16, right: 16 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      <AddMovementDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        productId={productId}
        productName={productName}
        currentStock={currentStock}
        onSuccess={handleMovementSuccess}
      />
    </Box>
  );
};
