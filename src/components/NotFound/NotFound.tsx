"use client";
import style from "./NotFound.module.scss";
export const NotFound = () => {
  return (
    <div className={style["NotFoundWrapper"]}>
      <div className={style["NotFoundWrapper-sub"]}>
        <h2>Aradığınız Sayfa Mevcut Değil</h2>
        <br />
        <a href="/">Anasayfaya dön</a>
      </div>
    </div>
  );
};
