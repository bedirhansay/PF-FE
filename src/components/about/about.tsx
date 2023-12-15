"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSectionInView } from "@hooks";
import { Heading } from "@components/ui";
import { about } from "@constant";
import { pAnim } from "./animations";
import style from "./about.module.scss";

export const AboutSection = () => {
  const [count, setCount] = useState(2);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<{ p: string }[]>([]);
  const controls = useAnimation();

  const { ref } = useSectionInView("Hakkımda");

  const dataLength = about?.length;

  useEffect(() => {
    const data = about.slice(0, count);
    setData(data as any);

    controls.start({ opacity: 1, y: 0 });
  }, [count, open, controls]);

  const handleToggle = async () => {
    setOpen(!open);

    setCount((prev) => (open ? 2 : dataLength));
  };

  return (
    <motion.section className={style["about-wrapper"]} ref={ref} id="about">
      <Heading link="about" title="Hakkımda" />

      <motion.div className="mb-3">
        {data?.map((item, index) => (
          <motion.span
            dangerouslySetInnerHTML={{ __html: item.p }}
            key={index + "item"}
            {...pAnim({ delay: 0.1 * index, controls })}
          ></motion.span>
        ))}
      </motion.div>
      <div className={style["box-wrapper"]}>
        <button onClick={handleToggle} className={style["button"]}>
          {open ? "Daha az gör" : "Okumaya devam et"}
        </button>
      </div>
    </motion.section>
  );
};
