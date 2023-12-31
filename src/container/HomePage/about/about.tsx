"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSectionInView } from "@hooks";
import { Heading } from "@components/ui";
import { pAnim } from "./animations";
import style from "./about.module.scss";
import { callApi } from "@actions";
import { AboutDTO } from "@types";
import clsx from "clsx";
import { AboutSkeletons } from "@components";

export const AboutSection = () => {
  const [count, setCount] = useState(965); 
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
    if (count == Infinity) {
      window.location.href = "/#blog";
    }
    setOpen(!open);
    setCount((prev) => (open ? 940 : Infinity));
  };
  let a = "";

  return (
    <motion.section className={style["about-wrapper"]} ref={ref} id="about">
      <Heading link="about" title="Hakkımda" />

      <motion.div className="mb-3">
        {about ? (
          about?.map((item, index) => (
            <motion.span
              dangerouslySetInnerHTML={{
                __html: item?.content.slice(0, count),
              }}
              key={index + "item"}
              {...pAnim({ delay: 0.1 * index, controls })}
            />
          ))
        ) : (
          <AboutSkeletons />
        )}
      </motion.div>
      <div className={clsx(style["box-wrapper"])}>
        <button onClick={handleToggle} className={style["button"]}>
          {open ? "Daha az gör" : "Okumaya devam et"}
        </button>
      </div>
    </motion.section>
  );
};
