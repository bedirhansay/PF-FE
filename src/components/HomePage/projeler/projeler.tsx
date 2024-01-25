"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./projeler.module.scss";
import { ProjectsAnim } from "./animations";
import "swiper/css";

import { ProjectDTO } from "@/lib/types";
import { useSectionInView } from "@/lib/hooks";
import { projectDatas } from "@/lib/constant";
import { Heading } from "@/components/ui";

export const Projeler = ({ projects }: { projects: ProjectDTO[] }) => {
  const [activeProject, setActiveProject] = useState(0);

  const { ref } = useSectionInView("Projeler");

  const handleClick = (index: number) => {
    setActiveProject(index);
  };

  return (
    <div ref={ref} id="projects" className={style["projects-container"]}>
      <Heading title="Projeler" />

      <div className="">
        <Swiper
          className={style["swiper-container"]}
          spaceBetween={10}
          slidesPerView={3}
        >
          {projectDatas.map((item, index) => (
            <SwiperSlide
              key={"projeler" + index}
              className={`  ml-2 !w-32 text-sm  sm:text-base cursor-pointer text-white  ${
                index === activeProject ? "bg-gray-600 rounded-md " : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {item.projectName}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <motion.div
        {...ProjectsAnim(activeProject)}
        className={style["active-project"]}
      >
        {activeProject !== null && (
          <div>
            <motion.div className="sm:flex ">
              <div
                className={style["image-wrapper"]}
                style={{
                  aspectRatio: "16/9",
                }}
              >
                <Image
                  loading="lazy"
                  alt={projectDatas[activeProject].description}
                  src={projectDatas[activeProject].image}
                ></Image>
              </div>
              <div className={style["text-wrapper"]}>
                <h2>{projectDatas[activeProject].projectName}</h2>
                <h3>{projectDatas[activeProject].area}</h3>
                <p>{projectDatas[activeProject].description}</p>
                <h4>Görevler</h4>
                <ul className={style["task"]}>
                  {projectDatas[activeProject].tasks.map((task, taskIndex) => (
                    <li key={taskIndex + "Task"}>{task}</li>
                  ))}
                </ul>
                {/* //! Gereksinimler */}
                <ul className={style["requirements"]}>
                  {projectDatas[activeProject].requirements.map(
                    (requirement, requirementIndex) => (
                      <li key={requirementIndex + "req"}>{requirement}</li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
