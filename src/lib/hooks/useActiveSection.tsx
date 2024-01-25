import { ContextProps } from "@/lib/Types";
import { useContext } from "react";
import { ActiveSectionContext } from "../Context";

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error("Use Active SectionContext must be in prvider");
  }
  return context as ContextProps;
};
