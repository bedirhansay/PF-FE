import React from "react";

import { RiArrowGoBackFill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { BsClock } from "react-icons/bs";
import { Share } from "@components";
import style from "./blog.module.scss";

export const ClientSingleBlogPage = ({
  selectedBlog,
  otherBlogs,
}: {
  selectedBlog: any;
  otherBlogs: any[];
}) => {
  return (
    <div className="clamp-size  mt-10 my-10">
      <div className="flex flex-col gap-10 px-4">
        <h1 className="bg-gray-900 text-white flex flex-col text-center font-bold rounded shadow-md text-base sm:text-3xl py-10">
          {selectedBlog?.title}
          <span className="flex-center text-xs mt-2 ">
            <BsClock />2 min read
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-2 text-justify">
          <div className="bg-white">
            <div className="flex items-center px-4">
              <Link href="/" className="block bg-lightBlue p-2 my-4 rounded">
                <RiArrowGoBackFill color="white" size={24} />
              </Link>
              <h2 className="px-4 py-2 font-medium">{selectedBlog?.title}</h2>
            </div>

            <Image
              alt={"blog"}
              width={800}
              height={300}
              src={selectedBlog?.image || ""}
              className="aspect-video mx-auto my-4 rounded"
            />

            <div
              className={style["outer-html"]}
              dangerouslySetInnerHTML={{
                __html: selectedBlog?.description || "",
              }}
            ></div>
          </div>

          <div>
            <div className="bg-white px-4 py-10 text-sm">
              <h2 className="text-lg text-center font-bold mb-4">
                Diğer Bloglar
              </h2>
              <ul className=" flex !h-96 scroll overflow-y-scroll  flex-col gap-4">
                {otherBlogs.map((otherBlog) => (
                  <li key={otherBlog.slug} className="mb-2">
                    <Link
                      className="flex gap-2"
                      href={`/blog/${otherBlog.slug}`}
                    >
                      <Image
                        style={{
                          aspectRatio: "11/9",
                        }}
                        className="rounded"
                        alt="im"
                        width={90}
                        height={90}
                        src={otherBlog.image}
                      ></Image>
                      <div className="flex flex-col px-2 justify-between">
                        <span className="font-medium text-left">
                          {otherBlog?.title}
                        </span>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm">5 min Read</span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          <span className="text-lightBlue">
                            {otherBlog.date}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Share blog={selectedBlog} />
          </div>
        </div>
      </div>
    </div>
  );
};