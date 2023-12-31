"use client";

import React from "react";
import placeholder from "../../../public/image-placeholder-dark.png";
import Image from "next/image";

export const BlogCardSkeleton = () => {
  return (
    <div className="bg-gray-900 flex flex-col sm:flex sm:flex-row gap-4 p-4  w-full sm:w-[600px] rounded shadow-lg  h-full">
      {/* //! İmage */}
      <div className="skeleton aspect-square  h-full sm:h-56 sm:w-56 rounded-md">
        <Image
          alt="place-holder"
          src={placeholder}
          className="animate-pulse  w-full rounded h-44  sm:h-56 sm:w-56  "
        ></Image>
      </div>

      {/* //! Text  */}
      <div className="flex flex-col w-full justify-between skeleton pt-4 pb-4">
        <div className="flex justify-between items-center">
          <div className="animate-pulse skeleton w-20 h-4 bg-gray-600 rounded"></div>
          <div className="animate-pulse w-20 h-4 bg-gray-600 rounded"></div>
        </div>
        <span className="animate-pulse mt-4 mb-4 w-full h-8 bg-gray-600 rounded"></span>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <div className=" animate-pulse rounded-md skeleton w-10 h-10 bg-gray-600"></div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold skeleton rounded w-20 h-2 bg-gray-600"></span>
              <span className="text-xs rounded animate-pulse w-20 h-2 bg-gray-600"></span>
            </div>
          </div>
          <div className="text-xs animate-pulse px-2 py-2 rounded underline flex items-center gap-2 skeleton w-16 h-6 bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
};
