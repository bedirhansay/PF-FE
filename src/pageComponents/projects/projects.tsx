"use client";

import React from "react";
import { projectsData } from "@/lib/data";
import ProjectCard from "../../components/Card/ProjectCard/ProjectCard";
import { useSectionInView } from "@/hooks/useSectionInView";

export const Projects = () => {
  const { ref } = useSectionInView("Projects");
  return (
    <section
      ref={ref}
      id="projects"
      className="scroll-mt-28 max-w-7xl mx-auto mb-28"
    >
      <h2>My projects</h2>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <ProjectCard {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
