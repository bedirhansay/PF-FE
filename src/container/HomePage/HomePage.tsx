import React from "react";

import { Divider } from "@components/ui";
import { Intro } from "./intro/intro";
import { BlogPage } from "./blog/blogpage";
import { AboutSection } from "./about/about";
import { Projeler } from "./projeler/projeler";
import { Skills } from "./skills/skills";
import { Deneyim } from "./deneyim/deneyim";
import { Contact } from "./contact/contact";

export const HomePage = () => {
  return (
    <main>
      <Intro />
      <Divider />
      <BlogPage />
      <Divider line />
      <AboutSection />
      <Divider line />
      <Projeler />
      <Divider line />
      <Skills />
      <Divider line />
      <Deneyim />
      <Divider line />
      <Contact />
    </main>
  );
};
