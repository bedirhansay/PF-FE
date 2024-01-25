import { HomeSVG, BookSVG, MailSVG, SkillsSVG, ProjectsSVG } from "@/lib/SVG";

export const NavLinks = [
  {
    name: "Anasayfa",
    hash: "#home",
    icon: HomeSVG,
  },
  {
    name: "Blog",
    hash: "#blog",
    icon: BookSVG,
  },
  {
    name: "Hakkımda",
    hash: "#about",
    icon: BookSVG,
  },
  {
    name: "Projeler",
    hash: "#projects",
    icon: BookSVG,
  },
  {
    name: "Yetenekler",
    hash: "#skills",
    icon: BookSVG,
  },
  {
    name: "Deneyim",
    hash: "#experience",
    icon: BookSVG,
  },
  {
    name: "İletişim",
    hash: "#contact",
    icon: MailSVG,
  },
] as const;

export const MobileLink = [
  {
    name: "Yetenekler",
    hash: "#skills",
    icon: SkillsSVG,
  },
  {
    name: "Blog",
    hash: "#blog",
    icon: BookSVG,
  },
  {
    name: "Anasayfa",
    hash: "#home",
    icon: HomeSVG,
  },

  {
    name: "Projeler",
    hash: "#projects",
    icon: ProjectsSVG,
  },

  {
    name: "İletişim",
    hash: "#contact",
    icon: MailSVG,
  },
] as const;
