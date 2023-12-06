import { AboutSection, Intro, Projects, Skills } from "@/components";
import { Divider } from "@/components/ui";

export default function Home() {
  return (
    <main>
      <Intro />
      <Divider />
      <AboutSection />
      <Divider line />
      <Projects />
      <Divider line />
      <Skills />
      <Divider line />
      {/* <Experience /> */}
    </main>
  );
}
