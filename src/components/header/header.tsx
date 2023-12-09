"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { HeaderAnimations } from "./animation";
import Link from "next/link";
import { useActiveSection } from "@/lib/hooks";
import style from "./header.module.scss";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLinks } from "@/lib/constant/navLinks";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();

  return (
    <header className={style["header-wrapper"]}>
      <div className={style["web-wrapper"]}>
        <motion.div
          className={style["web"]}
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
                      className={style["bg-mask"]}
                      layoutId="activeSection"
                      transition={HeaderAnimations.maskAnim}
                    ></motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>

      <motion.button
        variants={HeaderAnimations.variant}
        animate={isOpen ? "open" : "closed"}
        className={style["button"]}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {isOpen ? <IoClose /> : <RxHamburgerMenu />}
      </motion.button>

      {isOpen && (
        <motion.nav
          variants={HeaderAnimations.variant}
          data-active={isOpen}
          className={style["mobile-header"]}
          animate={isOpen ? "open" : "closed"}
        >
          {NavLinks.map((link, i) => (
            <motion.li
              {...HeaderAnimations.liAnimation}
              key={i + "mobile"}
              variants={HeaderAnimations.fadeInAnimationVariants}
              custom={i}
              onClick={() => {
                setIsOpen(false);
                setActiveSection(link.name);
                setTimeOfLastClick(Date.now());
              }}
            >
              <Link
                className={style["active"]}
                href={link.hash}
                data-active={link.name === activeSection}
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </motion.nav>
      )}
    </header>
  );
};
