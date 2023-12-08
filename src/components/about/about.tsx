"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import style from "./about.module.scss";
import { Heading } from "../ui";
import { aboutAnimations, pAnim } from "./animations";
import { about } from "@/lib/constant/about";

export const AboutSection = () => {
  const { ref, view } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      {...aboutAnimations.wrapperAnim}
      className={style["about-wrapper"]}
      id="about"
    >
      <Heading link="about" title="Hakkımda" />
      {view && (
        <motion.div className="mb-3">
          {about.map((item, index) => (
            <motion.span
              key={index + "item"}
              {...pAnim({ delay: 0.5 * index })}
            >
              {item.p}
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};
