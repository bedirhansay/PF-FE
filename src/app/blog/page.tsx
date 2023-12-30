import React from "react";
import { ClientBlogPage } from "@container";
import { callApi } from "../../lib/actions/__api.actions";
export const dynamic = "force-dynamic";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bedirhan Say - Blog",
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

export default async function page() {
  const { data } = await callApi({ method: "get", path: "blog" });

  return <ClientBlogPage blogs={data} />;
}
