"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleNavigateToStock = () => {
    router.push("/stock");
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          p: 4,
          maxWidth: "md",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "white",
            mb: 2,
          }}
        >
          Lubri Stock
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 3,
          }}
        >
          Bienvenido al sistema de gestión de stock para El Lubri de Barto.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleNavigateToStock}
        >
          Ir al stock
        </Button>
      </Box>
    </Box>
  );
}
