"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BsEye, BsArrowRightShort } from "react-icons/bs";
import style from "./blog.module.scss";
import { useSectionInView } from "@/lib/hooks";
import { BlogDTO } from "@/lib/types";
import { ProfilePic } from "../../../../public";
import { Button, Title } from "@/components/ui";
import { FormatDate } from "@/lib/utils/format.date";
import "swiper/css";
import "swiper/css/navigation";

export const BlogPage = ({ blogs }: { blogs: BlogDTO[] }) => {
  const { ref } = useSectionInView("Blog");

  return (
    <div ref={ref} id="blog" className={style["parent"]}>
      <Title title="Blog Yazıları" link="blog" />

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView="auto"
        spaceBetween={30}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {blogs?.map((item, i) => (
          <SwiperSlide key={"swiper" + i} className={style["swiperSlide"]}>
            <Image
              width={200}
              height={200}
              loading="lazy"
              className={style["sliderImage"]}
              src={item.image || ""}
              alt={item.title}
              sizes="(min-width: 640px) 176px, 200px"
            />
            <div className={style["text-wrapper"]}>
              <div className={style["first-text"]}>
                <span className="flex items-center">
                  <Image
                    alt=""
                    width={50}
                    height={50}
                    src={item?.category?.image}
                    className="px-2 rounded py-1 mr-2 "
                  ></Image>
                  <span className="text-gray-500">
                    {FormatDate(item?.createdAt)}
                  </span>
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
                  prefetch
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

      <div className="flex justify-center">
        <Button className="mt-8" variant="outline">
          <Link
            href={{
              pathname: "blog",
              query: { page: 1 },
            }}
          >
            Tüm Blog Yazları
          </Link>
        </Button>
      </div>
    </div>
  );
};
