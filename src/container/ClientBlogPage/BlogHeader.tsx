import React, { FC, useCallback, useEffect, useState } from "react";

import { IoFilterSharp } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { QueryHandler } from "@/lib/utils/query.handler";
import { GrClose } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui";
import style from "./blog.module.scss";

interface FilterProps {
  categories: string[];
}

const filterBy = [
  {
    title: "Tarih Artan",
    label: "tarih-artan",
  },
  {
    title: "Tarih Azalan",
    label: "tarih-azalan",
  },
  {
    title: "Popüler Artan",
    label: "populer-artan",
  },
  {
    title: "Popüler Azalan",
    label: "populer-azalan",
  },
];

export const BlogHeader: FC<FilterProps> = ({ categories }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string | null>("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [sortList, setSortList] = useState<string | null>();

  const queryHandler = () => {
    return searchParams
      ? qs.parse(searchParams.toString(), { arrayFormat: "comma" })
      : {};
  };

  useEffect(() => {
    const query = queryHandler();

    if (query.search) {
      setValue(query.search as string);
    }

    if (query.sortBy) {
      setSortList(query.sortBy as string);
    }
  }, [searchParams]);

  const onSortHandler = useCallback(
    (e: string) => {
      const currentQuery: any = queryHandler();

      const updatedQuery: any = {
        ...currentQuery,
        sortBy: e,
      };

      if (searchParams?.get("sortBy") === e) {
        delete updatedQuery.sortBy;
        setSortList(null);
      } else {
        setSortList(e);
      }

      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: updatedQuery,
        },
        { skipNull: true, arrayFormat: "comma" }
      );

      router.push(url);
    },
    [searchParams, setSortList, pathname, router]
  );

  const onSearch = (e: string) => {
    setValue(e);
    const currentQuery: any = queryHandler();

    const updatedQuery: any = {
      ...currentQuery,
      search: e,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true, arrayFormat: "comma" }
    );

    router.push(url);
  };

  const mobileHandler = () => {
    setShowModal(!open);
    setTimeout(() => {
      setOpen(!open);
    }, 300);
  };

  return (
    <div className={style["filter-wrapper"]}>
      <div
        data-open={open}
        data-showmodal={showModal}
        className={cn(style["filterArea"])}
      >
        <div className={style["search"]}>
          <h2>Makale Ara</h2>
          <Input
            value={value as string}
            placeholder={value ? value : "Blog Ara"}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className={style["sortby"]}>
          <h2>Sırala</h2>

          <ul>
            {filterBy.map((category, index) => (
              <li
                data-active={sortList === category.label}
                onClick={() => onSortHandler(category.label)}
                key={`${category.label + index}`}
              >
                {category.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
