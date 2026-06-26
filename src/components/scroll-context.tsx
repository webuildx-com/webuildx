"use client";

import type Lenis from "lenis";
import { createContext, useContext } from "react";

export const LenisContext = createContext<Lenis | null>(null);
export const HeaderVisibilityContext = createContext(true);

export function useLenis() {
  return useContext(LenisContext);
}

export function useHeaderVisibility() {
  return useContext(HeaderVisibilityContext);
}
