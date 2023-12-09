import React from "react";
import style from "./heading.module.scss";
import Link from "next/link";
export const Heading = ({ link, title }: { link: string; title: string }) => {
  return (
    <div className={style["heading-wrapper"]}>
      <strong>{title}</strong>
    </div>
  );
};
