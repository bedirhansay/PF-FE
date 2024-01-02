import dynamic from "next/dynamic";
import { BlogPage } from "./blog/blogpage";
import { Intro } from "./intro/intro";

const AboutSection = dynamic(() => import("./about/about"));
const Projeler = dynamic(() => import("./projeler/projeler"));
const Skills = dynamic(() => import("./skills/skills"));
const Deneyim = dynamic(() => import("./deneyim/deneyim"));
const Contact = dynamic(() => import("./contact/contact"));
const Footer = dynamic(() => import("./footer/footer"));
const Divider = dynamic(() => import("@/components/ui/divider/divider"));

export const HomePage = () => {
  return (
    <section>
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
    </section>
  );
};
