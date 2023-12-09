"use client";

import React, { useState } from "react";
import { projectDatas } from "@/lib/constant/Project";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import { motion } from "framer-motion";
export const Projeler = () => {
  const [activeProject, setActiveProject] = useState(0);

  const handleClick = (index: number) => {
    setActiveProject(index);
  };

  return (
    <div id="projects">
      <h2 className="text-center text-4xl font-semibold mb-8">Projeler</h2>
      <div className="flex flex-col ">
        <div className="">
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            className="flex justify-between  max-w-7xl mx-auto flex-wrap rounded-lg bg-darkBlue mb-8 !px-8 !py-3 text-center"
          >
            {projectDatas.map((item, index) => (
              <SwiperSlide
                key={item.projectName}
                className={`text-base cursor-pointer !w-32 text-white  ${
                  index === activeProject
                    ? "bg-white rounded-md !text-darkBlue"
                    : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {item.projectName}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <motion.div
          animate={{
            opacity: [0, 0.4, 0.8, 1],
          }}
          key={activeProject}
          whileInView="true"
          transition={{
            delay: 0.3,
          }}
          className=" px-2 border p-4 bg-gray-50 rounded-md shadow-lg"
        >
          {activeProject !== null && (
            <div>
              <motion.div className="sm:flex ">
                <div
                  className="relative sm:max-w-[50%]  items-center flex "
                  style={{
                    aspectRatio: "16/9",
                  }}
                >
                  <Image
                    alt={projectDatas[activeProject].description}
                    className="rounded"
                    src={projectDatas[activeProject].image}
                    objectFit="fill"
                  ></Image>
                </div>
                <div className="flex flex-col ml-4 justify-between">
                  <h2 className="text-2xl mt-4 sm:mt-0 font-bold mb-2">
                    {projectDatas[activeProject].projectName}
                  </h2>

                  <p className="mb-1 bg-gray-400 text-gray-100 text-xs px-2 rounded w-fit">
                    {projectDatas[activeProject].area}
                  </p>
                  <p className="mb-4">
                    {projectDatas[activeProject].description}
                  </p>

                  <h4 className="text-lg font-bold mb-2">Görevler</h4>
                  <ul className="list-inside list-disc">
                    {projectDatas[activeProject].tasks.map(
                      (task, taskIndex) => (
                        <li key={taskIndex} className="mb-1">
                          {task}
                        </li>
                      )
                    )}
                  </ul>
                  {/* //! Gereksinimler */}
                  <ul className="flex gap-2 flex-wrap">
                    {projectDatas[activeProject].requirements.map(
                      (requirement, requirementIndex) => (
                        <li
                          key={requirementIndex}
                          className="mb-1 bg-black/[0.7]  text-gray-200 text-xs px-2 rounded "
                        >
                          {requirement}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
