"use client";

import { api } from "@/trpc/react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";

interface Props {
  productId: string;
}

export const ProductEquivalents = ({ productId }: Props) => {
  const { data, isLoading, error } = api.stock.getEquivalents.useQuery({
    productId,
  });

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar equivalencias
      </Alert>
    );

  if (!data?.length)
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Sin equivalencias registradas
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Equivalencias
      </Typography>
      <List>
        {data.map((product) => (
          <ListItem key={product.id} sx={{ py: 0.5 }}>
            <ListItemText primary={`${product.name} (${product.code})`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
