"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/Input";
import Image from "next/image";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { BlogDTO } from "../../lib/types/types";
import style from "./blog.module.scss";

export const ClientBlogPage = ({ blogs }: { blogs: BlogDTO[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Blog filtreleme fonksiyonu
  // const filteredBlogs = blogs.filter((item) => {
  //   return (
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (selectedCategory === "" || item.category.name === selectedCategory)
  //   );
  // });

  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  const pages = [1, 2, 3, 4, 5];
  // const categories = [...new Set(blogs.map((item) => item.category.name))];

  return (
    <div className="overflow-x-hidden">
      <div className={style["section"]}>
        <h1>Bloglar</h1>
        <div className={style["link-container"]}>
          <div className={style["link-item"]}>
            <span className={style["link-icon"]}></span>
            <Link href="/">Home</Link>
          </div>
          <div className={style["link-item"]}>
            <span className={style["link-icon"]}></span>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </div>

      {/* //! Search */}

      <div className={style["max-width-container"]}>
        {/* //! Filtre alan */}
        {/* <div className="bg-gray-700 h-fit flex flex-col rounded p-2">
          <label
            htmlFor=""
            className="block text-base text-center font-medium bg-white py-2 rounded"
          >
            Kategori
          </label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tümü</option>
            {categories.map((category, index) => (
              <option key={index + "opt"} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div> */}

        {/* //! Filter ve Blog alan */}
        <div className={style["blog-wrapper"]}>
          <div className={style.gridContainer}>
            <Input
              value={searchTerm}
              placeholder="Blog yazısı ara"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label htmlFor="">
              <IoSearchOutline fontSize={24} />
            </label>
          </div>

          {/* //! Blogs */}
          <div className={style["ul-container"]}>
            {blogs?.map((item) => (
              <div key={item._id} className={style["blog-container"]}>
                <h3>{item.title}</h3>
                <Image alt="" width={200} height={100} src={item.image || ""} />

                <span>Kategori: {item?.category.name || ""}</span>
                <Link href={"/blog/" + item.slug}>Okumaya Devam Et</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* //! Pagination */}

      <div className={style["pagination-container"]}>
        <Link href="/">
          <CiCircleChevLeft fontSize={32} />
        </Link>
        {pages.map((item, i) => (
          <Link
            className={
              item == Number(search)
                ? "bg-gray-900 text-white rounded-md px-4 py-2"
                : "text-black"
            }
            href={{
              pathname: "blog",
              query: { page: item },
            }}
            key={i + "page"}
          >
            {item}
          </Link>
        ))}
        <Link href="/">
          <CiCircleChevRight fontSize={32} />
        </Link>
      </div>
    </div>
  );
};
