import React from "react";
import { Metadata } from "next";
import { CategoriesPage, ExperiencePage } from "@container";
import { callApi } from "../../../lib/actions/__api.actions";

export const metadata: Metadata = {
  title: "Experince",
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
export const dynamic = "force-dynamic";

export default async function page() {
  const { data } = await callApi({ method: "get", path: "categories" });

  return <CategoriesPage categories={data} />;
}
