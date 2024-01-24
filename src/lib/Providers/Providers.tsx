"use client";

import React, { ReactNode } from "react";
import { ActiveSectionProvider } from "../contex";
import NextTopLoader from "nextjs-toploader";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ActiveSectionProvider>
      <NextTopLoader crawlSpeed={30} speed={50} showSpinner={false} />
      {children}
    </ActiveSectionProvider>
  );
};
