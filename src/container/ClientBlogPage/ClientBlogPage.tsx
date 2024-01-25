"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./blog.module.scss";
import { Pagination } from "@/components/Pagination";
import { BlogPageDTO } from "@/lib/types";
import { Filter } from "@/components/Filter/Filter";
import { BlogCard } from "@/components/ui/card/BlogCard/BlogCard";
import qs from "query-string";
import { useFetch } from "@/lib/hooks/useFetch";
import { MainBlogCard } from "@/components/ui/card/BlogCard/MainBlogCard";
import Image from "next/image";
import logo from "../../../public/favicon-300.png";
import { ReadMin } from "@/lib/utils/read.minute";
import { FormatDate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { BlogHeader } from "./BlogHeader";
import { QueryHandler } from "@/lib/utils/query.handler";

export const ClientBlogPage = ({ blogs }: { blogs: BlogPageDTO }) => {
  const [blogsItems, setBlogsItems] = useState<BlogPageDTO>(blogs);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const queryHandler = () => {
    return searchParams
      ? qs.parse(searchParams.toString(), { arrayFormat: "comma" })
      : {};
  };

  const url = qs.stringifyUrl(
    { url: "/blog", query: queryHandler() },
    { skipNull: true, skipEmptyString: true, arrayFormat: "comma" }
  );
  useEffect(() => {
    const query = queryHandler();
    let filterCategory: string[] = Array.isArray(query.categories)
      ? query.categories.filter(
          (item): item is string => typeof item === "string"
        )
      : query.categories
      ? [query.categories].filter(
          (item): item is string => typeof item === "string"
        )
      : [];

    setSelectedCategory(() => [...filterCategory]);
  }, [searchParams]);

  const { data, loading } = useFetch({
    path: url,
    method: "get",
  });

  const [featuredBlog, otherBlogs, otherBlogsSorted, categories] =
    useMemo(() => {
      const featuredBlog = blogsItems.blogs[0];

      const otherBlogs = blogsItems.blogs.filter(
        (item) => item._id !== featuredBlog._id
      );

      const otherBlogsSorted = otherBlogs.toSorted((a, b) => {
        if (b.viewCount === undefined || a.viewCount === undefined) {
          return 0;
        }

        if (b.viewCount === a.viewCount) {
          return a.title.localeCompare(b.title);
        }
        return b.viewCount - a.viewCount;
      });

      const categories = [
        ...new Set(blogsItems.blogs.map((item) => item.category.name)),
      ];

      return [featuredBlog, otherBlogs, otherBlogsSorted, categories];
    }, [blogsItems.blogs]);

  const onCategoryFilterClick = (e: string) => {
    const currentQuery: any = queryHandler();

    let categoryList: string[] = Array.isArray(currentQuery.categories)
      ? [...currentQuery.categories]
      : currentQuery.categories
      ? [currentQuery.categories]
      : [];

    if (categoryList.includes(e)) {
      console.log("Çıkarılacak Filtre", e);
      console.log("Eski Filtre Listesi", categoryList);

      const updatedCategories = categoryList.filter((item) => item !== e);
      categoryList = [...updatedCategories];
      console.log("Çıkarıldı", categoryList);
    } else {
      categoryList.push(e);
      console.log("Yeni Filtre Eklendi", categoryList);
    }

    setSelectedCategory(() => [...categoryList]);

    const updatedQuery: any = {
      ...currentQuery,
      categories: [...categoryList],
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true, arrayFormat: "comma" }
    );

    router.push(url);
  };

  return (
    <div className={style["clientBlogWrapper"]}>
      <div className={style["heading-section"]}>
        <BlogHeader categories={categories} />
      </div>

      <div className="max-w-7xl mx-auto p-2">
        <div className={style["blogs-wrapper"]}>
          <div className={style["sortBy"]}>
            {/* <Filter categories={categories} /> */}
          </div>

          <div className={style["content-wrapper"]}>
            <div className={style["blogs"]}>
              <div className={style["latestBlog"]}>
                <MainBlogCard {...featuredBlog} />
              </div>
              <div className={style["otherBlogs"]}>
                {otherBlogs?.map((item) => (
                  <BlogCard key={item._id} {...item} />
                ))}
              </div>
            </div>
            <div className={style["otherBlogs"]}>
              <div className={style["richText"]}>
                <h2>
                  <Image alt="logo" width={40} src={logo}></Image>
                </h2>
                <p>
                  &#34; Eğitim, zihinleri değiştirir, dünyayı değiştirir ve en
                  önemlisi bireyin kendisini değiştirir. &#34;
                  <br />
                  <p>Malcom X.</p>
                </p>
              </div>

              <hr className="my-4" />

              <div className={style["most-popular"]}>
                <h2>En çok Okunanlar</h2>
                <div className={style["otherBlogsList"]}>
                  {otherBlogsSorted.map((otherBlog) => (
                    <div key={otherBlog.slug} className={style.otherBlogItem}>
                      <Link
                        className={style.blogLink}
                        href={`/blog/${otherBlog.slug}`}
                      >
                        <Image
                          className={style.blogImage}
                          alt="im"
                          width={90}
                          height={90}
                          src={otherBlog.image || ""}
                        ></Image>
                        <div className={style.blogDetails}>
                          <span className={style.blogTitle}>
                            {otherBlog?.title}
                          </span>
                          <div className={style.blogMeta}>
                            <span className={style.readTime}>
                              {ReadMin(otherBlog.description)} dakika okuma
                            </span>
                            <span className={style.dotSeparator}></span>
                            <span className={style.lightBlueText}>
                              {FormatDate(otherBlog.createdAt)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              <div className={style["filter-wrapper"]}>
                <h2>Kategorileri Filtrele</h2>
                <div className={style["filter-category"]}>
                  {categories.map((category, index) => (
                    <Checkbox
                      key={category + index}
                      label={category}
                      isSelected={selectedCategory.includes(
                        QueryHandler(category)
                      )}
                      value={QueryHandler(category)}
                      onClickHandler={onCategoryFilterClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //! Pagination */}

        <Pagination
          currentPage={blogsItems.currentPage}
          totalPage={blogsItems.totalPages}
        />
      </div>
    </div>
  );
};
