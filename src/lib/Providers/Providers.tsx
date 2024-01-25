import React, { ReactNode } from "react";

import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "./ThemeProvider";
import { ActiveSectionProvider } from "../context/sectionContex";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ActiveSectionProvider>
        <NextTopLoader crawlSpeed={30} speed={50} showSpinner={false} />
        {children}
      </ActiveSectionProvider>
    </ThemeProvider>
  );
};
