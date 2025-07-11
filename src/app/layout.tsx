import { Providers } from "./Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import { ContentWrapper } from "@/components/ContentWrapper";

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
        <Providers>
          <NavbarProvider>
            <div style={{ display: "flex", minHeight: "100vh" }}>
              <ContentWrapper>{children}</ContentWrapper>
              <Navbar />
            </div>
          </NavbarProvider>
        </Providers>
      </body>
    </html>
  );
}
