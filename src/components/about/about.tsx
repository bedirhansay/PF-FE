"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { Heading } from "../ui";
import { aboutAnimations, pAnim } from "./animations";
import { about } from "@/lib/constant/about";
import style from "./about.module.scss";

export const AboutSection = () => {
  const [count, setCount] = useState(2);
  const { ref } = useSectionInView("About");

  const data = about.slice(0, count);

  return (
    <motion.section
      className={style["about-wrapper"]}
      {...aboutAnimations.wrapperAnim}
      ref={ref}
      id="about"
    >
      <Heading link="about" title="Hakkımda" />

      <motion.div className="mb-3">
        {data.map((item, index) => (
          <motion.span key={index + "item"} {...pAnim({ delay: 0.1 * index })}>
            {item.p}
          </motion.span>
        ))}
      </motion.div>

      <button
        onClick={() => setCount((prev) => prev + 1)}
        className={style["button"]}
      >
        Okumaya devam et
      </button>
    </motion.section>
  );
};
