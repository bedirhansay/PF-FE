import { BlogPage } from "./blog/blogpage";
import { Intro } from "./intro/intro";
import Divider from "@/components/ui/divider/divider";
import AboutSection from "./about/about";
import Projeler from "./projeler/projeler";
import Skills from "./skills/skills";
import Deneyim from "./deneyim/deneyim";
import Contact from "./contact/contact";
import Footer from "./footer/footer";
import { BlogDTO, ProjectDTO } from "@/lib/Types";
import { FC } from "react";
import { ClientOnly } from "@/components/ClientOnly";

export type HomePageProps = {
  data: {
    blog: BlogDTO[];
    projects: ProjectDTO[];
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
        <AboutSection />
        <Divider line />
        <Projeler projects={data.projects} />
        <Divider line />
        <Skills />
        <Divider line />
        <Deneyim />
        <Divider line />
        <Contact />
        <Divider line />
        <Footer />
      </ClientOnly>
    </section>
  );
};
