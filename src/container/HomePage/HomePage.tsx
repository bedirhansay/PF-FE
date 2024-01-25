import {
  Intro,
  BlogPage,
  AboutSection,
  Projeler,
  Skills,
  Deneyim,
  Contact,
  Footer,
} from "@/components/HomePage";
import { BlogDTO, ProjectDTO } from "@/lib/types";
import { FC } from "react";
import { ClientOnly } from "@/lib/hooks";
import { Seperator } from "@/components/ui";

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
        {/* <div className="flex gap-5 ">
          <p className="bg-layout text-muted-foreground w-fit h-10 flex-between">
            layout
          </p>
          <p className="bg-background text-foreground w-fit h-10 flex-between">
            Bacground
          </p>
          <p className="bg-mask text-foreground w-fit h-10 flex-between">
            Mask
          </p>
          <p className="bg-accent text-accent-foreground w-fit h-10 flex-between">
            Accent
          </p>

          <p className="bg-primary text-primary-foreground w-fit h-10 flex-between">
            primary
          </p>
          <p className="bg-secondary text-secondary-foreground w-fit h-10 flex-between">
            secondary
          </p>
          <p className="bg-muted text-muted-foreground w-fit h-10 flex-between">
            muted
          </p>
        </div> */}
        <Intro />
        <Seperator />
        <BlogPage blogs={data.blog} />
        <Seperator line />
        <AboutSection />
        <Seperator line />
        <Projeler projects={data.projects} />
        <Seperator line />
        <Skills />
        <Seperator line />
        <Deneyim />
        <Seperator line />
        <Contact />
        <Seperator line />
        <Footer />
      </ClientOnly>
    </section>
  );
};
