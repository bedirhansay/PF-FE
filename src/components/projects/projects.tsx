"use client";

import React from "react";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import style from "./projects.module.scss";
import { Heading, ProjectCard } from "@/components/ui";

export const Projects = () => {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className={style["projects-wrapper"]}>
      <Heading title="Projeler" link="projects" />
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index + "projects"}>
            <ProjectCard {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
