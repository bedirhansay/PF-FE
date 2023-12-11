"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { introAnimations } from "./animations";
import clsx from "clsx";
import profilePic from "../../../public/profile-pic.png";
import { MdMarkEmailUnread } from "react-icons/md";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import style from "./intro.module.scss";
import { useSectionInView } from "@/lib/hooks";

export const Intro = () => {
  const { ref } = useSectionInView("Home");

  return (
    <section ref={ref} id="home" className={style["section-wrapper"]}>
      <div className={style["image-wrapper"]}>
        <motion.div {...introAnimations.imageAnim}>
          <Image
            src={profilePic}
            alt="Ricardo portrait"
            width="292"
            height="292"
            quality="95"
            priority={true}
          />
        </motion.div>

        <motion.span {...introAnimations.handEmoAnim}>👋</motion.span>
      </div>

      <motion.div
        {...introAnimations.titleAnim}
        className={style["socialIcons"]}
      >
        <a
          className={style["social"]}
          href="https://www.linkedin.com/in/bedirhansay/"
          target="_blank"
        >
          <BsLinkedin fontSize={24} />
        </a>

        <a
          className={style["social"]}
          href="https://github.com/bedirhansay"
          target="_blank"
        >
          <FaGithubSquare fontSize={24} />
        </a>
        <a
          className={style["social"]}
          href="mailto:bedirhan.sayy@gmail.com"
          target="_blank"
        >
          <MdMarkEmailUnread fontSize={28} />
        </a>
      </motion.div>

      <motion.h1
        className={style["title-wrapper"]}
        {...introAnimations.titleAnim}
      >
        <span>Merhaba, ben Bedirhan,</span>
        <span>3 yıldır Frontend geliştirici olarak </span>
        <span>mobil ve web uygulamalarının </span>
        <span>geliştirilme sürecini keyif ile sürdürüyorum. </span>
        <span>Odaklandığım teknolojiler arasında </span>
        <span>React (Next.js) ve React Native yer almaktadır.</span>
      </motion.h1>

      <motion.div
        className={style["text-wrapper"]}
        {...introAnimations.textWraAnim}
      >
        <Link
          href="#contact"
          className={clsx(style["contact"], "group")}
          onClick={() => {}}
        >
          Contact me here
          <BsArrowRight
            className={clsx(style["icon"], "group-hover:translate-x-4")}
          />
        </Link>

        <a className={clsx(style["download"], "group")} href="/CV.pdf" download>
          Download CV{" "}
          <HiDownload
            className={clsx(style["icon"], "group-hover:translate-y-2")}
          />
        </a>
      </motion.div>
    </section>
  );
};
