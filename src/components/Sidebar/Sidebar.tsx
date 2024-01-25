"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { HeaderAnimations } from "../HomePage/header/animation";
import toast from "react-hot-toast";
import { logout } from "@/lib/actions";
import { adminLinks } from "@/lib/constant/admin.sidebar";
import { Button } from "../ui/Button";
import style from "./Sidebar.module.scss";

interface SidebarLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, title, icon }) => (
  <Link href={href} className={style["sidebar-Link"]}>
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
    className={style["sidebar-Link"]}
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
      <div className={style["sidebar-wrapper"]}>
        <span>
          {adminLinks.map((item, i) => (
            <SidebarLink key={"admin" + i} {...item} />
          ))}
        </span>
        <Button onClick={handleLogout} variant="outline">
          <MdOutlineLogout size={24} />
          Logout
        </Button>
      </div>

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
            className={style["adminLink"]}
          >
            <span>
              {adminLinks.map((item, i) => (
                <MobileSidebarLink
                  key={i + "mobile"}
                  {...item}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </span>
            <Button onClick={handleLogout} variant="outline">
              <MdOutlineLogout size={24} />
              Logout
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
