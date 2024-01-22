import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./Blog.module.scss";
export const BlogCard = (item: any) => {
  return (
    <div key={item._id} className={style["blog-container"]}>
      <h3>{item.title}</h3>
      <Image alt="" width={200} height={100} src={item.image || ""} />
      <span>Kategori: {item?.category.name || ""}</span>
      <Link href={"/blog/" + item.slug}>Okumaya Devam Et</Link>
    </div>
  );
};
