"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
});

export type ProductFormValues = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (values: ProductFormValues) => void;
  defaultValues: ProductFormValues;
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  isSubmitting?: boolean;
  submitLabel?: string;
};

export function ProductForm({
  onSubmit,
  defaultValues,
  brands,
  categories,
  isSubmitting = false,
  submitLabel = "Guardar",
}: Props) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná una marca" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stockQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio de lista</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="installedPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio colocado</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
