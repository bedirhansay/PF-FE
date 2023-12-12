"use client";

import React, { Fragment } from "react";
import { useActiveSection, useSectionInView } from "@/lib/hooks";
import style from "./experience.module.scss";
import { Heading } from "../ui";
import { motion } from "framer-motion";
import { experiencesData } from "@/lib/constant/Experience";
import { experinceAnimations } from "./animations";

export const Experience = () => {
  const { ref, view } = useSectionInView("Experience", 0.9);

  const { activeSection } = useActiveSection();

  return (
    <section id="experience" ref={ref} className={style["section-wrapper"]}>
      <Heading title="Deneyim" link="experience"></Heading>
      {experiencesData.map((item, index) => (
        <motion.div
          {...experinceAnimations(index)}
          className={style["box-wrapper"]}
          key={index + "vertical"}
        >
          <motion.div className={style["text-wrapper"]}>
            <h3>{item.title} </h3>
            <div className={style["blog-detail"]}>
              <div className={style["sub"]}>
                <p className={style["p-text"]}>{item.location}</p>
              </div>
              <p className={style["p-text"]}>
                {item.date} / {item.position}{" "}
              </p>
            </div>

            <p>{item.description}</p>
            <p className="flex gap-3 flex-wrap">
              {item.skills.map((skill, index) => (
                <span key={index + "span"}>{skill}</span>
              ))}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
};
