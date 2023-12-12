import progLang from "../../../public/skills/progLAng.png";
import tech from "../../../public/skills/tech.png";
import css from "../../../public/skills/css.png";
import lib from "../../../public/skills/lib.png";
import database from "../../../public/skills/database.png";
import vcs from "../../../public/skills/vcs.png";

export const SkillsDatas = [
  {
    title: "Programlama Dilleri",
    items: ["JavaScript", "Python", "R"],
    bgColor: "#FFF07D",
    image: progLang,

    itemColor: "#E7C100",
  },
  {
    title: "Teknolojiler",
    items: ["React JS", "Next JS", "Django", "Node JS", "Refine JS"],
    bgColor: "#AED9E0",
    image: tech,
    itemColor: "#78a2a9",
  },
  {
    title: "CSS",
    items: ["SASS", "LESS", "Tailwind", "Bootstrap"],
    bgColor: "#C0FFA0",
    image: css,
    itemColor: "#6AC33E",
  },
  {
    title: "Veritabanları",
    items: ["MongoDB", "PostgreSQL"],
    bgColor: "#D3A0A2",
    image: database,
    itemColor: "#9b6c6e",
  },
  {
    title: "Kütüphaneler",
    items: ["Socket.io", "Redux", "Gulp", "Webpack", "RTK"],
    bgColor: "#B9A0B1",
    image: lib,
    itemColor: "#846c7c",
  },
  {
    title: "VCS / Görev Yönetimi",
    items: ["Git", "Bitbucket", "Jira", "Agile", "Scrum"],
    bgColor: "#6D92A1",
    image: vcs,
    itemColor: "#374955",
  },
];
