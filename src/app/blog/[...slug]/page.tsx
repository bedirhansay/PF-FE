import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { blog } from "../../../lib/constant/blogs";
import { ClientSingleBlogPage } from "@container";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const selectedBlog = blog.find((item) => item.slug == params.slug);

  return {
    title: selectedBlog?.title || "",
    description: selectedBlog?.description || "",
  };
}

export default function page({ params }: Props) {
  const { slug } = params;
  const selectedBlog = blog.find((item) => item.slug == slug);
  const otherBlogs = blog.filter((item) => item.slug != slug);

  return (
    <ClientSingleBlogPage selectedBlog={selectedBlog} otherBlogs={otherBlogs} />
  );
}
