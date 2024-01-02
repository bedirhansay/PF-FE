"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { pAnim } from "./animations";
import style from "./about.module.scss";
import clsx from "clsx";
import { useSectionInView } from "@/lib/hooks";
import { callApi } from "@/lib/actions";
import { Heading } from "@/components/ui";
import { AboutDTO } from "@/lib/types";
import { AboutSkeletons } from "@/components/skeletons/AboutSkeleton";

export const AboutSection = () => {
  const [count, setCount] = useState(850);
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
      window.location.href = "/#about";
    }
    setOpen(!open);
    setCount((prev) => (open ? 850 : Infinity));
  };

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
