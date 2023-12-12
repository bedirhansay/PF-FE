import { AboutSection, Experience, Intro, Skills, Contact } from "@/components";
import { BlogPage } from "@/components/blog/blogpage";
import { Projeler } from "@/components/projeler/projeler";
import { Divider } from "@/components/ui";

export default function Home() {
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
      {/* <Projects />
      <Divider line /> */}
      <Skills />
      <Divider line />
      <Experience />
      <Divider line />
      <Contact />
    </main>
  );
}
