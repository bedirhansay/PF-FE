import React, { FC, useCallback, useEffect, useState } from "react";

import { IoFilterSharp } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { QueryHandler } from "@/lib/Utils/query.handler";
import { GrClose } from "react-icons/gr";
import { cn } from "@/lib/Utils";
import { Button, Input } from "@/components/ui";
import style from "./blog.module.scss";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";

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
  const [inputOpen, setInputOpen] = useState(false);

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
      if (!e) {
        delete updatedQuery.sortBy;
      }

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
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl">
          Anasayfa
        </Link>
        <div className="flex gap-3 items-center">
          <Button
            onClick={() => setInputOpen(!inputOpen)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white flex gap-2 "
          >
            <BsSearch />
            Search
          </Button>
          <span>
            <div className={style["sortby"]}>
              <select
                onChange={(e) => onSortHandler(e.target.value)}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              >
                <option selected value="">
                  Sırala
                </option>
                {filterBy.map((category, index) => (
                  <option
                    selected={sortList === category.label}
                    value={category.label}
                    data-active={sortList === category.label}
                    key={`${category.label + index}`}
                  >
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </span>
        </div>
      </div>

      <div className="w-full">
        {inputOpen && (
          <div className="absolute  max-w-4xl mx-auto  shadow-md z-50  mt-4   py-8 left-0 right-0 p-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
            <h2>Ne Arıyorsunuz?</h2>

            <div className="">
              <Input
                className="flex-1 w-full"
                value={value as string}
                placeholder={value ? value : "Blog Ara"}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
