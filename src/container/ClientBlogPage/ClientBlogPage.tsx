"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import style from "./blog.module.scss";
import { Pagination } from "@/components/Pagination";
import { BlogPageDTO } from "@/lib/types";
import { Filter } from "@/components/Filter/Filter";
import { BlogCard } from "@/components/ui/card/BlogCard/BlogCard";
import qs from "query-string";
import { useFetch } from "@/lib/hooks/useFetch";

export const ClientBlogPage = ({ blogs }: { blogs: BlogPageDTO }) => {
  const [blogsItems, setBlogsItems] = useState<BlogPageDTO>(blogs);
  const searchParams = useSearchParams();

  const queryHandler = () => {
    return searchParams
      ? qs.parse(searchParams.toString(), { arrayFormat: "comma" })
      : {};
  };

  const url = qs.stringifyUrl(
    { url: "/blog", query: queryHandler() },
    { skipNull: true, skipEmptyString: true, arrayFormat: "comma" }
  );

  const { data, loading } = useFetch({
    path: url,
    method: "get",
  });

  const categories = [
    ...new Set(blogsItems.blogs.map((item) => item.category.name)),
  ];

  return (
    <div className="overflow-x-hidden">
      <div className={style["section"]}>
        <h1>Bloglar</h1>
        <div className={style["link-container"]}>
          <div className={style["link-item"]}>
            <span className={style["link-icon"]}></span>
            <Link href="/">Anasayfa</Link>
          </div>
          <div className={style["link-item"]}>
            <span className={style["link-icon"]}></span>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </div>

      <div className={style["max-width-container"]}>
        <div className={style["blog-wrapper"]}>
          <Filter categories={categories} />
          <div className={style["ul-container"]}>
            {blogsItems.blogs?.map((item) => (
              <BlogCard key={item._id} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* //! Pagination */}

      <Pagination
        currentPage={blogsItems.currentPage}
        totalPage={blogsItems.totalPages}
      />
    </div>
  );
};
