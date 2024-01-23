import { ContextProps } from "@/lib/types";
import { useContext } from "react";
import { ActiveSectionContext } from "../contex";

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error("Use Active SectionContext must be in prvider");
  }
  return context as ContextProps;
};
