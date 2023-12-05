"use client";

import React, { createContext, useMemo, useState } from "react";

export type ContextProps = {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveSectionContext = createContext<ContextProps | undefined>(
  undefined
);

export const ActiveSectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);
  const [activeSection, setActiveSection] = useState("Home");

  const contextValues = useMemo(() => {
    return {
      activeSection,
      setActiveSection, // setActiveSection'ı burada aynı bırakabilirsiniz
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
