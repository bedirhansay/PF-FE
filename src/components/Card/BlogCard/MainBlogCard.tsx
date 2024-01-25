import Image from "next/image";
import Link from "next/link";
import style from "./Blog.module.scss";
import { FormatDate } from "@/lib/utils";

export const MainBlogCard = (item: any) => {
  return (
    <div key={item._id} className={style["blog-container"]}>
      <Image alt={item.title ?? item.name} fill src={item.image || ""} />

      <div className={style["text-info"]}>
        <span className={style["date"]}> {FormatDate(item.createdAt)}</span>
        <h3>{item.title}</h3>
        <div className={style["sub-info"]}>
          <span>{item?.category.name || ""}</span>
          <Link href={"/blog/" + item.slug}>Okumaya Devam Et</Link>
        </div>
      </div>
    </div>
  );
};
