import { Providers } from "./Providers";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lubri Stock",
  description: "Sistema de gestión de stock para El Lubri de Barto",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
