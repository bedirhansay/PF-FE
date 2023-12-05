"use client";

import { motion } from "framer-motion";
import React from "react";
import { HeaderAnimations } from "./animation";
import { NavLinks } from "@/lib/data";
import style from "./header.module.scss";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="z-[999] relative">
      <motion.div
        className={style["header-wrapper"]}
        {...HeaderAnimations.headerAnimation}
      />

      <nav className={style["nav-wrapper"]}>
        <ul>
          {NavLinks.map((link, i) => (
            <motion.li {...HeaderAnimations.liAnimation} key={"navLink" + i}>
              <Link href={link.hash}>{link.name}</Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
