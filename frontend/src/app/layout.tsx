import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Código Certo",
  description: "Uma página em que você pode postar seus projetos e descrevelos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className}  antialiased
        bg-black
        text-white
        `}
      >
        {children}
      </body>
    </html>
  );
}
