import { BlogPage } from "./blog/blogpage";
import { Intro } from "./intro/intro";
import { callApi } from "@/lib/actions/__api.actions";
import Divider from "@/components/ui/divider/divider";
import AboutSection from "./about/about";
import Projeler from "./projeler/projeler";
import Skills from "./skills/skills";
import Deneyim from "./deneyim/deneyim";
import Contact from "./contact/contact";
import Footer from "./footer/footer";
import {
  AboutDTO,
  BlogDTO,
  ExperienceDTO,
  ProjectDTO,
  SkillsDTO,
} from "@/lib/types";
import { FC } from "react";
import { ClientOnly } from "@/components/ClientOnly";

export type HomePageProps = {
  data: {
    blog: BlogDTO[];
    about: AboutDTO[];
    projects: ProjectDTO[];
    skills: SkillsDTO[];
    experience: ExperienceDTO[];
  };
};

export const HomePage: FC<HomePageProps> = async ({ data }) => {
  return (
    <section>
      <ClientOnly>
        <Intro />
        <Divider />
        <BlogPage blogs={data.blog} />
        <Divider line />
        <AboutSection about={data.about} />
        <Divider line />
        <Projeler projects={data.projects} />
        <Divider line />
        <Skills skills={data.skills} />
        <Divider line />
        <Deneyim experience={data.experience} />
        <Divider line />
        <Contact />
        <Divider line />
        <Footer />
      </ClientOnly>
    </section>
  );
};
