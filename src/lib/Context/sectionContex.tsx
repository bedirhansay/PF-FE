"use client";

import { ContextProps } from "@/lib/types";
import React, { createContext, useMemo, useState } from "react";

export const ActiveSectionContext = createContext<ContextProps | undefined>(
  undefined
);

export const ActiveSectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);
  const [activeSection, setActiveSection] = useState("Anasayfa");

  const contextValues = useMemo(() => {
    return {
      activeSection,
      setActiveSection,
      timeOfLastClick,
      setTimeOfLastClick,
    };
  }, [activeSection, timeOfLastClick]);

  return (
    <ActiveSectionContext.Provider value={contextValues}>
      {children}
    </ActiveSectionContext.Provider>
  );
};
