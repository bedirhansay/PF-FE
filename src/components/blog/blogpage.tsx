"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React from "react";
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
import { ParentAnim } from "./animations";
import toast from "react-hot-toast";

export const BlogPage = () => {
  const data = blog.slice(0, 9);

  const [width] = useSize();

  return (
    <div className="px-2">
      <Heading title="Blog Yazıları" link="blog" />
      {width > 650 ? (
        <div className={style["parent"]}>
          {data.map((item, index) => (
            <motion.div
              onClick={() => toast.error("Blog Sayfaları hazırlanmaktadır.")}
              {...ParentAnim(index)}
              key={index}
              className={style[`div${index + 1}`]}
            >
              <Image
                className={style["blogImage"]}
                src={item.image}
                alt={item.title}
              />
              <span className={style["viewCount"]}>
                <BsEye /> {item.viewCount}
              </span>
              <h2 className={style["title"]}>{item.title}</h2>
              <span className={style["date"]}>
                <IoCalendarNumber />
                {item.date}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          onClick={() => toast.error("Blog Sayfaları hazırlanmaktadır.")}
          className="mySwiper"
        >
          {data.map((item, i) => (
            <SwiperSlide key={"swiper" + i}>
              <Image
                className={style["sliderImage"]}
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <span className={style["viewCount"]}>
                <BsEye /> {item.viewCount}
              </span>
              <h2 className={style["title"]}>{item.title}</h2>
              <span className={style["date"]}>
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
