import React from "react";
import { adminLinks } from "@constant";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
import { Button } from "@components/ui";
export const Sidebar = () => {
  return (
    <div className="flex-between py-6 flex-col h-screen bg-gray-200 ">
      <div className="flex gap-4 flex-col ">
        {adminLinks.map((item, i) => (
          <Link
            href={item.href}
            className=" flex-between gap-2 mx-4 border-2 py-1 px-2 rounded-md bg-white  hover:bg-darkBlue hover:text-white transition duration-0 ease-out"
            key={"admin" + i}
          >
            <span>{item.title}</span>
            <span>{item.icon}</span>
          </Link>
        ))}
      </div>
      <Button variant="outline" className="flex tex-white items-center gap-2">
        <MdOutlineLogout size={24} />
        Logout
      </Button>
    </div>
  );
};
