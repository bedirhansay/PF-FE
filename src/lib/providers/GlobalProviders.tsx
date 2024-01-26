import React, { ReactNode } from "react";

import NextTopLoader from "nextjs-toploader";
import { ThemesProvider } from "./ThemesProvider";
import { ActiveSectionProvider } from "./ActiveSectionProvider";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ActiveSectionProvider>
        <NextTopLoader crawlSpeed={30} speed={50} showSpinner={false} />
        {children}
      </ActiveSectionProvider>
    </ThemesProvider>
  );
};