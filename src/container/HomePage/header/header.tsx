"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useActiveSection } from "@hooks";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLinks } from "@constant";
import style from "./header.module.scss";
import { HeaderAnimations } from "./animation";

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
                <a href={link.hash}>
                  {link.name}
                  {link.name === activeSection && (
                    <motion.span
                      className={style["bg-mask"]}
                      layoutId="activeSection"
                      transition={HeaderAnimations.maskAnim}
                    ></motion.span>
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
      {/* <div className="fixed top-5 right-5">
        <button className="relative group">
          <div className="relative z-20 flex items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-darkBlue ring-0 ring-gray-300 hover:ring-8 group-focus:ring-8 ring-opacity-30 duration-200 shadow-md">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center">
              <div className="bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-right delay-75 group-focus:-translate-y-[1px]"></div>
              <div className="bg-white h-[1px] rounded"></div>
              <div className="m-0 bg-white h-[2px] w-1/2 rounded self-end transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-left delay-75 group-focus:translate-y-[1px]"></div>
            </div>
          </div>

          <div className="absolute bg-white w-0 h-0 overflow-hidden rounded-md right-6 top-5 transition-all group-focus:h-fit group-focus:w-40 delay-150 duration-300 shadow-xl ">
            <ul className="divide-y flex flex-col justify-center  text-left text-sm text-sky-700">
              {NavLinks.map((link, i) => (
                <motion.li
                  className="p-4 hover:bg-gray-300"
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
            </ul>
          </div>
        </button>
      </div> */}

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
