"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "@types";
import { useActiveSection } from "./useActiveSection";

export const useSectionInView = (
  sectionName: SectionName,
  threshold = 0.75
) => {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSection();
  const [view, setView] = useState(false);

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setView(true);
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
    view,
  };
};
