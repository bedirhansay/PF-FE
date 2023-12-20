import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Dashboard - Panel",
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
