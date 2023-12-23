"use client";

import React, { useState } from "react";
import { adminLinks } from "@constant";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
import { Button } from "@components/ui";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { HeaderAnimations } from "../header/animation";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className=" hidden sm:flex flex-between py-6 flex-col h-screen bg-gray-200 ">
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
      <div>
        <motion.button
          variants={HeaderAnimations.variant}
          animate={isOpen ? "open" : "closed"}
          className="fixed right-6 top-4 "
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? (
            <IoClose fontSize={24} />
          ) : (
            <RxHamburgerMenu fontSize={24} />
          )}
        </motion.button>
        {isOpen && (
          <motion.div
            variants={HeaderAnimations.variant}
            data-active={isOpen}
            animate={isOpen ? "open" : "closed"}
            className="flex sm:hidden flex-between py-6 flex-col h-screen bg-gray-200 "
          >
            <motion.div className="flex gap-4 flex-col ">
              {adminLinks.map((item, i) => (
                <motion.a
                  {...HeaderAnimations.liAnimation}
                  key={i + "mobile"}
                  variants={HeaderAnimations.fadeInAnimationVariants}
                  custom={i}
                  onClick={() => setIsOpen(false)}
                  href={item.href}
                  className="flex-between gap-2 mx-4 border-2 py-1 px-2 rounded-md bg-white  hover:bg-darkBlue hover:text-white transition duration-0 ease-out"
                >
                  <span>{item.title}</span>
                  <span>{item.icon}</span>
                </motion.a>
              ))}
            </motion.div>
            <Button
              variant="outline"
              className="flex tex-white items-center gap-2"
            >
              <MdOutlineLogout size={24} />
              Logout
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
