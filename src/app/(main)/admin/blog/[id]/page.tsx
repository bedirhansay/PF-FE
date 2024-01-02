"use server";
import type { Metadata, ResolvingMetadata } from "next";

import { callApi } from "../../../../../lib/actions/__api.actions";
import { SingleBlogPage } from "@/container/Admin/BlogPage/SingleBlogPage";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data } = await callApi({ method: "get", path: "blog" });
  const selectedBlog = data.blogs.find((item: any) => item.slug == params.id);

  return {
    title: selectedBlog?.title || "",
    description: selectedBlog?.description || "",
  };
}
export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await callApi({ method: "get", path: `/blog/${id}` });

  return <SingleBlogPage blog={data} />;
}
