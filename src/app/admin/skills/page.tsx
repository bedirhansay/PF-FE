import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@components/ui";
import { SkillsPage } from "@container";
import { getAllSkills } from "../../../lib/actions/__skills.action";

export const metadata: Metadata = {
  title: "Skills",
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
  const { data } = await getAllSkills();
  return (
    <section>
      <Breadcrumb page="Yetenekler" />
      <SkillsPage skills={data} />
    </section>
  );
}
