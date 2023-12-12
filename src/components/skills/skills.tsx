"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { Heading } from "../ui";
import style from "./skills.module.scss";
import { SkillsDatas } from "@/lib/constant/skills";
import Image from "next/image";
import { fadeInAnimationVariants, skillsAnim } from "./animations";

export const Skills = () => {
  const { ref } = useSectionInView("Yetenekler");

  return (
    <section id="skills" ref={ref} className={style["section-wrapper"]}>
      <Heading title="Yeteneklerim" link="skills"></Heading>
      <ul className={style["ul-container"]}>
        {SkillsDatas.map((skill, index) => (
          <motion.li
            key={index + "skills"}
            variants={fadeInAnimationVariants(index)}
            {...skillsAnim(index)}
          >
            <div
              className={style["card"]}
              style={{ backgroundColor: skill.bgColor }}
            >
              <h2
                style={{
                  backgroundColor: skill.itemColor,
                }}
              >
                {skill.title}
              </h2>
              <Image alt={skill.title} src={skill.image} width={200}></Image>
              <ul>
                {skill.items.map((item, itemIndex) => (
                  <li
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
