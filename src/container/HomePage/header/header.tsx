"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { SunSVG, MoonSVG } from "@SVG";
import { MobileLink, NavLinks } from "@Constant";
import { Button } from "@UIComponents";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import style from "./header.module.scss";
import { HeaderAnimations } from "./animation";
import { useActiveSection } from "@/lib/Hooks";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(true);

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
            <motion.a
              className={style["admin"]}
              {...HeaderAnimations.liAnimation}
              href="/admin/blog"
            >
              <FaUser />
            </motion.a>
            <Button
              className={style["theme"]}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <MoonSVG  /> : <SunSVG />}
            </Button>
          </ul>
        </nav>
      </div>

      <motion.nav
        variants={HeaderAnimations.variant}
        data-active={isOpen}
        className={style["mobile-header"]}
        animate={isOpen ? "open" : "closed"}
      >
        {MobileLink.map((link, i) => (
          <motion.li
            {...HeaderAnimations.liAnimation}
            key={i + "mobile"}
            variants={HeaderAnimations.fadeInAnimationVariants}
            custom={i}
            onClick={() => {
              setActiveSection(link.name);
              setTimeOfLastClick(Date.now());
            }}
          >
            <Link
              prefetch={false}
              className={style["active"]}
              href={link.hash}
              data-anasayfa={link.name === "Anasayfa"}
              data-active={link.name === activeSection}
            >
              <div className={style["text-wrapper"]}>
                <i>
                  <link.icon />
                </i>

                <span>{link.name}</span>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.nav>
    </header>
  );
};
