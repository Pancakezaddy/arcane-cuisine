import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcane Kitchen – Batch Recipe Planning Studio",
  description: "Turn one core protein and pantry preferences into a full week of structured, styled recipe guides.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
