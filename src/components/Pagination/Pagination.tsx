import Link from "next/link";
import React from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import style from "./Pagination.module.scss";

export const Pagination = ({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  return (
    <div className={style["pagination-wrapper"]}>
      {isFirstPage ? (
        <CiCircleChevLeft
          className={style["arrow"]}
          data-active={isFirstPage}
          fontSize={32}
        />
      ) : (
        <Link
          passHref={isFirstPage}
          href={{
            pathname: "blog",
            query: { page: currentPage - 1 },
          }}
        >
          <CiCircleChevLeft
            data-active={isFirstPage}
            className={style["arrow"]}
            fontSize={32}
          />
        </Link>
      )}

      {Array(totalPage)
        .fill(new Number())
        .map((_, index) => {
          const pageNumber = index + 1;

          return (
            <Link
              className={style["currentPage"]}
              data-number={pageNumber === +currentPage}
              key={pageNumber + "page"}
              href={{
                pathname: "blog",
                query: { page: pageNumber },
              }}
            >
              {pageNumber}
            </Link>
          );
        })}

      {isLastPage ? (
        <CiCircleChevRight
          className={style["arrow"]}
          data-active={isLastPage}
          fontSize={32}
        />
      ) : (
        <Link
          href={{
            pathname: "blog",
            query: { page: currentPage + 1 },
          }}
          passHref={isLastPage}
        >
          <CiCircleChevRight
            className={style["arrow"]}
            data-active={isLastPage}
            fontSize={32}
          />
        </Link>
      )}
    </div>
  );
};
