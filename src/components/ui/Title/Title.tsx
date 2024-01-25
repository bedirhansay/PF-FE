import React from "react";
import style from "./heading.module.scss";

export const Title = ({ link, title }: { link?: string; title: string }) => {
  return (
    <div className={style["heading-wrapper"]}>
      <strong>{title}</strong>
    </div>
  );
};
