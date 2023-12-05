"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/useSectionInView";

export const About = () => {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="px-10 pt-20 max-w-7xl mx-auto text-center leading-8 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <h2 className="3xl">Hakkımda</h2>
      <p className="mb-3">
        Moleküler Biyoloji alanında bir derece aldıktan sonra, programlamaya
        olan tutkumu takip etmeye karar verdim. Bir kodlama bootcamp&apos;ine
        katıldım ve{" "}
        <span className="font-medium">full-stack web geliştirme</span> öğrendim.{" "}
        <span className="italic">Programlamadaki favori kısmım</span>, problem
        çözme yönüdür. Bir problemin çözümünü nihayet bulduğumda hissettiğim
        duygu beni <span className="underline">heyecanlandırıyor</span>. Temel
        teknoloji yığınım şunlardır:{" "}
        <span className="font-medium">React, Next.js, Node.js ve MongoDB</span>.
        Ayrıca TypeScript ve Prisma ile de tanıştım. Her zaman yeni teknolojiler
        öğrenmeye açığım. Şu anda bir{" "}
        <span className="font-medium">
          tam zamanlı yazılım geliştirici pozisyonu
        </span>{" "}
        arayışındayım.
      </p>

      <p>
        <span className="italic">Kodlamadığım zamanlarda</span>, video oyunları
        oynamaktan, filmler izlemekten ve köpeğimle oynamaktan keyif alıyorum.
        Aynı zamanda <span className="font-medium">yeni şeyler öğrenmeyi</span>{" "}
        seviyorum. Şu anda <span className="font-medium">tarih ve felsefe</span>{" "}
        konularında öğrenim görmekteyim. Ayrıca gitar çalmayı öğreniyorum.
      </p>
    </motion.section>
  );
};
