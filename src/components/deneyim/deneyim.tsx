"use client";

import { useSectionInView } from "@hooks";
import { Heading } from "@components/ui";
import { motion } from "framer-motion";
import { experiencesData } from "@constant";
import { experinceAnimations } from "./animations";
import style from "./experience.module.scss";

export const Deneyim = () => {
  const { ref, view } = useSectionInView("Deneyim", 0.9);

  return (
    <section id="experience" ref={ref} className={style.sectionWrapper}>
      <Heading title="Deneyim" link="experience" />

      {experiencesData.map((item, index) => (
        <motion.div
          {...experinceAnimations(index)}
          className={style.boxWrapper}
          key={item.title + "vertical"}
        >
          <motion.div className={style.textWrapper}>
            <h3>{item.title} </h3>
            <div className={style.blogDetail}>
              <div className={style.sub}>
                <p className={style.pText}>{item.location}</p>
              </div>
              <p className={style.pText}>
                {item.date} / {item.position}{" "}
              </p>
            </div>
            <ul className={style.resp}>
              {item.responsibilities.map((skill, innerIndex) => (
                <li className="list-disc" key={item.title + innerIndex}>
                  {skill}
                </li>
              ))}
            </ul>

            <div className={style.tech}>
              {item.skills.map((skill, innerIndex) => (
                <span key={item.title + innerIndex}>{skill}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
};
