import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { BsClock, BsEye } from "react-icons/bs";
import styles from "./blog.module.scss";
import { BlogDTO } from "@/lib/Types";
import { Share } from "@/components/Share";
import { FormatDate } from "@/lib/Utils";
import { callApi } from "@/lib/Actions/__api.actions";
import { ReadMin } from "@/lib/Utils/read.minute";

export const ClientSingleBlogPage = ({
  selectedBlog,
  otherBlogs,
}: {
  selectedBlog: BlogDTO;
  otherBlogs: any[];
}) => {
  (async function updateViewCount() {
    const payload = {
      viewCount: (selectedBlog?.viewCount as number) + 1,
    };
    const res = await callApi({
      method: "put",
      path: `/blog/${selectedBlog._id}`,
      payload: payload,
    });

    revalidatePath(`/blog/${selectedBlog._id}`);
    revalidatePath("/");
  })();

  return (
    <div className={styles.clampSizeContainer}>
      <div className={styles.innerContainer}>
        <h1 className={styles.blogHeader}>
          {selectedBlog?.title}
          <span className={styles.clockIcon}>
            <BsClock />
            {ReadMin(selectedBlog.description)} Dakikalık Okuma <BsEye />
            {selectedBlog.viewCount}
          </span>
        </h1>

        <div className={styles.gridContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.headerContainer}>
              <Link href="/blog" className={styles.goBackLink}>
                <RiArrowGoBackFill className={styles.arrowIcon} />
              </Link>
              <h2 className={styles.pageTitle}>{selectedBlog?.title}</h2>
            </div>

            <Image
              loading="lazy"
              alt={"blog"}
              width={800}
              height={300}
              src={selectedBlog?.image || ""}
              className={styles.blogImage}
            />

            <div
              className={styles.htmlContainer}
              dangerouslySetInnerHTML={{
                __html: selectedBlog?.description || "",
              }}
            ></div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.otherBlogsContainer}>
              <h2 className={styles.otherBlogsHeader}>Diğer Bloglar</h2>
              <ul className={styles.otherBlogsList}>
                {otherBlogs.map((otherBlog) => (
                  <li key={otherBlog.slug} className={styles.otherBlogItem}>
                    <Link
                      className={styles.blogLink}
                      href={`/blog/${otherBlog.slug}`}
                    >
                      <Image
                        className={styles.blogImage}
                        alt="im"
                        width={90}
                        height={90}
                        src={otherBlog.image}
                      ></Image>
                      <div className={styles.blogDetails}>
                        <span className={styles.blogTitle}>
                          {otherBlog?.title}
                        </span>
                        <div className={styles.blogMeta}>
                          <span className={styles.readTime}>
                            {ReadMin(otherBlog.description)} dakika okuma
                          </span>
                          <span className={styles.dotSeparator}></span>
                          <span className={styles.lightBlueText}>
                            {FormatDate(otherBlog.createdAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Share blog={selectedBlog} />
          </div>
        </div>
      </div>
    </div>
  );
};
