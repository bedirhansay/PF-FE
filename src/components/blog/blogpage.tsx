"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React, { useEffect, useState } from "react";
import style from "./blog.module.scss";
import { Heading } from "../ui";
import { blog } from "@/lib/constant/blogs";
import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { motion } from "framer-motion";
import { useSize } from "@/lib/hooks/useSize";
import "swiper/css";
import "swiper/css/navigation";

export const BlogPage = () => {
  // const [data, setData] = useState([]);
  const data = blog.slice(0, 9);

  const [width] = useSize();
  console.log(width);

  return (
    <div>
      <Heading title="Blog Yazıları" link="blog" />
      {width > 650 ? (
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
                className="h-48 w-full sm:h-72 rounded "
                src={item.image}
                alt={item.title}
                loading="lazy"
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
      ) : (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {data.map((item, i) => (
            <SwiperSlide key={"swiper" + i}>
              <Image
                className=" w-full h-72 rounded "
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <span className="absolute px-2 bg-gray-300 rounded  flex items-center gap-2 font-bold top-2 right-3 text-gray-600 text-xs">
                <BsEye /> {item.viewCount}
              </span>
              <h2 className=" bg-gray-50 rounded text-gray-400 absolute px-4 bottom-6 text-sm">
                {item.title}
              </h2>
              <span className="absolute bottom-2 flex items-center gap-2 text-white text-xs font-bold px-4 ">
                <IoCalendarNumber />
                {item.date}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
