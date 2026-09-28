import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Explorer",
  description: "Product Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}