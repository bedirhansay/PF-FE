"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import style from "./about.module.scss";
import { Heading } from "../ui";
import { aboutAnimations, pAnim } from "./animations";
import { about } from "@/lib/constant/about";

export const AboutSection = () => {
  const [count, setCount] = useState(2);
  const { ref, view } = useSectionInView("About");

  const data = about.slice(0, count);

  return (
    <motion.section
      ref={ref}
      {...aboutAnimations.wrapperAnim}
      className={style["about-wrapper"]}
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
        className="bg-darkBlue mx-auto flex text-white  px-5 rounded"
      >
        Okumaya devam et
      </button>
    </motion.section>
  );
};
