"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { Heading } from "../ui";
import style from "./skills.module.scss";
import { SkillsDatas } from "@/lib/constant/skills";
import Image from "next/image";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};
export const Skills = () => {
  const { ref } = useSectionInView("Skills");

  return (
    <section id="skills" ref={ref} className={style["section-wrapper"]}>
      <Heading title="Yeteneklerim" link="skills"></Heading>
      <ul className={style["ul-container"]}>
        {SkillsDatas.map((skill, index) => (
          <motion.li
            key={index + "skills"}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            <div
              className={style["card"]}
              style={{ backgroundColor: skill.bgColor }}
            >
              <h2
                className="text-white font-semibold text-xl py-2 mx-8 rounded-md"
                style={{
                  backgroundColor: skill.itemColor,
                }}
              >
                {skill.title}
              </h2>
              <Image
                className="mx-auto py-8"
                alt=""
                src={skill.image}
                width={200}
              ></Image>
              <ul>
                {skill.items.map((item, itemIndex) => (
                  <li
                    className="text-white px-4 !rounded-md py-1"
                    key={itemIndex + "item"}
                    style={{ backgroundColor: skill.itemColor }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
