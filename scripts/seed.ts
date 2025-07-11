import { db } from "../src/db";
import { brands, categories, products } from "../src/db/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create brands
  console.log("Creating brands...");
  const brandData = [
    { name: "Bosch" },
    { name: "NGK" },
    { name: "Mann" },
    { name: "Mahle" },
    { name: "Continental" },
    { name: "Valeo" },
    { name: "Sachs" },
    { name: "SKF" },
    { name: "Gates" },
    { name: "Dayco" },
  ];

  const createdBrands = await db.insert(brands).values(brandData).returning();
  console.log(`✅ Created ${createdBrands.length} brands`);

  // Create categories
  console.log("Creating categories...");
  const categoryData = [
    { name: "Filtros" },
    { name: "Aceites" },
    { name: "Frenos" },
    { name: "Suspensión" },
    { name: "Motor" },
    { name: "Transmisión" },
    { name: "Eléctrico" },
    { name: "Refrigeración" },
    { name: "Dirección" },
    { name: "Escape" },
  ];

  const createdCategories = await db
    .insert(categories)
    .values(categoryData)
    .returning();
  console.log(`✅ Created ${createdCategories.length} categories`);

  // Create products
  console.log("Creating products...");
  const productData = [
    // Filtros
    {
      name: "Filtro de Aceite Bosch",
      code: "BOS-001",
      brandId: createdBrands[0].id, // Bosch
      categoryId: createdCategories[0].id, // Filtros
      dimensions: "3/4-16 UNF",
      listPrice: "15.99",
      installedPrice: "25.99",
      stockQuantity: 50,
      notes: "Filtro de aceite de alta calidad para motores gasolina y diesel",
    },
    {
      name: "Filtro de Aire NGK",
      code: "NGK-001",
      brandId: createdBrands[1].id, // NGK
      categoryId: createdCategories[0].id, // Filtros
      dimensions: "200x150mm",
      listPrice: "12.50",
      installedPrice: "18.50",
      stockQuantity: 75,
      notes: "Filtro de aire con papel de alta eficiencia",
    },
    {
      name: "Filtro de Combustible Mann",
      code: "MANN-001",
      brandId: createdBrands[2].id, // Mann
      categoryId: createdCategories[0].id, // Filtros
      dimensions: "M12x1.5",
      listPrice: "8.99",
      installedPrice: "14.99",
      stockQuantity: 100,
      notes: "Filtro de combustible para sistemas de inyección",
    },
    {
      name: "Filtro de Cabina Bosch",
      code: "BOS-002",
      brandId: createdBrands[0].id, // Bosch
      categoryId: createdCategories[0].id, // Filtros
      dimensions: "250x200mm",
      listPrice: "22.00",
      installedPrice: "32.00",
      stockQuantity: 30,
      notes: "Filtro de cabina con carbón activado",
    },

    // Aceites
    {
      name: "Aceite Motor 5W-30",
      code: "OIL-001",
      brandId: createdBrands[4].id, // Continental
      categoryId: createdCategories[1].id, // Aceites
      dimensions: "1L",
      listPrice: "8.50",
      installedPrice: "15.50",
      stockQuantity: 200,
      notes: "Aceite sintético para motores modernos",
    },
    {
      name: "Aceite Motor 10W-40",
      code: "OIL-002",
      brandId: createdBrands[4].id, // Continental
      categoryId: createdCategories[1].id, // Aceites
      dimensions: "4L",
      listPrice: "28.00",
      installedPrice: "45.00",
      stockQuantity: 150,
      notes: "Aceite mineral para motores clásicos",
    },
    {
      name: "Aceite Transmisión ATF",
      code: "OIL-003",
      brandId: createdBrands[4].id, // Continental
      categoryId: createdCategories[1].id, // Aceites
      dimensions: "1L",
      listPrice: "12.00",
      installedPrice: "20.00",
      stockQuantity: 80,
      notes: "Aceite para transmisiones automáticas",
    },

    // Frenos
    {
      name: "Pastillas de Freno Delanteras",
      code: "BRAKE-001",
      brandId: createdBrands[5].id, // Valeo
      categoryId: createdCategories[2].id, // Frenos
      dimensions: "140x25mm",
      listPrice: "45.00",
      installedPrice: "75.00",
      stockQuantity: 60,
      notes: "Pastillas de freno cerámicas para mejor rendimiento",
    },
    {
      name: "Pastillas de Freno Traseras",
      code: "BRAKE-002",
      brandId: createdBrands[5].id, // Valeo
      categoryId: createdCategories[2].id, // Frenos
      dimensions: "120x20mm",
      listPrice: "35.00",
      installedPrice: "60.00",
      stockQuantity: 60,
      notes: "Pastillas de freno orgánicas",
    },
    {
      name: "Discos de Freno Delanteros",
      code: "BRAKE-003",
      brandId: createdBrands[5].id, // Valeo
      categoryId: createdCategories[2].id, // Frenos
      dimensions: "280x22mm",
      listPrice: "65.00",
      installedPrice: "95.00",
      stockQuantity: 40,
      notes: "Discos de freno ventilados",
    },

    // Suspensión
    {
      name: "Amortiguador Delantero",
      code: "SUSP-001",
      brandId: createdBrands[6].id, // Sachs
      categoryId: createdCategories[3].id, // Suspensión
      dimensions: "450mm",
      listPrice: "85.00",
      installedPrice: "120.00",
      stockQuantity: 25,
      notes: "Amortiguador de gas para mejor control",
    },
    {
      name: "Resorte de Suspensión",
      code: "SUSP-002",
      brandId: createdBrands[6].id, // Sachs
      categoryId: createdCategories[3].id, // Suspensión
      dimensions: "350mm",
      listPrice: "55.00",
      installedPrice: "85.00",
      stockQuantity: 30,
      notes: "Resorte de acero de alta resistencia",
    },

    // Motor
    {
      name: "Bujía NGK",
      code: "ENG-001",
      brandId: createdBrands[1].id, // NGK
      categoryId: createdCategories[4].id, // Motor
      dimensions: "M14x1.25",
      listPrice: "4.50",
      installedPrice: "8.50",
      stockQuantity: 200,
      notes: "Bujía de iridio para mejor combustión",
    },
    {
      name: "Correa de Distribución",
      code: "ENG-002",
      brandId: createdBrands[8].id, // Gates
      categoryId: createdCategories[4].id, // Motor
      dimensions: "1200mm",
      listPrice: "35.00",
      installedPrice: "55.00",
      stockQuantity: 50,
      notes: "Correa de distribución de caucho reforzado",
    },
    {
      name: "Bomba de Agua",
      code: "ENG-003",
      brandId: createdBrands[3].id, // Mahle
      categoryId: createdCategories[4].id, // Motor
      dimensions: "Estándar",
      listPrice: "45.00",
      installedPrice: "70.00",
      stockQuantity: 35,
      notes: "Bomba de agua con rodamiento sellado",
    },

    // Transmisión
    {
      name: "Embrague Completo",
      code: "TRANS-001",
      brandId: createdBrands[6].id, // Sachs
      categoryId: createdCategories[5].id, // Transmisión
      dimensions: "240mm",
      listPrice: "180.00",
      installedPrice: "280.00",
      stockQuantity: 15,
      notes: "Kit de embrague completo con volante",
    },
    {
      name: "Aceite de Transmisión Manual",
      code: "TRANS-002",
      brandId: createdBrands[4].id, // Continental
      categoryId: createdCategories[5].id, // Transmisión
      dimensions: "1L",
      listPrice: "15.00",
      installedPrice: "25.00",
      stockQuantity: 90,
      notes: "Aceite para transmisiones manuales",
    },

    // Eléctrico
    {
      name: "Batería 60Ah",
      code: "ELEC-001",
      brandId: createdBrands[0].id, // Bosch
      categoryId: createdCategories[6].id, // Eléctrico
      dimensions: "242x175x190mm",
      listPrice: "95.00",
      installedPrice: "130.00",
      stockQuantity: 20,
      notes: "Batería de 60Ah con garantía de 2 años",
    },
    {
      name: "Alternador Reconstruido",
      code: "ELEC-002",
      brandId: createdBrands[0].id, // Bosch
      categoryId: createdCategories[6].id, // Eléctrico
      dimensions: "Estándar",
      listPrice: "120.00",
      installedPrice: "180.00",
      stockQuantity: 10,
      notes: "Alternador reconstruido con garantía",
    },

    // Refrigeración
    {
      name: "Radiador de Agua",
      code: "COOL-001",
      brandId: createdBrands[3].id, // Mahle
      categoryId: createdCategories[7].id, // Refrigeración
      dimensions: "600x400mm",
      listPrice: "150.00",
      installedPrice: "220.00",
      stockQuantity: 8,
      notes: "Radiador de aluminio para mejor disipación",
    },
    {
      name: "Termostato",
      code: "COOL-002",
      brandId: createdBrands[3].id, // Mahle
      categoryId: createdCategories[7].id, // Refrigeración
      dimensions: "M30x1.5",
      listPrice: "12.00",
      installedPrice: "20.00",
      stockQuantity: 45,
      notes: "Termostato de 82°C",
    },

    // Dirección
    {
      name: "Bomba de Dirección Asistida",
      code: "STEER-001",
      brandId: createdBrands[7].id, // SKF
      categoryId: createdCategories[8].id, // Dirección
      dimensions: "Estándar",
      listPrice: "85.00",
      installedPrice: "130.00",
      stockQuantity: 12,
      notes: "Bomba de dirección hidráulica",
    },
    {
      name: "Aceite de Dirección",
      code: "STEER-002",
      brandId: createdBrands[4].id, // Continental
      categoryId: createdCategories[8].id, // Dirección
      dimensions: "1L",
      listPrice: "8.00",
      installedPrice: "15.00",
      stockQuantity: 70,
      notes: "Aceite para dirección asistida",
    },

    // Escape
    {
      name: "Silenciador Trasero",
      code: "EXH-001",
      brandId: createdBrands[9].id, // Dayco
      categoryId: createdCategories[9].id, // Escape
      dimensions: "400mm",
      listPrice: "75.00",
      installedPrice: "110.00",
      stockQuantity: 18,
      notes: "Silenciador de escape estándar",
    },
    {
      name: "Catalizador",
      code: "EXH-002",
      brandId: createdBrands[9].id, // Dayco
      categoryId: createdCategories[9].id, // Escape
      dimensions: "300mm",
      listPrice: "200.00",
      installedPrice: "320.00",
      stockQuantity: 5,
      notes: "Catalizador de tres vías",
    },
  ];

  const createdProducts = await db
    .insert(products)
    .values(productData)
    .returning();
  console.log(`✅ Created ${createdProducts.length} products`);

  console.log("🎉 Database seeding completed successfully!");
  console.log(`📊 Summary:`);
  console.log(`   - ${createdBrands.length} brands`);
  console.log(`   - ${createdCategories.length} categories`);
  console.log(`   - ${createdProducts.length} products`);
}

seed().catch(console.error);
