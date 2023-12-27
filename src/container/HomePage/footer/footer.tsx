"use client";
import { NavLinks } from "@constant";
import { useActiveSection } from "@hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();
  return (
    <footer className="bg-white rounded shadow dark:bg-gray-900 max-w-7xl p-10 mx-auto">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              BS
            </span>
          </a>
          <ul className="flex flex-wrap items-center gap-4 mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {NavLinks.map((link, i) => (
              <li
                key={"navLink" + link.hash}
                data-active={link.name === activeSection}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                <Link href={link.hash}>
                  {link.name}

                  {link.name === activeSection && (
                    <motion.span layoutId="activeSection"></motion.span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="" className="hover:underline">
            Bedirhan Say
          </a>
          . Tüm Hakları Saklıdır.
        </span>
      </div>
    </footer>
  );
};
