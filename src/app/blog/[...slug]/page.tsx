import { blog } from "@/lib/constant/blogs";
import React from "react";

export default function page({ params }: { params: any }) {
  const selectedBlogs = blog.find((item) => item.slug == params.slug);

  return <div></div>;
}
