import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { BatchProvider } from "@/context/BatchContext";

export const metadata: Metadata = {
  title: "Arcane Kitchen — Batch Recipe Studio",
  description: "Desktop-first batch recipe planning and publishing studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BatchProvider>
          <div className="flex min-h-screen">
            <Nav />
            <main className="flex-1 overflow-auto" style={{ backgroundColor: '#faf7f2' }}>
              {children}
            </main>
          </div>
        </BatchProvider>
      </body>
    </html>
  );
}
