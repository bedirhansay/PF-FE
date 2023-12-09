"use client";

import React, { Fragment } from "react";
import { useActiveSection, useSectionInView } from "@/lib/hooks";
import { experiencesData } from "@/lib/constant/data";
import style from "./experience.module.scss";
import { Heading } from "../ui";
import { motion } from "framer-motion";

export const Experience = () => {
  const { ref, view } = useSectionInView("Experience", 0.9);

  const { activeSection } = useActiveSection();

  const theme = "light";

  return (
    <section id="experience" ref={ref} className={style["section-wrapper"]}>
      {view && (
        <Fragment>
          <Heading title="Deneyim" link="experience"></Heading>
          {experiencesData.map((item, index) => (
            <motion.div
              animate={{
                opacity: [0, 1],
              }}
              transition={{
                delay: index,
              }}
              viewport={{
                once: true,
              }}
              className={style["box-wrapper"]}
              key={index + "vertical"}
            >
              <motion.span>{item.icon}</motion.span>
              <motion.div className={style["text-wrapper"]}>
                <h3>{item.title} </h3>
                <p>{item.location}</p>
                <p>{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </Fragment>
      )}
    </section>
  );
};
