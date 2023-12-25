import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@components/ui";
import { getAllSkills } from "../../../lib/actions/__skills.action";
import { callApi } from "../../../lib/actions/__api.actions";
import { BlogPage } from "@container";

export const metadata: Metadata = {
  title: "Blog",
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
  console.log(data);
  return <BlogPage Blogs={data} />;
}
