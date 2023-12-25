"use client";

import React from "react";
import { BlogDTO } from "../../lib/types/types";
import { Breadcrumb, DataTables, HeadingSection } from "@components/ui";

export const BlogPage = ({ Blogs }: { Blogs: BlogDTO[] }) => {
  const buttonHandler = () => {};
  return (
    <div>
      <Breadcrumb page="Blog" />
      <HeadingSection
        title="Deneyimler"
        showButton
        onButtonClick={buttonHandler}
      />
      <DataTables data={Blogs} />
    </div>
  );
};
