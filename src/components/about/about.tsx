"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks";
import style from "./about.module.scss";
import { Heading } from "../ui";
import { aboutAnimations, pAnim } from "./animations";

export const AboutSection = () => {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      {...aboutAnimations.wrapperAnim}
      className={style["about-wrapper"]}
      id="about"
    >
      <Heading link="about" title="Hakkımda" />
      <p {...pAnim({ delay: 4000 })} className="mb-3">
        Moleküler biyoloji ve genetik bölümü mezunuyum. Bölümümün kapsamlarından
        biri olan biyoinformatik -biyolojik verileri analiz etmek, yorumlamak ve
        işlemek için bilgisayar bilimleri ve veri analizi tekniklerinin
        kullanıldığı bir multidisipliner alandır- ve benim yazılım geliştirme
        süreçlerini anlama ve ilgi duymama neden olan çıkış noktamdır. Bu alana
        ilgim sayesinde yazılım dünyasına adım attım. İlk olarak R ve Python
        gibi programlama dilleri ile tanıştım, ardından istatistik ve makine
        öğrenmesi modelleri üzerinde çalışmaya başladım.
        <span className="font-medium">
          Web programlamaya olan ilgim Python ile kullanılan web frameworkleri
          olan Django ve Flask araçlarını hakkında bilgi edinmemi sağladı.
          Kendini geliştirmek isteyen herkes gibi, aynı konsepte dayanan farklı
          teknolojileri öğrenmek gerektiğini biliyordum. Bu nedenle JavaScript'i
          öğrendim ve ardından JavaScript kütüphanesi olarak kabul edilen React
          JS, Next JS ve Refine JS teknolojilerine yöneldim. Çünkü farklı
          teknolojileri öğrenildiğinde bilinen teknoloji, zorunluluk değil
          seçenek haline gelir.
        </span>{" "}
        <span className="italic">Programlamadaki favori kısmım</span>, problem
        Backend alanında, takım arkadaşlarımı daha iyi anlamak ve iletişimi
        güçlendirmek amacıyla Node.js'i ve işleyişini öğrenmeye karar verdim.
        Bilmediğim, ancak konseptlerine aşina olmak istediğim yazılım
        araçlarıyla ilgili boilerplate'ler hazırlayarak genel süreçleri anlamaya
        çalıştım. Ancak tahmin edilebileceği üzere biraz terminoloji, V8
        motorları ve sunucu taraflı işlemleride öğrenme sürecimde farketmiş
        bulundum.
        <span className="font-medium">
          Kişisel olarak, ilgi ve tutku olmadan bir kişinin yazılım alanında
          başarılı olabileceğine inanmıyorum. Know How 'a olan ilgim sayesinde
          Linux işletim sistemini öğrendim ve bu ilgi sonucunda DevOps alanına
          da yöneldim. Bilgi sahibi olduğum fakat proaktif görev alamayacağım
          alanları ise yetkinlik alanlarıma eklemedim. Öğrendiğim bilgiler,
          diğer sistemlere ilgi duymamı da tetikledi
        </span>
      </p>
    </motion.section>
  );
};
