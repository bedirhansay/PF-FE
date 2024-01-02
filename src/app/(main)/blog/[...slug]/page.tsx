import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { callApi } from "../../../../lib/actions/__api.actions";
import { notFound } from "next/navigation";
import { ClientSingleBlogPage } from "@/container/ClientBlogPage/ClientSingleBlogPage";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data } = await callApi({ method: "get", path: "blog" });
  const selectedBlog = data.blogs.find((item: any) => item.slug == params.slug);

  return {
    title: selectedBlog?.title || "",
    description: selectedBlog?.description || "",
  };
}

export default async function page({ params }: Props) {
  const { slug } = params;
  const { data } = await callApi({ method: "get", path: "blog" });

  const selectedBlog = data.blogs.find((item: any) => item.slug == slug);
  if (!selectedBlog) {
    notFound();
  }

  const otherBlogs = data.blogs.filter((item: any) => item.slug != slug);
  return (
    <ClientSingleBlogPage selectedBlog={selectedBlog} otherBlogs={otherBlogs} />
  );
}
