import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Header } from "@/components/header/header";
import { ActiveSectionProvider } from "@/lib/contex/sectionContex";
import { Toaster } from "react-hot-toast";
import "./globals.scss";

const inter = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bedirhan Say - Freelance Hizmetler ve Portfolyo",
  description:
    "Ben Bedirhan Say. Kendi portföyümde sunduğum hizmetler ve yazdığım blog yazıları ile ilgili daha fazla bilgi alın.",
  keywords: [
    "Bedirhan Say",
    "Freelance",
    "Portföy",
    "Blog",
    "Hizmetler",
    "Web Geliştirme",
    "Yazılım",
    "Tasarım",
    "E-Ticaret",
  ],
  authors: [{ name: "Bedirhan Say" }],
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} layout`}>
        <div className="header-left-color"></div>
        <div className="header-right-color"></div>

        <ActiveSectionProvider>
          <Header />
          {children}
          <Toaster position="top-right" />
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
