"use client";

import { createContext, useContext } from "react";

type HeroEntranceContextValue = {
  entered: boolean;
};

const HeroEntranceContext = createContext<HeroEntranceContextValue>({
  entered: true,
});

export function HeroEntranceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeroEntranceContext.Provider value={{ entered: true }}>
      {children}
    </HeroEntranceContext.Provider>
  );
}

export function useHeroEntrance() {
  return useContext(HeroEntranceContext);
}
