import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import { BsPersonVcard } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import { FaNetworkWired } from "react-icons/fa";
export const adminLinks = [
  {
    title: "Anasayfa",
    href: "/",
    icon: React.createElement(AiFillHome),
  },
  {
    title: "Kategoriler",
    href: "/admin/categories",
    icon: React.createElement(FaNetworkWired),
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: React.createElement(IoDocumentText),
  },
  {
    title: "Hakkımda",
    href: "/admin/about",
    icon: React.createElement(BsPersonVcard),
  },
  {
    title: "Projeler",
    href: "/admin/projects",
    icon: React.createElement(GrProjects),
  },
  {
    title: "Yetenekler",
    href: "/admin/skills",
    icon: React.createElement(GiSkills),
  },
  {
    title: "Deneyim",
    href: "/admin/experience",
    icon: React.createElement(FaNetworkWired),
  },
];
