"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import style from "./header.module.scss";
import { HeaderAnimations } from "./animation";
import { FaUser } from "react-icons/fa";
import { useActiveSection } from "@/lib/hooks";
import { NavLinks } from "@/lib/constant";
import { IoMdMoon } from "react-icons/io";
import { MdWbSunny } from "react-icons/md";

import { useTheme } from "next-themes";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();

  const { theme, setTheme } = useTheme();

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
                <Link prefetch={false} href={link.hash}>
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
            <motion.a {...HeaderAnimations.liAnimation} href="/admin/blog">
              <FaUser />
            </motion.a>
            <button
              className="border rounded-full p-1 hover:bg-background"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <MdWbSunny /> : <IoMdMoon />}
            </button>
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
                prefetch={false}
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
