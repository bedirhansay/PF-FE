import { Urbanist } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./(root)/globals.scss";
const inter = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bedirhansaycom.vercel.app"),
  title: "Bedirhan Say - Freelance Hizmetler ve Portfolyo",
  description:
    "Ben Bedirhan Say. Kendi portföyümde sunduğum hizmetler ve yazdığım blog yazıları ile ilgili daha fazla bilgi alın.",
  keywords: [
    "Bedirhan Say",
    "Freelance Web Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "SCSS",
    "Git",
    "Husky",
    "Commitlint",
    "Lint Stage",
    "Prettier",
    "Zustand",
    "Refine JS",
    "Restful API",
    "Context Provider",
    "Payment Gateway API",
    "UI/UX Designer",
    "Monolitik Mimariler",
    "SEO Optimization",
    "Web Performance",
    "UI/UX Design",
    "Full-stack Developer",
    "React Query",
    "Redux Toolkit",
    "Redux Saga",
    "Firebase",
    "Next Auth",
    "Framer Motion",
    "Freelance Portfolio",
    "Blog Writer",
    "Web Development Services",
    "E-commerce Solutions",
    "Digital Transformation",
    "Tech Enthusiast",
  ],

  verification: {
    google: "google-site-verification=",
  },

  // applicationName: "Bedirhan Say - Portfolyo",
  // authors: [{ name: "Bedirhan Say" }],
  // alternates: {
  //   canonical: "https://bedirhansaycom.vercel.app",
  // },

  // openGraph: {
  //   type: "website",
  //   url: "https://bedirhansaycom.vercel.app",
  //   title: "Bedirhan Say - Freelance Hizmetler ve Portfolyo",
  //   description:
  //     "Ben Bedirhan Say. Kendi portföyümde sunduğum hizmetler ve yazdığım blog yazıları ile ilgili daha fazla bilgi alın.",
  //   siteName: "Bedirhan Say",
  //   images: [
  //     {
  //       url: "../../public/favicon-300.png",
  //       alt: "Bedirhan Say - Freelance Hizmetler ve Portfolyo",
  //     },
  //   ],
  // },

  // twitter: {
  //   card: "summary_large_image",
  //   site: "@bedirhansay",
  //   creator: "@bedirhansay",
  //   title: "Bedirhan Say - Freelance Hizmetler ve Portfolyo",
  //   description:
  //     "Ben Bedirhan Say. Kendi portföyümde sunduğum hizmetler ve yazdığım blog yazıları ile ilgili daha fazla bilgi alın.",
  //   images: [
  //     {
  //       url: "../../public/favicon-300.png",
  //       alt: "Bedirhan Say - Freelance Hizmetler ve Portfolyo",
  //     },
  //   ],
  // },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#F3F4F6] `}>
        {children}
      </body>
    </html>
  );
}
