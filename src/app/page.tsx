import { Divider } from "@/components";
import { About, Intro, Projects } from "@/pageComponents";

export default function Home() {
  return (
    <main>
      <Intro />
      <Divider />
      <About />
      <Divider line />
      <Projects />
      <Divider line />
    </main>
  );
}
