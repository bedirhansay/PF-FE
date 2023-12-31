"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@hooks";
import { Heading } from "@components/ui";
import style from "./skills.module.scss";
import Image from "next/image";
import { fadeInAnimationVariants, skillsAnim } from "./animations";
import { SkillsDTO } from "@types";
import { callApi } from "@actions";
import { SkillCardSkeleton } from "@components";

export const Skills = () => {
  const { ref } = useSectionInView("Yetenekler");
  const [skills, setskills] = useState<SkillsDTO[] | undefined>();

  const skill = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const fetchskills = async () => {
      const { data } = await callApi({ method: "get", path: "skills" });
      setskills(data);
    };
    fetchskills();
  }, []);

  return (
    <section id="skills" ref={ref} className={style["section-wrapper"]}>
      <Heading title="Yeteneklerim" link="skills"></Heading>

      <ul className={style["ul-container"]}>
        {!skills
          ? skill.map((item, index) => (
              <SkillCardSkeleton key={"skleton" + index + "skill"} />
            ))
          : skills?.map((skill, index) => (
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
                  <Image
                    alt={skill.title}
                    src={skill.image || ""}
                    height={200}
                    width={200}
                  ></Image>
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
