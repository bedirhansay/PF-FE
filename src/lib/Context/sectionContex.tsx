"use client";

import { ContextProps } from "@/lib/types";
import React, { createContext, useMemo, useState } from "react";

export const ActiveSectionContext = createContext<ContextProps | undefined>(
  undefined
);

