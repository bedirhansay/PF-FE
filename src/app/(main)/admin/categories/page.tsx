import React from "react";
import { Metadata } from "next";
import { callApi } from "../../../../lib/actions/__api.actions";
import { CategoriesPage } from "@/container/Admin/CategoriesPage/CategoriesPage";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Merhaba, ben Bedirhan Say. Web geliştirme, tasarım ve yazılım konularında uzmanlaşmış bir freelancer'ım. Portföyümde sunduğum hizmetler arasında Next JS, SCSS, Git, Husky, RTQ, Linear, Commitlint, Lint Stage, Prettier, Zustand, Refine JS, Restful API, Context Provider ve Payment Gateway API gibi çeşitli teknolojiler ve kavramlar bulunmaktadır. Ayrıca blog yazılarımda bu konularda edindiğim deneyimleri ve sektördeki yenilikleri paylaşıyorum. Siz de benimle birlikte projelerinizi hayata geçirmek veya bu konularda daha fazla bilgi almak için iletişime geçebilirsiniz.",
  keywords: [
    "Bedirhan Say",
    "Freelance",
    "Portföy",
    "Blog",
    "Web Geliştirme",
    "Yazılım Geliştirme",
    "Tasarım",
    "E-Ticaret",
    "Next JS",
    "SCSS",
    "Git",
    "Husky",
    "RTQ",
    "Linear",
    "Commitlint",
    "Lint Stage",
    "Prettier",
    "Zustand",
    "Refine JS",
    "Restful API",
    "Context Provider",
    "Payment Gateway API",
  ],

  authors: [{ name: "Bedirhan Say" }],
};
export const dynamic = "force-dynamic";

export default async function page() {
  const { data } = await callApi({ method: "get", path: "categories" });

  return <CategoriesPage categories={data} />;
}
