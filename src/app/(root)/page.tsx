import { HomePage } from "@/container/HomePage/HomePage";
import { callApi } from "@/lib/actions/__api.actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [blog, about, projects, skills, experience] = await Promise.all([
    callApi({ method: "get", path: "blog" }),
    callApi({ method: "get", path: "about" }),
    callApi({ method: "get", path: "projects" }),
    callApi({ method: "get", path: "skills" }),
    callApi({ method: "get", path: "experience" }),
  ]);

  return (
    <HomePage
      data={{
        blog: blog.data.blogs,
        about: about.data,
        projects: projects.data,
        skills: skills.data,
        experience: experience.data,
      }}
    />
  );
}
