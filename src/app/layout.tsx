import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./global.css";

const plex = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

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
    <html lang="th" className={plex.variable}>
      <body>{children}</body>
    </html>
  );
}
