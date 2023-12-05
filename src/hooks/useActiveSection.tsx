import { ActiveSectionContext, ContextProps } from "@/lib";
import { useContext } from "react";

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error("Use Active SectionContext must be in prvider");
  }
  return context as ContextProps;
};
