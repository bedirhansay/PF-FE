"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { pAnim } from "./animations";
import style from "./about.module.scss";
import clsx from "clsx";
import { useSectionInView } from "@/lib/hooks";
import { Heading } from "@/components/ui";
import { AboutDTO } from "@/lib/types";
import { AboutSkeletons } from "../../../components/Skeletons/AboutSkeleton";
import { useFetch } from "@/lib/hooks/useFetch";

export default function AboutSection() {
  const [count, setCount] = useState(850);
  const [open, setOpen] = useState(false);
  const controls = useAnimation();
  const { ref } = useSectionInView("Hakkımda");

  const handleToggle = () => {
    if (count == Infinity) {
      window.location.href = "/#about";
    }
    setOpen(!open);
    setCount((prev) => (open ? 850 : Infinity));
  };

  const { data, loading }: { data: AboutDTO[] | null; loading: boolean } =
    useFetch({
      method: "get",
      path: "about",
    });

  return (
    <motion.section className={style["about-wrapper"]} ref={ref} id="about">
      <Heading link="about" title="Hakkımda" />

      <motion.div className="mb-3 dark:bg-gray-300 p-2">
        {!loading ? (
          data?.map((item, index) => (
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
}
