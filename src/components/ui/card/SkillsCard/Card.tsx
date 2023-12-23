import React, { Dispatch, FC, SetStateAction } from "react";
import { SkillsDTO } from "@types";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import { Button } from "../../Button";

interface CardProps {
  skills: SkillsDTO[];
  setSelectedId: Dispatch<SetStateAction<string>>;
  setOperation: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SkillCard: FC<CardProps> = ({
  skills,
  setSelectedId,
  setOperation,
  setOpen,
}) => {
  return (
    <div className="text-black px-4  mx-auto scroll-mt-28 text-center">
      <ul className="ul-container ">
        {skills.map((skill, index) => (
          <li key={index + "skills" + skill._id}>
            <div
              className="h-full flex py-4 flex-col justify-between mx-auto pt-8 rounded shadow-xl"
              style={{ backgroundColor: skill.bgColor }}
            >
              <h2
                className="text-white font-semibold text-xl py-2 mx-8 rounded-md"
                style={{
                  backgroundColor: skill.itemColor,
                }}
              >
                {skill.title}
              </h2>
              <Image
                className="mx-auto py-8"
                alt={skill.title}
                src={skill.image || ""}
                width={200}
                height={200}
              ></Image>
              <ul className="flex gap-4 px-4 items-center justify-center mx-auto text-center flex-wrap">
                {skill.items.map((item, itemIndex) => (
                  <li
                    className="text-white px-4 rounded-md py-1"
                    key={itemIndex + "item"}
                    style={{ backgroundColor: skill.itemColor }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button
                  onClick={() => {
                    setOperation("edit");
                    setSelectedId(skill._id || "");
                    scrollTo(0, 0);
                    setOpen(true);
                  }}
                  className="bg-green-500 text-white shadow-md rounded p-2"
                >
                  <FaRegEdit fontSize={20} />
                </Button>
                <Button
                  onClick={() => {
                    setSelectedId(skill._id || "");
                    setOperation("del");
                    scrollTo(0, 0);
                    setOpen(true);
                  }}
                  className="bg-red-600 text-white p-2 rounded shadow-md"
                >
                  <MdDelete fontSize={20} />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
