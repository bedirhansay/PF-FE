import React from "react";
import style from "./Loader.module.scss";
import { cn } from "@/lib/utils";

export const Loader = () => {
  return <div className={cn(style["loader"], "absolute-center")}></div>;
};
