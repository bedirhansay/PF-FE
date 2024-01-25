"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { SkillsDTO } from "@/lib/types";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import { Button } from "../../Button";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="text-black px-4  mx-auto scroll-mt-28 text-center">
      <ul className="gridMinMax ">
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
                sizes="(max-width: 768px) 100vw, 33vw"
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
                  leftIcon={() => <FaRegEdit color="white" fontSize={20} />}
                  variant="secondary"
                  onClick={() => {
                    router.push(`${pathname}/${skill._id}`);
                  }}
                ></Button>
                <Button
                  leftIcon={() => <MdDelete fontSize={20} />}
                  variant="delete"
                  onClick={() => {
                    setSelectedId(skill._id || "");
                    setOperation("del");
                    scrollTo(0, 0);
                    setOpen(true);
                  }}
                ></Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
