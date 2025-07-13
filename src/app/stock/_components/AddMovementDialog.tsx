"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import type { MovementType } from "@/server/api/stock/getMovementTypes";

interface AddMovementDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  currentStock: number;
  onSuccess?: () => void;
}

export const AddMovementDialog = ({
  open,
  onClose,
  productId,
  productName,
  currentStock,
  onSuccess,
}: AddMovementDialogProps) => {
  const [quantity, setQuantity] = useState<string>("");
  const [movementType, setMovementType] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState<string>(
    new Date().toTimeString().slice(0, 5)
  );

  const utils = api.useUtils();

  const { data: movementTypes, isLoading: loadingTypes } =
    api.stock.getMovementTypes.useQuery();

  const createMovementMutation = api.stock.createMovement.useMutation({
    onSuccess: () => {
      utils.stock.getAll.invalidate();
      utils.stock.getById.invalidate({ id: productId });
      utils.stock.getMovements.invalidate({ productId });
      onSuccess?.();
      handleClose();
    },
  });

  const handleClose = () => {
    setQuantity("");
    setMovementType("");
    setReason("");
    setDate(new Date().toISOString().split("T")[0]);
    setTime(new Date().toTimeString().slice(0, 5));
    onClose();
  };

  const handleSubmit = () => {
    if (!quantity || !movementType || !reason) return;

    const quantityNum = parseFloat(quantity);
    if (isNaN(quantityNum) || quantityNum === 0) return;

    // Automatically make quantity negative for certain movement types
    const selectedType = movementTypes?.find((t) => t.value === movementType);
    const finalQuantity =
      selectedType?.isPositive === false ? -Math.abs(quantityNum) : quantityNum;

    createMovementMutation.mutate({
      productId,
      quantity: finalQuantity,
      movementType,
      reason,
      date:
        date && time
          ? (() => {
              // Create date with the actual selected date and time
              const [year, month, day] = date.split("-").map(Number);
              const [hours, minutes] = time.split(":").map(Number);
              const localDate = new Date(
                year,
                month - 1,
                day,
                hours,
                minutes,
                0
              );
              return localDate.toISOString();
            })()
          : undefined,
    });
  };

  const selectedType = movementTypes?.find((t) => t.value === movementType);
  const quantityNum = parseFloat(quantity) || 0;
  // Calculate final quantity for preview
  const finalQuantity =
    selectedType?.isPositive === false ? -Math.abs(quantityNum) : quantityNum;
  const newStock = currentStock + finalQuantity;

  const isFormValid = quantity && movementType && reason && quantityNum !== 0;
  const isStockValid = newStock >= 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Movimiento de Stock</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Producto: <strong>{productName}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock actual: <strong>{currentStock}</strong>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Movimiento</InputLabel>
            <Select
              value={movementType}
              onChange={(e) => {
                setMovementType(e.target.value);
                // If switching to a negative movement type and we have a positive quantity, make it negative
                const newType = movementTypes?.find(
                  (t) => t.value === e.target.value
                );
                if (
                  newType?.isPositive === false &&
                  quantity &&
                  parseFloat(quantity) > 0
                ) {
                  setQuantity(`-${quantity}`);
                }
              }}
              label="Tipo de Movimiento"
              disabled={loadingTypes}
            >
              {movementTypes?.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            helperText={
              selectedType?.isPositive === false
                ? "Cantidad (se hará negativa automáticamente)"
                : "Cantidad positiva (ej: 10)"
            }
          />

          <TextField
            label="Motivo"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Fecha"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Hora"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {quantityNum !== 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Movimiento:{" "}
                <strong
                  style={{ color: finalQuantity > 0 ? "#4caf50" : "#f44336" }}
                >
                  {finalQuantity > 0 ? `+${finalQuantity}` : `${finalQuantity}`}
                </strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock después del movimiento:{" "}
                <strong
                  style={{
                    color: isStockValid ? "inherit" : "#f44336",
                  }}
                >
                  {newStock}
                </strong>
              </Typography>
            </Box>
          )}

          {!isStockValid && (
            <Alert severity="error">El stock no puede ser negativo</Alert>
          )}

          {createMovementMutation.error && (
            <Alert severity="error">
              {createMovementMutation.error.message}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={createMovementMutation.isPending}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !isFormValid || !isStockValid || createMovementMutation.isPending
          }
        >
          {createMovementMutation.isPending ? (
            <CircularProgress size={20} />
          ) : (
            "Agregar Movimiento"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
