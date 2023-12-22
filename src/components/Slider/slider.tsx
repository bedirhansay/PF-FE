"use client";

import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { blog } from "@constant";
import { FaEdit } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { GetBadgeIcon, Truncate } from "@utils";
import { MdDelete } from "react-icons/md";

import style from "./slider.module.scss";
import clsx from "clsx";

export const Slider = ({ category }: { category: any }) => {
  return (
    <div id="blog" className={style["parent"]}>
      <Swiper
        spaceBetween={30}
        slidesPerView="auto"
        navigation={true}
        modules={[Navigation]}
        className={clsx(style["swiper"], "my-swiper ")}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {category.map((item: any, i: number) => (
          <SwiperSlide key={"swiper" + i} className={style["swiperSlide"]}>
            <Image
              height={128}
              width={140}
              className={style["sliderImage"]}
              src={item?.image}
              alt={item?.title}
            />
            <div className={style["text-wrapper"]}>
              <h2 className={style["title"]}>{Truncate(item?.title, 50)}</h2>

              <div className="flex justify-between items-center">
                <span className="bg-yellow-400 rounded shadow-sm p-2 text-white">
                  <FaEdit />
                </span>
                <span className="bg-red-500 rounded shadow-sm p-2 text-white">
                  <MdDelete />
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
