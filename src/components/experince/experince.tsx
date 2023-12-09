"use client";

import React, { Fragment } from "react";
import { useActiveSection, useSectionInView } from "@/lib/hooks";
import style from "./experience.module.scss";
import { Heading } from "../ui";
import { motion } from "framer-motion";
import { experiencesData } from "@/lib/constant/Experience";

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
              <motion.div className={style["text-wrapper"]}>
                <h3 className="bg-darkBlue w-fit !text-center text-white px-7 rounded">
                  {item.title}{" "}
                </h3>
                <div className="flex  justify-between items-center">
                  <div className="flex gap- space-x-4 items-center">
                    <p className="bg-gray-400 px-2 py-0 rounded text-white  ">
                      {item.location}
                    </p>
                  </div>
                  <p className="border-b-2 border-darkBlue">
                    {item.date} / {item.position}{" "}
                  </p>
                </div>

                <p>{item.description}</p>
                <p className="flex gap-3">
                  {item.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2  border-none bg-black/[0.7] !text-xs py-0 rounded text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </Fragment>
      )}
    </section>
  );
};
