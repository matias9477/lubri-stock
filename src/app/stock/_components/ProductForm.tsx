"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";
import { MultiSelectCombobox } from "@/components/multiselect-combobox";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  code: z.string().min(1, { message: "El código es requerido" }),
  brandId: z.string().uuid({ message: "La marca es requerida" }),
  categoryId: z.string().uuid({ message: "La categoría es requerida" }),
  stockQuantity: z.coerce
    .number()
    .min(0, { message: "El stock debe ser mayor a 0" }),
  listPrice: z.coerce
    .number()
    .min(0, { message: "El precio de lista debe ser mayor a 0" }),
  installedPrice: z.coerce
    .number()
    .min(0, { message: "El precio colocado debe ser mayor a 0" }),
  notes: z.string().optional().nullable(),
  dimensions: z.unknown().optional(),
  equivalentIds: z.array(z.string().uuid()).optional(),
});

export type ProductFormValues = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (values: ProductFormValues) => void;
  defaultValues: ProductFormValues;
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  isSubmitting?: boolean;
  submitLabel?: string;
  mode?: "create" | "edit";
  allProducts?: { id: string; name: string }[];
};

export const ProductForm = ({
  onSubmit,
  defaultValues,
  brands,
  categories,
  isSubmitting = false,
  submitLabel = "Guardar",
  mode = "create",
  allProducts,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <TextField
            {...field}
            label="Código"
            variant="outlined"
            fullWidth
            error={!!errors.code}
            helperText={errors.code?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="brandId"
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.brandId}>
            <InputLabel>Marca</InputLabel>
            <Select {...field} label="Marca">
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
            {errors.brandId && (
              <FormHelperText>{errors.brandId.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.categoryId}>
            <InputLabel>Categoría</InputLabel>
            <Select {...field} label="Categoría">
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && (
              <FormHelperText>{errors.categoryId.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="stockQuantity"
        render={({ field }) => (
          <TextField
            {...field}
            label="Stock"
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="listPrice"
        render={({ field }) => (
          <TextField
            {...field}
            label="Precio de lista"
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.listPrice}
            helperText={errors.listPrice?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="installedPrice"
        render={({ field }) => (
          <TextField
            {...field}
            label="Precio colocado"
            type="number"
            variant="outlined"
            fullWidth
            error={!!errors.installedPrice}
            helperText={errors.installedPrice?.message}
          />
        )}
      />

      {mode === "edit" && allProducts && (
        <Controller
          control={control}
          name="equivalentIds"
          render={({ field }) => (
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Equivalencias
              </Typography>
              <MultiSelectCombobox
                options={allProducts.map((p) => ({
                  label: p.name,
                  value: p.id,
                }))}
                value={field.value || []}
                onChange={field.onChange}
              />
            </Box>
          )}
        />
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {submitLabel}
      </Button>
    </Box>
  );
};
