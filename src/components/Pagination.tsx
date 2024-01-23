import Link from "next/link";
import React from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

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
    <div className="flex justify-center  pt-10 mt-20 pb-10 max-w-7xl bg-white items-center mx-auto gap-4 self-end px-4 fillAvailable">
      {isFirstPage ? (
        <CiCircleChevLeft
          fontSize={32}
          style={{ cursor: isFirstPage ? "not-allowed" : "pointer" }}
          color={isFirstPage ? "#ccc" : "#000"}
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
            fontSize={32}
            style={{ cursor: isFirstPage ? "not-allowed" : "pointer" }}
            color={isFirstPage ? "#ccc" : "#000"}
          />
        </Link>
      )}

      {Array(totalPage)
        .fill(new Number())
        .map((_, index) => {
          const pageNumber = index + 1;

          return (
            <Link
              className={
                pageNumber === Number(currentPage)
                  ? "bg-gray-900 text-white rounded-md px-4 py-2"
                  : "text-black"
              }
              href={{
                pathname: "blog",
                query: { page: pageNumber },
              }}
              key={pageNumber + "page"}
            >
              {pageNumber}
            </Link>
          );
        })}

      {isLastPage ? (
        <CiCircleChevRight
          fontSize={32}
          style={{ cursor: isLastPage ? "not-allowed" : "pointer" }}
          color={isLastPage ? "#ccc" : "#000"}
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
            fontSize={32}
            style={{ cursor: isLastPage ? "not-allowed" : "pointer" }}
            color={isLastPage ? "#ccc" : "#000"}
          />
        </Link>
      )}
    </div>
  );
};
