"use client";

import { Box, Typography, List, ListItem, Button } from "@mui/material";
import Link from "next/link";

interface EquivalentProduct {
  id: string;
  name: string;
  code: string | null;
}

interface Equivalent {
  id: string;
  productId: string;
  equivalentProductId: string;
  product: EquivalentProduct;
  equivalentProduct: EquivalentProduct;
}

interface Props {
  equivalents: Equivalent[];
  currentProductId: string;
}

export const ProductEquivalents = ({
  equivalents,
  currentProductId,
}: Props) => {
  if (!equivalents?.length) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Sin equivalencias registradas
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Equivalencias
      </Typography>
      <List>
        {equivalents.map((equivalent) => {
          // Determine which product to show (the one that's not the current product)
          const equivalentProduct =
            equivalent.productId === currentProductId
              ? equivalent.equivalentProduct
              : equivalent.product;

          return (
            <ListItem key={equivalent.id} sx={{ py: 0.5 }}>
              <Button
                component={Link}
                href={`/stock/${equivalentProduct.id}`}
                variant="text"
                sx={{
                  textTransform: "none",
                  p: 0,
                  minWidth: "auto",
                  color: "inherit",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {equivalentProduct.name} ({equivalentProduct.code})
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
