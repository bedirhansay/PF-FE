import { HomePage } from "@/container/HomePage/HomePage";
import { callApi } from "@/lib/actions/__api.actions";

export const dynamic = "force-dynamic";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data } = await callApi({ method: "get", path: "experience" });

  return {
    title: "BS | Anasayfa",
    description: data?.description || "",
  };
}

export default async function Home() {
  const [blog, projects] = await Promise.all([
    callApi({ method: "get", path: "blog" }),
    callApi({ method: "get", path: "projects" }),
  ]);

  return (
    <HomePage
      data={{
        blog: blog.data.blogs,
        projects: projects.data,
      }}
    />
  );
}
