"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaEdit } from "react-icons/fa";
import { Truncate } from "@utils";
import { MdDelete } from "react-icons/md";
import style from "./slider.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import NextImage from "./NextImage";

export const Slider = ({ category }: { category: any }) => {
  return (
    <div id="blog" className="w-full py-4 bg-white px-4">
      <Swiper
        spaceBetween={30}
        slidesPerView="auto"
        navigation={true}
        modules={[Navigation]}
        className="w-full overflow-hidden my-swiper"
      >
        {category.map((item: any, i: number) => (
          <SwiperSlide
            key={"swiper" + i}
            className="shadow-lg w-60 p-2 flex flex-col bg-gray-100 border border-gray-300 items-center rounded-md"
          >
            <NextImage
              height={128}
              width={140}
              src={item?.image}
              alt={item?.title}
              placeholder="blur"
            />
            <div className="flex flex-col w-full my-2">
              <h2 className="font-bold mt-2 mb-2 bottom-6 text-sm">
                {Truncate(item?.title, 50)}
              </h2>

              <div className="flex-between">
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
