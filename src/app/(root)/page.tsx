import {
  AboutSection,
  Experience,
  Intro,
  Projects,
  Skills,
  Contact,
} from "@/components";
import { Projeler } from "@/components/projeler/projeler";
import { Divider } from "@/components/ui";

export default function Home() {
  return (
    <main>
      <Intro />
      <Divider />
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
