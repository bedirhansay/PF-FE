"use client";

import React from "react";
import { useSectionInView } from "@/lib/hooks";
import style from "./projects.module.scss";
import { Heading, ProjectCard } from "@/components/ui";
import { projectDatas } from "@/lib/constant/Project";

export const Projects = () => {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className={style["projects-wrapper"]}>
      <Heading title="Projeler" link="projects" />
      <div>
        {projectDatas.map((project, index) => (
          <React.Fragment key={index + "projects"}>
            <ProjectCard {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
