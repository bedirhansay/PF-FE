"use client";

import { useMemo, useState } from "react";
import { ActiveSectionContext } from "../context/sectionContex";

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
