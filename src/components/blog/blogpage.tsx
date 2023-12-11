"use client";

import React from "react";
import style from "./blog.module.scss";
import { Heading } from "../ui";
import { blog } from "@/lib/constant/blogs";
import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { motion } from "framer-motion";
export const BlogPage = () => {
  const data = blog.slice(0, 9);

  return (
    <div>
      <Heading title="Blog Yazıları" link="blog" />
      <div className={style["parent"]}>
        {data.map((item, index) => (
          <motion.div
            animate={{
              opacity: [0, 1],
              transition: {
                delay: index / 5,
              },
            }}
            key={index}
            className={style[`div${index + 1}`]}
          >
            <Image
              style={{
                height: "250px",
                width: "100%",
              }}
              src={item.image}
              alt={item.title}
            />
            <span className="absolute bg-gray-300 rounded  flex items-center gap-2 font-bold top-2 right-3 text-black text-xs">
              <BsEye /> {item.viewCount}
            </span>
            <h2 className=" bg-gray-50 rounded text-gray-400 absolute px-4 bottom-6 text-sm">
              {item.title}
            </h2>
            <span className="absolute bottom-2 flex items-center gap-2 text-white text-xs font-bold px-4 ">
              <IoCalendarNumber />
              {item.date}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
