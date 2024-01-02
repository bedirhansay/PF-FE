"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import style from "./blog.module.scss";
import { callApi } from "@/lib/actions";
import { Pagination } from "@/components/Pagination";
import { BlogPageDTO } from "@/lib/types";

export const ClientBlogPage = ({ blogs }: { blogs: BlogPageDTO }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [blogsItems, setBlogsItems] = useState<BlogPageDTO>(blogs);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const filteredBlogs = blogsItems.blogs.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || item.category.name === selectedCategory)
    );
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await callApi({
        method: "get",
        path: `blog?page=${page}`,
      });

      setBlogsItems(data);
    };
    fetchBlogs();
  }, [page]);

  const pages = [1, 2, 3, 4, 5];
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

      {/* //! Search */}

      <div className={style["max-width-container"]}>
        {/* //! Filter ve Blog alan */}
        <div className={style["blog-wrapper"]}>
          <div className=" flex flex-col-reverse gap-4 sm:flex sm:flex-row sm:gap-8  ">
            {/* //! Filtre alan */}

            <select
              className={style["select-box"]}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Kategori Seç</option>
              {categories.map((category, index) => (
                <option key={index + "opt"} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <div className={style.gridContainer}>
              <Input
                value={searchTerm}
                placeholder="Blog yazısı ara"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="" className="h-10">
                <IoSearchOutline fontSize={24} />
              </label>
            </div>
          </div>

          {/* //! Blogs */}
          <div className={style["ul-container"]}>
            {searchTerm || selectedCategory ? (
              filteredBlogs.length > 0 ? (
                filteredBlogs.map((item) => (
                  <div key={item._id} className={style["blog-container"]}>
                    <h3>{item.title}</h3>
                    <Image
                      alt=""
                      width={200}
                      height={100}
                      src={item.image || ""}
                    />
                    <span>Kategori: {item?.category.name || ""}</span>
                    <Link href={"/blog/" + item.slug}>Okumaya Devam Et</Link>
                  </div>
                ))
              ) : (
                <p>Aradığınız kriterlere uygun blog bulunamadı.</p>
              )
            ) : (
              blogsItems.blogs?.map((item) => (
                <div key={item._id} className={style["blog-container"]}>
                  <h3>{item.title}</h3>
                  <Image
                    alt=""
                    width={200}
                    height={100}
                    src={item.image || ""}
                  />
                  <span>Kategori: {item?.category.name || ""}</span>
                  <Link href={"/blog/" + item.slug}>Okumaya Devam Et</Link>
                </div>
              ))
            )}
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
