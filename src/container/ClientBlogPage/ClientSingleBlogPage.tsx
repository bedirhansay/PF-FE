import React from "react";

import { RiArrowGoBackFill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { BsClock } from "react-icons/bs";
import { Share } from "@components";
import styles from "./blog.module.scss";
import { FormatDate } from "../../lib/utils/format.date";
import { callApi } from "../../lib/actions/__api.actions";
import { BlogDTO } from "../../lib/types/types";
import { revalidatePath } from "next/cache";

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
    await callApi({
      method: "patch",
      path: `/blog/${selectedBlog._id}`,
      payload: payload,
    });
    revalidatePath("/#blog");
  })();

  return (
    <div className={styles.clampSizeContainer}>
      <div className={styles.innerContainer}>
        <h1 className={styles.blogHeader}>
          {selectedBlog?.title}
          <span className={styles.clockIcon}>
            <BsClock />2 min read
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
                          <span className={styles.readTime}>5 min read</span>
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
