import Image from "next/image";
import React from "react";
import placeholder from "../../../public/image-placeholder.png";
export const SkillCardSkeleton = () => {
  return (
    <div className="h-full flex py-4 flex-col justify-between mx-auto pt-8 rounded shadow-xl">
      <h2 className=" font-semibold text-xl py-2 mx-8 rounded-md">
        <span className="animate-pulse bg-gray-300 mx-auto rounded h-6 w-2/3 block"></span>
      </h2>

      <div className="mx-auto py-8">
        <Image
          alt="place-holder"
          src={placeholder}
          className="animate-pulse bg-gray-300 h-40 w-40 block rounded-md"
        ></Image>
      </div>

      <ul className="flex px-4 items-center justify-center mx-auto text-center flex-wrap">
        {[1, 2, 3, 4, 5].map((itemIndex) => (
          <li
            className=" bg-gray-100 px-4 rounded-lg py-1"
            key={itemIndex + "item"}
          >
            <span className="animate-pulse bg-gray-300 h-6 w-16 block"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};
