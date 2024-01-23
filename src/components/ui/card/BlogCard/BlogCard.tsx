import Image from "next/image";
import Link from "next/link";
import style from "./Blog.module.scss";
import { FormatDate, Truncate } from "@/lib/utils";
import { CiCalendarDate } from "react-icons/ci";
export const BlogCard = (item: any) => {
  const truncatedDesc = Truncate(item.description, 250);

  return (
    <div key={item._id} className={style["wrapper"]}>
      <div className={style["img-wrapper"]}>
        <Image alt={item.title ?? item.name} fill src={item.image || ""} />
      </div>

      <div className={style["text-wrapper"]}>
        <span className={style["date"]}>
          <CiCalendarDate size={24} /> {FormatDate(item.createdAt)}
        </span>
        <h2>{item.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: truncatedDesc }}></p>
        <div className={style["sub-info"]}>
          <span>{item?.category.name || ""}</span>
          <Link href={"/blog/" + item.slug}>Okumaya Devam Et</Link>
        </div>
      </div>
    </div>
  );
};
