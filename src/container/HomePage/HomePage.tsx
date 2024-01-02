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

export const HomePage = async () => {
  const [blog, about, projects, skills, experience] = await Promise.all([
    callApi({ method: "get", path: "blog" }),
    callApi({ method: "get", path: "about" }),
    callApi({ method: "get", path: "projects" }),
    callApi({ method: "get", path: "skills" }),
    callApi({ method: "get", path: "experience" }),
  ]);

  

  return (
    <section>
      <Intro />
      <Divider />
      <BlogPage blogs={blog.data.blogs} />
      <Divider line />
      <AboutSection about={about.data} />
      <Divider line />
      <Projeler projects={projects.data} />
      <Divider line />
      <Skills skills={skills.data} />
      <Divider line />
      <Deneyim experience={experience.data} />
      <Divider line />
      <Contact />
      <Divider line />
      <Footer />
    </section>
  );
};
