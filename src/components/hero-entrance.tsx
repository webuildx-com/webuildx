"use client";

import { createContext, useContext, useEffect, useState } from "react";

type HeroEntranceContextValue = {
  entered: boolean;
};

const HeroEntranceContext = createContext<HeroEntranceContextValue>({
  entered: false,
});

export function HeroEntranceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 320);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <HeroEntranceContext.Provider value={{ entered }}>
      {children}
    </HeroEntranceContext.Provider>
  );
}

export function useHeroEntrance() {
  return useContext(HeroEntranceContext);
}
