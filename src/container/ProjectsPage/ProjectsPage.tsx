"use client";

import { Breadcrumb, DataTables, HeadingSection } from "@components/ui";
import React from "react";
import { ProjectDTO } from "@types";

export const ProjectsPage = ({ projects }: { projects: ProjectDTO[] }) => {
  const buttonHandler = () => {};
  return (
    <div>
      <Breadcrumb page="Projeler" />
      <HeadingSection
        title="Deneyimler"
        showButton
        onButtonClick={buttonHandler}
      />
      <DataTables data={projects} />
    </div>
  );
};
