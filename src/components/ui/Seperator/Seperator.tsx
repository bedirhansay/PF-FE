"use client";

import React from "react";
import style from "./divider.module.scss";

import { motion } from "@/lib/motion/motion";
import { dividerAnimations } from "./animations";

export const Seperator = ({ line }: { line?: boolean }) => {
  return (
    <motion.div className={style["divider-roll"]} {...dividerAnimations}>
      {line ? (
        <div className={style["divider-line"]}>
          <span className={style["line"]}></span>
        </div>
      ) : (
        <div className={style["divider"]}>
          <span className={style["roll"]}></span>
        </div>
      )}
    </motion.div>
  );
};
