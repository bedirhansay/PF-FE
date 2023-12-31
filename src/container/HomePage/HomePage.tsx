"use client";

import { Divider } from "@components/ui";
import { Intro } from "./intro/intro";
import { BlogPage } from "./blog/blogpage";
import { AboutSection } from "./about/about";
import { Projeler } from "./projeler/projeler";
import { Skills } from "./skills/skills";
import { Deneyim } from "./deneyim/deneyim";
import { Contact } from "./contact/contact";
import { Footer } from "./footer/footer";

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
      <Divider line />
      <Footer />
    </main>
  );
};
