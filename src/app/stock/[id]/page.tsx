import Link from "next/link";
import { Button, Box, Typography, Container, Paper } from "@mui/material";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ProductEquivalents } from "../_components/ProductEquivalents";

export default async function ProductDetailPageWrapper({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <ProductDetailPageServer id={id} />;
}

async function ProductDetailPageServer({ id }: { id: string }) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!product) return notFound();

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button component={Link} href="/stock" variant="outlined">
          ← Volver al stock
        </Button>
        <Button
          component={Link}
          href={`/stock/edit/${product.id}`}
          variant="contained"
        >
          Editar producto
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          {product.name}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1" color="text.secondary">
            Código: {product.code}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stock: {product.stockQuantity}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Precio lista: ${product.listPrice}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Precio colocado: ${product.installedPrice}
          </Typography>
        </Box>
      </Paper>

      <ProductEquivalents productId={product.id} />
    </Container>
  );
}
