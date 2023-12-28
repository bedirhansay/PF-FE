"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Heading } from "@components/ui";
import { blog } from "@constant";
import { BsEye, BsArrowRightShort } from "react-icons/bs";
import { useSize, useSectionInView } from "@hooks";
import { ProfilePic } from "@public";
import { GetBadgeIcon } from "@utils";
import style from "./blog.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import CustomImage from "../../../components/NextImage/NextImage";

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
        slidesPerView={width < 850 ? 1 : 2}
        spaceBetween={30}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={"swiper" + i} className={style["swiperSlide"]}>
            <CustomImage
              width={200}
              height={200}
              priority={false}
              className={style["sliderImage"]}
              src={item.image}
              alt={item.title}
              sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
            />
            <div className={style["text-wrapper"]}>
              <div className={style["first-text"]}>
                <span className="flex items-center">
                  <Image
                    alt=""
                    width={50}
                    src={GetBadgeIcon(item.category) || ""}
                    className="px-2 rounded py-1 mr-2 "
                  ></Image>
                  <span className="text-gray-500">{item.date}</span>
                </span>
                <span className={style["viewCount"]}>
                  <BsEye /> {item.viewCount}
                </span>
              </div>

              <h2 className={style["title"]}>{item.title}</h2>

              <div className="flex justify-between items-center">
                <div className="flex  gap-3 items-center">
                  <Image
                    height={40}
                    width={40}
                    alt="profile"
                    src={ProfilePic}
                    className="rounded-md"
                  ></Image>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Bedirhan Say</span>
                    <span className="text-xs">Frontend Developer</span>
                  </div>
                </div>
                <Link
                  className="text-xs  px-2 py-2 rounded underline flex items-center gap-2"
                  href={`/blog/${item.slug}`}
                >
                  Daha fazla <BsArrowRightShort />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
