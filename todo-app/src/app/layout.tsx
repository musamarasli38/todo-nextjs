import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";

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
  title: "Todo App in Next.js",
  description:
    "Todo App showcasing Next.js, REST, Tailwind CSS, Shadcn UI and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto flex flex-col min-h-screen space-y-4`}
      >
        <main className=" py-4 space-y-3 px-10"></main>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
