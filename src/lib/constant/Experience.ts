import React from "react";
import { FaReact } from "react-icons/fa";

export const experiencesData = [
  {
    title: "Frontend Web Developer",
    location: "İstanbul / Türkiye",
    position: "Uzaktan",
    description:
      "Şu anda serbest çalışan bir full-stack geliştiriciyim. Yığınım arasında React, Next.js, TypeScript, Tailwind, Prisma ve MongoDB bulunmaktadır. [Proje Adı] gibi birkaç projeyi başarıyla tamamladım, burada [belirli özellikler veya teknolojiler] uyguladım. Müşterilerle yakın işbirliği yaparak gereksinimleri anladım ve [olumlu sonuçlarla sonuçlanan] çözümler sundum. Bu süre zarfında [ilgili sertifika] sertifikasını aldım, sürekli öğrenmeye olan bağlılığımı gösteriyor. Tam zamanlı fırsatlara açığım. Portföyümü incelemek için [portföy bağlantısı].",

    icon: React.createElement(FaReact),
    date: "2021 - 2023",
    skills: [
      "React.js",
      "Next.js",
      "Refine.js",
      "TS",
      "Tailwind",
      "SCSS",
      "Bootstap",
      "Husky",
      "Commitlint",
      "Lint Stage",
      "Prettier",
      "Git",
      "Bitbucket",
      "Linear",
      "Jira",
      "RTQ",
      "Firabase",
      "Zustand",
      "Context Provider",
      "Redux Toolkit",
      "Redux Saga",
      "Firabase",
      "Next Auth",
      "Framer Motion",
      "Restfull Api",
    ],

    responsibilities: [
      "Müşterilerle yakın işbirliği yaparak projelerin gereksinimlerini anladım ve teknik çözümler önerdim.",
      "React, Next.js, Vite, TypeScript, Tailwind gibi teknolojileri kullanarak CitioApp, Losbutik ve benzeri projeleri başarıyla tamamladım.",
      "Proje süreçlerinde, kullanıcı dostu ve etkileşimli kullanıcı arayüzleri geliştirdim, UI/UX tasarım prensiplerine uygun çözümler ürettim.",
      "Monolitik mimariler oluşturarak, fonksiyonel programlamaya uygun SOLID prensiplerini takip eden ve event-driven design metodolojisini içeren yapılar geliştirdim.",
      "Proje geliştirme sürecinde, web performansını değerlendirmek amacıyla First Contentful Paint (FCP), Time to Interactive (TTI), Total Blocking Time (TBT), Cumulative Layout Shift (CLS) ve First Input Delay (FID) gibi önemli metrikleri ölçtüm. Bu metrikler üzerinden yapı ve performans iyileştirmeleri gerçekleştirirken aynı zamanda SEO odaklı semantik olarak kodlamaları geliştirerek projenin trafiğini artırdım.",
      "Gelişmiş web uygulamaları oluşturmak için state-of-the-art teknolojileri takip ettim ve uyguladım. Buna yönelik olarak bazı projelerde React Query, Zustand  ve Redux Toolkit gibi kütüphanelerden faydalandım.",
      "Ekip içindeki diğer geliştiricilerle işbirliği yaparak, projelerin hızlı ve verimli bir şekilde tamamlanmasını",
      "Sürekli öğrenmeye ve kendimi geliştirmeye büyük bir bağlılıkla, sektördeki yeni gelişmeleri takip ettim ve bu bilgileri projelerimde uyguladım.",
    ],
  },
  {
    title: "Supervisor / Data Scientist",
    location: "İstanbul / Türkiye",
    position: "İş Yerinde",
    date: "2021 - 2023",
    skills: ["Python", "Makine Öğrenmesi", "Office Uygulamları", "BioRad"],

    responsibilities: [
      "Firma içindeki projelerin Moleküler Biyoloji ve Genetik alanlarında aktif rol alarak, laboratuvar çalışmalarını yönettim ve koordine ettim.",
      "Biyoistatistik, veri analizi ve makine öğrenimi tekniklerini kullanarak, biyolojik örneklerin analizini gerçekleştirdim ve bu analizlerden elde edilen verileri değerlendirdim.",
      "Deney tasarımı süreçlerine liderlik ederek, projelerin bilimsel standartlara uygunluğunu sağladım ve sonuçları raporladım.",
      "Firmadaki personelin mesleki gelişimine rehberlik ettim ve yeni çalışanları eğittim.",
      "Mevcut laboratuvarın verimliliğini artırmak amacıyla, laboratuvar prosedürlerini iyileştirdim ve teknolojik yenilikleri takip ederek laboratuvar altyapısını güncelledim.",
      "Veri güvenliği ve etik konularında firma içinde bilinç oluşturarak, projelerin ve laboratuvar faaliyetlerinin yasal ve etik standartlara uygunluğunu sağladım.",
      "Projelerin süreçlerini düzenli olarak değerlendirerek, firma yönetimine stratejik önerilerde bulundum ve iyileştirmeler sağladım.",
      "Sürekli olarak sektörel gelişmeleri takip ederek, laboratuvar ve projelerde yeni teknolojileri ve yöntemleri uygulayarak firmayı rekabet avantajına kavuşturdum.",
      "Supervizyon altında çalışan ekip arkadaşlarına liderlik ederek, ekip uyumunu ve işbirliğini artırdım.",
      "Biyoinformatik, veri madenciliği ve büyük veri analizi konularında uzmanlık sağlayarak, projelerin bilgi işlem ve veri analizi gereksinimlerini karşıladım.",
    ],
  },
] as const;
