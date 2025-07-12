import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  numeric,
  integer,
  jsonb,
  timestamp,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";

export const brands = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  code: text("code"),
  brandId: uuid("brand_id").references(() => brands.id),
  categoryId: uuid("category_id").references(() => categories.id),
  dimensions: text("dimensions"),
  listPrice: numeric("list_price"),
  installedPrice: numeric("installed_price"),
  stockQuantity: integer("stock_quantity").default(0),
  notes: text("notes"),
});

export const vehicles = pgTable("vehicles", {
  id: uuid("id").defaultRandom().primaryKey(),
  brand: text("brand"),
  model: text("model"),
  engine: text("engine"),
  yearStart: integer("year_start"),
  yearEnd: integer("year_end"),
});

export const productApplications = pgTable(
  "product_applications",
  {
    productId: uuid("product_id").references(() => products.id),
    vehicleId: uuid("vehicle_id").references(() => vehicles.id),
  },
  (table) => ({
    pk: primaryKey(table.productId, table.vehicleId),
  })
);

export const stockMovements = pgTable("stock_movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id),
  quantity: integer("quantity"),
  movementType: text("movement_type"),
  reason: text("reason"),
  date: timestamp("date", { withTimezone: true }).defaultNow(),
  userId: uuid("user_id"),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  role: text("role"),
  passwordHash: text("password_hash"),
});

export const suppliers = pgTable("suppliers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  contactInfo: text("contact_info"),
});

export const productSuppliers = pgTable(
  "product_suppliers",
  {
    productId: uuid("product_id").references(() => products.id),
    supplierId: uuid("supplier_id").references(() => suppliers.id),
    purchasePrice: numeric("purchase_price"),
  },
  (table) => ({
    pk: primaryKey(table.productId, table.supplierId),
  })
);

export const productEquivalences = pgTable(
  "product_equivalences",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    equivalentProductId: uuid("equivalent_product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
  },
  (table) => ({
    // Para evitar duplicados en ambos sentidos (A-B y B-A)
    uniquePair: unique().on(table.productId, table.equivalentProductId),
  })
);

// Define relations for products
export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  stockMovements: many(stockMovements),
  productApplications: many(productApplications),
  productSuppliers: many(productSuppliers),
  productEquivalences: many(productEquivalences),
}));

// Define relations for brands
export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

// Define relations for categories
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productEquivalencesRelations = relations(
  productEquivalences,
  ({ one }) => ({
    product: one(products, {
      fields: [productEquivalences.productId],
      references: [products.id],
    }),
    equivalentProduct: one(products, {
      fields: [productEquivalences.equivalentProductId],
      references: [products.id],
    }),
  })
);

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  product: one(products, {
    fields: [stockMovements.productId],
    references: [products.id],
  }),
}));
