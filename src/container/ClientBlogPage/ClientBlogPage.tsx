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
  const categories = [...new Set(blogs.map((item) => item.category.name))];

  return (
    <div className="overflow-x-hidden">
      <div className={style["section"]}>
        <h1 className="text-3xl">Bloglar</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <Link href="/">Home</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </div>

      {/* //! Search */}

      <div className="max-w-7xl mt-8  gap-12  bg-white mx-auto py-4 px-4 ">
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
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-[1fr,80px] w-full border-2 border-gray-900 rounded-2xl flex-between">
            <Input
              className="flex w-full basis-2 border-none"
              value={searchTerm}
              placeholder="Blog yazısı ara"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label
              className="px-8 hover:bg-opacity-75 py-4 rounded-r-xl bg-gray-900 text-white"
              htmlFor=""
            >
              <IoSearchOutline fontSize={24} />
            </label>
          </div>
          {/* //! Blogs */}
          <div className={style["ul-container"]}>
            {blogs.map((item) => (
              <div
                key={item._id}
                className=" p-4 hover:scale-105 border transition ease-in-out duration-200 flex flex-col items-center justify-between gap-4 bg-white border-gray-300 shadow-md rounded-md"
              >
                <h3 className="text-lg font-semibold text-center mb-2">
                  {item.title}
                </h3>
                <Image
                  alt=""
                  width={200}
                  height={100}
                  className="rounded w-44"
                  src={item.image || ""}
                ></Image>

                <span className="text-sm text-gray-500">
                  Kategori: {item?.category.name || ""}
                </span>
                <Link
                  className="bg-[#3498db] text-white px-2 py-1 rounded"
                  href={"/blog/" + item.slug}
                >
                  Okumaya Devam Et
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* //! Pagination */}

      <div className="flex justify-center mb-10 pb-10 max-w-7xl bg-white items-center mx-auto gap-4 self-end px-4">
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
