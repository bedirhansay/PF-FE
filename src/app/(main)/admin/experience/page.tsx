import React from "react";
import { Metadata } from "next";
import { callApi } from "../../../../lib/Actions/__api.actions";
import { ExperiencePage } from "@/container/Admin/ExperiencePage/ExperiencePage";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Bedirhan Say, İstanbul/Türkiye merkezli bir serbest çalışan full-stack web geliştirici ve veri bilimcisi. Şu anda uzaktan çalışan deneyimli bir frontend web geliştiricisi olarak faaliyet gösteriyorum. React, Next.js, TypeScript, Tailwind CSS gibi modern teknolojilere hakimim ve bu teknolojilerle birçok başarılı projeyi hayata geçirdim. Özellikle kullanıcı dostu ve etkileşimli kullanıcı arayüzleri tasarlamak, monolitik mimariler oluşturmak ve web performansını artırmak konularında uzmanım. Aynı zamanda bir data scientist olarak da deneyimim bulunmaktadır; Python, makine öğrenmesi ve veri analizi konularında bilgi sahibiyim. Bu süre zarfında elde ettiğim bilgi birikimini sürekli olarak güncelleyerek, projelerime değer katmaya devam ediyorum. Bedirhan Say'ın web geliştirme ve veri bilimi konusundaki yeteneklerini keşfedin!",

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
  const { data } = await callApi({ method: "get", path: "experience" });

  return <ExperiencePage experience={data} />;
}
