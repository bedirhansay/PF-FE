import React, { FC, useCallback, useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { IoFilterSharp } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { QueryHandler } from "@/lib/utils/query.handler";
import { useDebounce } from "@/lib/hooks/useDebounce";
import style from "./Filter.module.scss";
import { GrClose } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { CheckboxInput } from "../ui";

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

export const Filter: FC<FilterProps> = ({ categories }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string | null>("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const debouncedValue = useDebounce<string | null>(value, 500);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortList, setSortList] = useState<string | null>(
    searchParams.get("sortBy")
  );

  const queryHandler = () => {
    return searchParams
      ? qs.parse(searchParams.toString(), { arrayFormat: "comma" })
      : {};
  };

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
    if (query.search) {
      setValue(query.search as string);
    }
  }, [searchParams]);

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
      <div className={style["filterHeader"]}>
        <h2>Filtreler</h2>
        <span className="md:hidden" onClick={() => mobileHandler()}>
          {open ? <GrClose /> : <IoFilterSharp />}
        </span>
        <span className="hidden md:flex">
          <IoFilterSharp />
        </span>
      </div>
      <div
        data-open={open}
        data-showmodal={showModal}
        className={cn(style["filterArea"])}
      >
        <div className="relative ">
          <Input
            value={value as string}
            placeholder={value ? value : "Blog Ara"}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <span>Sırala</span>
          <hr className="mb-2" />
          {filterBy.map((category, index) => (
            <CheckboxInput
              key={category.label + index}
              label={category.title}
              isSelected={category.label === sortList}
              value={QueryHandler(category.label)}
              onClickHandler={onSortHandler}
            />
          ))}
        </div>

        <div>
          <h2 className="mb-2">Kategoriler</h2>
          <hr className="mb-2" />
          <div className={style["categoryFilter"]}>
            {categories.map((category, index) => (
              <CheckboxInput
                key={category + index}
                label={category}
                isSelected={selectedCategory.includes(QueryHandler(category))}
                value={QueryHandler(category)}
                onClickHandler={onCategoryFilterClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
