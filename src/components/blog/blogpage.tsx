"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Heading } from "../ui";
import { blog } from "@/lib/constant/blogs";
import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { useSize } from "@/lib/hooks/useSize";
import { Truncate } from "@/lib/utils/truncate";
import { useSectionInView } from "@/lib/hooks";
import "swiper/css";
import "swiper/css/navigation";
import style from "./blog.module.scss";
import Link from "next/link";

export const BlogPage = () => {
  const data = blog.slice(0, 9);
  const { ref } = useSectionInView("Blog");
  const [width] = useSize();

  return (
    <div ref={ref} id="blog" className={style["parent"]}>
      <Heading title="Blog Yazıları" link="blog" />

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={width < 750 ? 1 : 3}
        spaceBetween={30}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={"swiper" + i} className={style["swiperSlide"]}>
            <Image
              className={style["sliderImage"]}
              src={item.image}
              alt={item.title}
            />
            <div className={style["text-wrapper"]}>
              <h2 className={style["title"]}>{Truncate(item.title, 55)}</h2>
              <div className="flex justify-between">
                <span className={style["date"]}>
                  <IoCalendarNumber />
                  {item.date}
                </span>
                <span className={style["viewCount"]}>
                  <BsEye /> {item.viewCount}
                </span>
              </div>

              <Link href={`/blog/${item.slug}`}>Daha fazla Oku</Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
