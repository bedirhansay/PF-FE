"use client";

import { motion } from "framer-motion";
import style from "./skills.module.scss";
import Image from "next/image";
import { fadeInAnimationVariants, skillsAnim } from "./animations";
import { useSectionInView } from "@/lib/hooks";
import { SkillsDTO } from "@/lib/types";
import { Heading } from "@/components/ui";
import { SkillCardSkeleton } from "../../../components/Skeletons/SkillCardSekeleton";
import { useFetch } from "@/lib/hooks/useFetch";

export default function Skills() {
  const { ref } = useSectionInView("Yetenekler");

  const { data, loading }: { data: SkillsDTO[] | null; loading: boolean } =
    useFetch({
      method: "get",
      path: "skills",
    });

  return (
    <section id="skills" ref={ref} className={style["section-wrapper"]}>
      <Heading title="Yeteneklerim" link="skills"></Heading>

      <ul className={style["ul-container"]}>
        {!loading
          ? data?.map((skill, index) => (
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
          : Array(3)
              .fill(0)
              .map((item, index) => (
                <SkillCardSkeleton key={"skleton" + index + "skill"} />
              ))}
      </ul>
    </section>
  );
}
