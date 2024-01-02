"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import style from "./skills.module.scss";
import Image from "next/image";
import { fadeInAnimationVariants, skillsAnim } from "./animations";
import { useSectionInView } from "@/lib/hooks";
import { SkillsDTO } from "@/lib/types";
import { Heading } from "@/components/ui";
import { callApi } from "@/lib/actions";
import { SkillCardSkeleton } from "../../../components/SkillCardSekeleton";

export default function Skills() {
  console.log("girdi");
  const { ref } = useSectionInView("Yetenekler");
  const [skills, setskills] = useState<SkillsDTO[] | undefined>();

  const skill = [1, 2, 3, 4, 5, 6];

  (async function getSkills() {
    const { data } = await callApi({ method: "get", path: "skills" });
    setskills(data);
    console.log(data);
  })();

  return (
    <section id="skills" ref={ref} className={style["section-wrapper"]}>
      <Heading title="Yeteneklerim" link="skills"></Heading>

      <ul className={style["ul-container"]}>
        {skills
          ? skills?.map((skill, index) => (
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
            ))
          : skill.map((item, index) => (
              <SkillCardSkeleton key={"skleton" + index + "skill"} />
            ))}
      </ul>
    </section>
  );
}
