"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdMarkEmailUnread } from "react-icons/md";
import { BsArrowRight, BsLinkedin, BsDownload, BsGithub } from "react-icons/bs";
import { useSectionInView } from "@hooks";
import { ProfilePic } from "@public";
import { introAnimations } from "./animations";
import clsx from "clsx";
import style from "./intro.module.scss";

import NextImage from "../../../components/NextImage";

export const Intro = () => {
  const { ref } = useSectionInView("Anasayfa");

  return (
    <section ref={ref} id="home" className={style["section-wrapper"]}>
      <div className={style["image-wrapper"]}>
        <motion.div key={"motion-div"} {...introAnimations.imageAnim}>
          <NextImage
            alt="profile"
            width="200"
            height="200"
            sizes="150px"
            className="h-40 w-40 rounded-full"
            src={ProfilePic}
            priority={true}
            loading="eager"
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
          <BsGithub fontSize={24} />
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
        <span>Kodun iki yüzü, bir geliştiricinin elinde birleşiyor!</span>
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
          Benimle iletişime geç
          <BsArrowRight
            className={clsx(style["icon"], "group-hover:translate-x-4")}
          />
        </Link>

        <a className={clsx(style["download"], "group")} href="/CV.pdf" download>
          CV
          <BsDownload
            className={clsx(style["icon"], "group-hover:translate-y-2")}
          />
        </a>
      </motion.div>
    </section>
  );
};
