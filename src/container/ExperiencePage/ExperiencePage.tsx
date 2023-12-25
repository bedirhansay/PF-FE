"use client";

import React from "react";
import { ExperienceDTO } from "@types";
import { Breadcrumb, DataTables, HeadingSection, Modal } from "@components/ui";

export const ExperiencePage = ({
  experience,
}: {
  experience: ExperienceDTO[];
}) => {
  return (
    <div>
      <Breadcrumb page="Deneyim" />
      <HeadingSection title="Deneyimler" showButton />
      <DataTables data={experience} />
    </div>
  );
};
