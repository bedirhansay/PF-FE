import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { blog } from "../../../lib/constant/blogs";
import { ClientSingleBlogPage } from "@container";
import { callApi } from "../../../lib/actions/__api.actions";

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
// export async function generateStaticParams() {
//   const allBlogs = await callApi({ method: "get", path: "blog" });
//   console.log(allBlogs);

//   return allBlogs.data?.map((post) => ({
//     id: post._id.toString(),
//   }));
// }

export default async function page({ params }: Props) {
  const { slug } = params;
  const { data } = await callApi({ method: "get", path: "blog" });

  const selectedBlog = data.find((item: any) => item.slug == slug);
  const otherBlogs = data.filter((item: any) => item.slug != slug);

  return (
    <ClientSingleBlogPage selectedBlog={selectedBlog} otherBlogs={otherBlogs} />
  );
}
