"use client";

import { motion } from "framer-motion";
import React from "react";
import { HeaderAnimations } from "./animation";
import { NavLinks } from "@/lib/data";
import style from "./header.module.scss";
import Link from "next/link";
import { useActiveSection } from "@/hooks";

export const Header = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();

  return (
    <header className="z-[999] relative">
      <motion.div
        className={style["header-wrapper"]}
        {...HeaderAnimations.headerAnimation}
      />

      <nav className={style["nav-wrapper"]}>
        <ul>
          {NavLinks.map((link, i) => (
            <motion.li
              {...HeaderAnimations.liAnimation}
              key={"navLink" + link.hash}
              data-active={link.name === activeSection}
              onClick={() => {
                setActiveSection(link.name);
                setTimeOfLastClick(Date.now());
              }}
            >
              <Link href={link.hash}>
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-300 absolute inset-0 rounded-2xl -z-10 "
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 40,
                      restDelta: 2,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
