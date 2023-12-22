import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@components/ui";
export const metadata: Metadata = {
  title: "Projects",
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
export default function page() {
  return (
    <div>
      <Breadcrumb page="Projeler" />
      page
    </div>
  );
}
