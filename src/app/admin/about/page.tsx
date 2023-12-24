import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@components/ui";
import { AboutPage } from "../../../container/AboutPage/AboutPage";
import { getAbout } from "../../../lib/actions/__about.action";
export const metadata: Metadata = {
  title: "About",
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
  const { data } = await getAbout();

  return (
    <div className="">
      <Breadcrumb page="Hakkımda" />
      <AboutPage about={data} />
    </div>
  );
}
