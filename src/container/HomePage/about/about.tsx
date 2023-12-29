"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSectionInView } from "@hooks";
import { Heading } from "@components/ui";
import { about } from "@constant";
import { pAnim } from "./animations";
import style from "./about.module.scss";
import { callApi } from "@actions";
import { AboutDTO } from "../../../lib/types/types";
import clsx from "clsx";

export const AboutSection = () => {
  const [count, setCount] = useState(940); // Adjust the initial character count as needed
  const [open, setOpen] = useState(false);
  const controls = useAnimation();
  const { ref } = useSectionInView("Hakkımda");
  const [about, setAbout] = useState<AboutDTO[]>();

  useEffect(() => {
    const fetchabout = async () => {
      const { data } = await callApi({ method: "get", path: "about" });
      setAbout(data);
    };
    fetchabout();
  }, []);

  const handleToggle = () => {
    setOpen(!open);
    // You can adjust the character count based on your preference
    setCount((prev) => (open ? 900 : Infinity)); // Set to Infinity to show the full text
  };

  return (
    <motion.section className={style["about-wrapper"]} ref={ref} id="about">
      <Heading link="about" title="Hakkımda" />

      <motion.div className="mb-3">
        {about?.map((item, index) => (
          <motion.span
            dangerouslySetInnerHTML={{ __html: item?.content.slice(0, count) }}
            key={index + "item"}
            {...pAnim({ delay: 0.1 * index, controls })}
          />
        ))}
      </motion.div>
      <div className={clsx(style["box-wrapper"])}>
        <button onClick={handleToggle} className={style["button"]}>
          {open ? "Daha az gör" : "Okumaya devam et"}
        </button>
      </div>
    </motion.section>
  );
};
