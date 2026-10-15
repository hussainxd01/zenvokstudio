"use client";
import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false); // loader finished sliding
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(
    () => ({ ready, setReady, menuOpen, setMenuOpen }),
    [ready, menuOpen],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
