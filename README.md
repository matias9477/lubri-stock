# Lubri Stock

Sistema de gestión de stock (con extensión futura a ventas) para "El Lubri de Barto".

## 🌟 Tecnologías utilizadas

- **Frontend**: Next.js (App Router) + React + TailwindCSS
- **Backend**: tRPC (dentro de Next.js API Routes)
- **Base de datos**: PostgreSQL
- **ORM**: Drizzle ORM
- **Gestor de paquetes**: pnpm
- **UI Library**: ShadCN

---

## 🚀 Levantar el proyecto en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-org/lubri-stock.git
cd lubri-stock
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Crear archivo `.env`

```bash
touch .env
```

Y agregar la variable de conexión a PostgreSQL:

```
DATABASE_URL=postgresql://usuario:password@localhost:5432/lubristock
```

### 4. Crear base de datos local (si no existe)

```bash
createdb lubristock
```

### 5. Correr migraciones

```bash
npx drizzle-kit push --config drizzle.config.ts
```

### 6. Seedear la base de datos (opcional)

Para poblar la base de datos con datos de ejemplo:

```bash
psql lubristock -f scripts/seed.sql
```

Esto agregará:

- Marcas populares (Bosch, NGK, Mann, etc.)
- Categorías de productos (Filtros, Aceites, Frenos, etc.)
- Productos de ejemplo con equivalencias

### 7. Levantar el proyecto

```bash
pnpm dev
```

Abriéndolo en [http://localhost:3000](http://localhost:3000)

---

## 🏢 Estructura del proyecto

```
lubri-stock/
├── src/
│   ├── app/                 # Rutas y páginas Next.js
│   │   ├── stock/           # Pantalla de stock principal
│   │   └── api/trpc/        # Endpoint para tRPC
│   ├── db/                  # Esquema y conexión a la DB
│   ├── server/api/          # Routers tRPC
│   └── trpc/                # Cliente tRPC React
├── drizzle.config.ts       # Configuración de Drizzle ORM
├── tailwind.config.ts      # Config de Tailwind
├── postcss.config.js       # Config de PostCSS
├── .env                    # Variables de entorno
```

---

## 📅 ToDo / Futuras mejoras

- [ ] Formulario para agregar nuevos productos
- [ ] Alta de equivalencias entre productos
- [ ] Vista de vehículos compatibles
- [ ] Sistema de roles / auth
- [ ] Registro de movimientos de stock
- [ ] Vista de ventas y colocaciones
- [ ] Modo offline (PWA)

---

## 📢 Para el team "los pibardos"

- Usar `pnpm` siempre para instalar paquetes
- Todo el código está en `src/`
- Cualquier router nuevo de tRPC va en `src/server/api/`
- Las pantallas nuevas van en `src/app/<ruta>`
- Si se agregan tablas, actualizar el schema en `src/db/schema.ts` y correr `npx drizzle-kit push`
- Si algo no anda, manden mensaje o revisen los logs en consola antes de bardear al proyecto

## 🧩 Herramientas adicionales

### 📦 shadcn/ui

Usamos [shadcn/ui](https://ui.shadcn.dev) como sistema de componentes sobre TailwindCSS.

Para agregar un componente nuevo:

```bash
pnpm dlx shadcn-ui@latest add <componente>
```

Ejemplo para agregar un botón:

```bash
pnpm dlx shadcn-ui@latest add button
```

Los componentes se copian en `src/components/ui/` y se pueden editar libremente.

---

### 🧪 Commitizen + Conventional Commits

Usamos [Commitizen](https://github.com/commitizen/cz-cli) para mantener commits consistentes.

Para hacer un commit:

```bash
pnpm commit
```

Esto te guía paso a paso para usar formatos como:

```
feat(stock): agregar dropdowns de marca y categoría
fix(form): corregir validación de precios negativos
```

Para configurar un nuevo entorno:

```bash
pnpm install
pnpm dlx husky init
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

---

---

Hecho con ❤️ por los que saben de filtros, aceites y código.
