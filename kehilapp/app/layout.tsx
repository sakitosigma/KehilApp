import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KehilApp | Comunidad en un solo lugar",
  description: "Conectá, compartí y crecé junto a tu comunidad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
