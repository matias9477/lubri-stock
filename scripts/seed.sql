-- 🌱 Seed script for Lubri Stock Database
-- Run with: psql lubristock -f scripts/seed.sql

-- Clear existing data (optional - uncomment if you want to start fresh)
-- DELETE FROM product_equivalences;
-- DELETE FROM product_suppliers;
-- DELETE FROM product_applications;
-- DELETE FROM stock_movements;
-- DELETE FROM products;
-- DELETE FROM categories;
-- DELETE FROM brands;

-- Insert brands
INSERT INTO brands (id, name) VALUES
  (gen_random_uuid(), 'Bosch'),
  (gen_random_uuid(), 'NGK'),
  (gen_random_uuid(), 'Mann'),
  (gen_random_uuid(), 'Mahle'),
  (gen_random_uuid(), 'Continental'),
  (gen_random_uuid(), 'Valeo'),
  (gen_random_uuid(), 'Sachs'),
  (gen_random_uuid(), 'SKF'),
  (gen_random_uuid(), 'Gates'),
  (gen_random_uuid(), 'Dayco')
ON CONFLICT DO NOTHING;

-- Insert categories
INSERT INTO categories (id, name) VALUES
  (gen_random_uuid(), 'Filtros'),
  (gen_random_uuid(), 'Aceites'),
  (gen_random_uuid(), 'Frenos'),
  (gen_random_uuid(), 'Suspensión'),
  (gen_random_uuid(), 'Motor'),
  (gen_random_uuid(), 'Transmisión'),
  (gen_random_uuid(), 'Eléctrico'),
  (gen_random_uuid(), 'Refrigeración'),
  (gen_random_uuid(), 'Dirección'),
  (gen_random_uuid(), 'Escape')
ON CONFLICT DO NOTHING;

-- Get brand and category IDs for reference
DO $$
DECLARE
  bosch_id UUID;
  ngk_id UUID;
  mann_id UUID;
  mahle_id UUID;
  continental_id UUID;
  valeo_id UUID;
  sachs_id UUID;
  skf_id UUID;
  gates_id UUID;
  dayco_id UUID;
  
  filtros_id UUID;
  aceites_id UUID;
  frenos_id UUID;
  suspension_id UUID;
  motor_id UUID;
  transmision_id UUID;
  electrico_id UUID;
  refrigeracion_id UUID;
  direccion_id UUID;
  escape_id UUID;
BEGIN
  -- Get brand IDs
  SELECT id INTO bosch_id FROM brands WHERE name = 'Bosch' LIMIT 1;
  SELECT id INTO ngk_id FROM brands WHERE name = 'NGK' LIMIT 1;
  SELECT id INTO mann_id FROM brands WHERE name = 'Mann' LIMIT 1;
  SELECT id INTO mahle_id FROM brands WHERE name = 'Mahle' LIMIT 1;
  SELECT id INTO continental_id FROM brands WHERE name = 'Continental' LIMIT 1;
  SELECT id INTO valeo_id FROM brands WHERE name = 'Valeo' LIMIT 1;
  SELECT id INTO sachs_id FROM brands WHERE name = 'Sachs' LIMIT 1;
  SELECT id INTO skf_id FROM brands WHERE name = 'SKF' LIMIT 1;
  SELECT id INTO gates_id FROM brands WHERE name = 'Gates' LIMIT 1;
  SELECT id INTO dayco_id FROM brands WHERE name = 'Dayco' LIMIT 1;
  
  -- Get category IDs
  SELECT id INTO filtros_id FROM categories WHERE name = 'Filtros' LIMIT 1;
  SELECT id INTO aceites_id FROM categories WHERE name = 'Aceites' LIMIT 1;
  SELECT id INTO frenos_id FROM categories WHERE name = 'Frenos' LIMIT 1;
  SELECT id INTO suspension_id FROM categories WHERE name = 'Suspensión' LIMIT 1;
  SELECT id INTO motor_id FROM categories WHERE name = 'Motor' LIMIT 1;
  SELECT id INTO transmision_id FROM categories WHERE name = 'Transmisión' LIMIT 1;
  SELECT id INTO electrico_id FROM categories WHERE name = 'Eléctrico' LIMIT 1;
  SELECT id INTO refrigeracion_id FROM categories WHERE name = 'Refrigeración' LIMIT 1;
  SELECT id INTO direccion_id FROM categories WHERE name = 'Dirección' LIMIT 1;
  SELECT id INTO escape_id FROM categories WHERE name = 'Escape' LIMIT 1;

  -- Insert products
  INSERT INTO products (id, name, code, brand_id, category_id, dimensions, list_price, installed_price, stock_quantity, notes) VALUES
    -- Filtros
    (gen_random_uuid(), 'Filtro de Aceite Bosch', 'BOS-001', bosch_id, filtros_id, '3/4-16 UNF', 15.99, 25.99, 50, 'Filtro de aceite de alta calidad para motores gasolina y diesel'),
    (gen_random_uuid(), 'Filtro de Aire NGK', 'NGK-001', ngk_id, filtros_id, '200x150mm', 12.50, 18.50, 75, 'Filtro de aire con papel de alta eficiencia'),
    (gen_random_uuid(), 'Filtro de Combustible Mann', 'MANN-001', mann_id, filtros_id, 'M12x1.5', 8.99, 14.99, 100, 'Filtro de combustible para sistemas de inyección'),
    (gen_random_uuid(), 'Filtro de Cabina Bosch', 'BOS-002', bosch_id, filtros_id, '250x200mm', 22.00, 32.00, 30, 'Filtro de cabina con carbón activado'),
    
    -- Aceites
    (gen_random_uuid(), 'Aceite Motor 5W-30', 'OIL-001', continental_id, aceites_id, '1L', 8.50, 15.50, 200, 'Aceite sintético para motores modernos'),
    (gen_random_uuid(), 'Aceite Motor 10W-40', 'OIL-002', continental_id, aceites_id, '4L', 28.00, 45.00, 150, 'Aceite mineral para motores clásicos'),
    (gen_random_uuid(), 'Aceite Transmisión ATF', 'OIL-003', continental_id, aceites_id, '1L', 12.00, 20.00, 80, 'Aceite para transmisiones automáticas'),
    
    -- Frenos
    (gen_random_uuid(), 'Pastillas de Freno Delanteras', 'BRAKE-001', valeo_id, frenos_id, '140x25mm', 45.00, 75.00, 60, 'Pastillas de freno cerámicas para mejor rendimiento'),
    (gen_random_uuid(), 'Pastillas de Freno Traseras', 'BRAKE-002', valeo_id, frenos_id, '120x20mm', 35.00, 60.00, 60, 'Pastillas de freno orgánicas'),
    (gen_random_uuid(), 'Discos de Freno Delanteros', 'BRAKE-003', valeo_id, frenos_id, '280x22mm', 65.00, 95.00, 40, 'Discos de freno ventilados'),
    
    -- Suspensión
    (gen_random_uuid(), 'Amortiguador Delantero', 'SUSP-001', sachs_id, suspension_id, '450mm', 85.00, 120.00, 25, 'Amortiguador de gas para mejor control'),
    (gen_random_uuid(), 'Resorte de Suspensión', 'SUSP-002', sachs_id, suspension_id, '350mm', 55.00, 85.00, 30, 'Resorte de acero de alta resistencia'),
    
    -- Motor
    (gen_random_uuid(), 'Bujía NGK', 'ENG-001', ngk_id, motor_id, 'M14x1.25', 4.50, 8.50, 200, 'Bujía de iridio para mejor combustión'),
    (gen_random_uuid(), 'Correa de Distribución', 'ENG-002', gates_id, motor_id, '1200mm', 35.00, 55.00, 50, 'Correa de distribución de caucho reforzado'),
    (gen_random_uuid(), 'Bomba de Agua', 'ENG-003', mahle_id, motor_id, 'Estándar', 45.00, 70.00, 35, 'Bomba de agua con rodamiento sellado'),
    
    -- Transmisión
    (gen_random_uuid(), 'Embrague Completo', 'TRANS-001', sachs_id, transmision_id, '240mm', 180.00, 280.00, 15, 'Kit de embrague completo con volante'),
    (gen_random_uuid(), 'Aceite de Transmisión Manual', 'TRANS-002', continental_id, transmision_id, '1L', 15.00, 25.00, 90, 'Aceite para transmisiones manuales'),
    
    -- Eléctrico
    (gen_random_uuid(), 'Batería 60Ah', 'ELEC-001', bosch_id, electrico_id, '242x175x190mm', 95.00, 130.00, 20, 'Batería de 60Ah con garantía de 2 años'),
    (gen_random_uuid(), 'Alternador Reconstruido', 'ELEC-002', bosch_id, electrico_id, 'Estándar', 120.00, 180.00, 10, 'Alternador reconstruido con garantía'),
    
    -- Refrigeración
    (gen_random_uuid(), 'Radiador de Agua', 'COOL-001', mahle_id, refrigeracion_id, '600x400mm', 150.00, 220.00, 8, 'Radiador de aluminio para mejor disipación'),
    (gen_random_uuid(), 'Termostato', 'COOL-002', mahle_id, refrigeracion_id, 'M30x1.5', 12.00, 20.00, 45, 'Termostato de 82°C'),
    
    -- Dirección
    (gen_random_uuid(), 'Bomba de Dirección Asistida', 'STEER-001', skf_id, direccion_id, 'Estándar', 85.00, 130.00, 12, 'Bomba de dirección hidráulica'),
    (gen_random_uuid(), 'Aceite de Dirección', 'STEER-002', continental_id, direccion_id, '1L', 8.00, 15.00, 70, 'Aceite para dirección asistida'),
    
    -- Escape
    (gen_random_uuid(), 'Silenciador Trasero', 'EXH-001', dayco_id, escape_id, '400mm', 75.00, 110.00, 18, 'Silenciador de escape estándar'),
    (gen_random_uuid(), 'Catalizador', 'EXH-002', dayco_id, escape_id, '300mm', 200.00, 320.00, 5, 'Catalizador de tres vías');

  RAISE NOTICE '✅ Database seeded successfully!';
  RAISE NOTICE '📊 Summary:';
  RAISE NOTICE '   - 10 brands created';
  RAISE NOTICE '   - 10 categories created';
  RAISE NOTICE '   - 25 products created';
END $$; 