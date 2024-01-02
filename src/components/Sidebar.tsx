"use client";

import React, { useState } from "react";
import { adminLinks } from "@/lib/constant";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
import { Button } from "@/components/ui";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { HeaderAnimations } from "../container/HomePage/header/animation";
import { logout } from "@/lib/actions";
import toast from "react-hot-toast";

interface SidebarLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, title, icon }) => (
  <Link
    href={href}
    className="flex-between gap-2 mx-4 border-2 py-1 px-2 rounded-md bg-white  hover:bg-darkBlue hover:text-white transition duration-0 ease-out"
  >
    <span>{title}</span>
    <span>{icon}</span>
  </Link>
);

interface MobileSidebarLinkProps extends SidebarLinkProps {
  onClick: () => void;
}

const MobileSidebarLink: React.FC<MobileSidebarLinkProps> = ({
  href,
  title,
  icon,
  onClick,
}) => (
  <motion.a
    {...HeaderAnimations.liAnimation}
    variants={HeaderAnimations.fadeInAnimationVariants}
    onClick={onClick}
    href={href}
    className="flex-between gap-2 mx-4 border-2 py-1 px-2 rounded-md bg-white hover:bg-darkBlue hover:text-white transition duration-0 ease-out"
  >
    <span>{title}</span>
    <span>{icon}</span>
  </motion.a>
);

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const res = await logout();
    if (res?.kind) {
      toast.success("Başarıyla Çıkış yapıldı");
      window.location.href = "/auth/login";
    }
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-between py-6 flex-col h-screen bg-gray-200">
        <div className="flex gap-4 flex-col">
          {adminLinks.map((item, i) => (
            <SidebarLink key={"admin" + i} {...item} />
          ))}
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="flex tex-white items-center gap-2"
        >
          <MdOutlineLogout size={24} />
          Logout
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <div>
        <motion.button
          variants={HeaderAnimations.variant}
          animate={isOpen ? "open" : "closed"}
          className="fixed right-6 top-4"
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
            className="flex sm:hidden flex-between py-6 flex-col h-screen bg-gray-200"
          >
            <div className="flex gap-4 flex-col">
              {adminLinks.map((item, i) => (
                <MobileSidebarLink
                  key={i + "mobile"}
                  {...item}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
            <Button
              onClick={handleLogout}
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
