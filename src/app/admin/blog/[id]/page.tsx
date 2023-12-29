"use server";

import { SingleBlogPage } from "@container";
import { callApi } from "../../../../lib/actions/__api.actions";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await callApi({ method: "get", path: `/blog/${id}` });
  const allBlogs = await callApi({ method: "get", path: "blog" });

  return <SingleBlogPage blog={data} />;
}
