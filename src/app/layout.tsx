import type { Metadata } from "next";
import "@fontsource/poppins";
import "./globals.css";
import { HeaderMenu } from "@/app/components/header-menu";
import { Footer } from "./components/footer";


export const metadata: Metadata = {
  title: "Track&Trace",
  description: "Seu novo jeito de acompanhar transporte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <HeaderMenu />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>

    </html>
  );
}
