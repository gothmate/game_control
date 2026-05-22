import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.sass";

const geistSans = Geist({
  variable: "--font-Roboto",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-Roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Controle de Jogos",
  description: "Controlador de partidas de boardgames",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
