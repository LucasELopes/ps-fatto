
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Skeleton from "@/components/Skeleton";
import { HandleModalContext} from "./contexts/HandleModalContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Lista de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen`}
    > 
      <Skeleton>
        {children}
      </Skeleton>
    </body>
    </html>
  );
}
