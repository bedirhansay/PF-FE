"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import style from "./footer.module.scss";
import { NavLinks } from "@/lib/constant";
import { useActiveSection } from "@/lib/hooks";
export const Footer = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();
  return (
    <footer className={style["footer-wrapper"]}>
      <div className={style["sub"]}>
        <div className={style["link"]}>
          <a href="/">
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            /> */}
            <span>BS</span>
          </a>
          <ul className={style["link-container"]}>
            {NavLinks.map((link, i) => (
              <li
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
                    <motion.span layoutId="activeSection"></motion.span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className={style["hr"]} />
        <span className={style["copyright"]}>
          © 2023 <a>Bedirhan Say</a>. Tüm Hakları Saklıdır.
        </span>
      </div>
    </footer>
  );
};
