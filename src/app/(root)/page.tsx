import {
  AboutSection,
  Intro,
  Skills,
  Contact,
  BlogPage,
  Projeler,
} from "@components";
import { Experience } from "../../components/experience/experince";
import { Divider } from "@components/ui";

export default async function Home() {
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
      <Experience />
      <Divider line />
      <Contact />
    </main>
  );
}
