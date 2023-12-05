"use client";

import React from "react";
import style from "./divider.module.scss";
import { motion } from "framer-motion";
import { dividerAnimations } from "./animations";
motion;
export const Divider = ({ line }: { line?: boolean }) => {
  return (
    <motion.div {...dividerAnimations}>
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
