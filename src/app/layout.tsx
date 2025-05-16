import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import Shell from "@/components/Shell";
import "./globals.css";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZERO Games",
  description: "Created by ZerO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${albertSans.variable} h-full antialiased`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
