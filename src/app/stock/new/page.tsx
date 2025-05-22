"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const utils = api.useUtils();

  const createProduct = api.stock.create.useMutation({
    onSuccess: () => {
      utils.stock.getAll.invalidate();
      router.push("/stock");
    },
  });

  const { data: brands } = api.stock.getBrands.useQuery();
  const { data: categories } = api.stock.getCategories.useQuery();

  const [form, setForm] = useState({
    name: "",
    code: "",
    brandId: "",
    categoryId: "",
    stockQuantity: 0,
    listPrice: 0,
    installedPrice: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct.mutate({
      ...form,
      stockQuantity: Number(form.stockQuantity),
      listPrice: Number(form.listPrice),
      installedPrice: Number(form.installedPrice),
    });
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Código</label>
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Marca</label>
          <select
            name="brandId"
            value={form.brandId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccioná una marca</option>
            {brands?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Categoría</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccioná una categoría</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stockQuantity"
            value={form.stockQuantity}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Precio de lista</label>
          <input
            type="number"
            name="listPrice"
            value={form.listPrice}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Precio colocado</label>
          <input
            type="number"
            name="installedPrice"
            value={form.installedPrice}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear producto
        </button>
      </form>
    </main>
  );
}
