import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../(root)/globals.scss";

const inter = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F3F4F6]`}>{children}</body>
    </html>
  );
}
