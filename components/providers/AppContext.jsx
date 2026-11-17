"use client";
import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);
const ReadyContext = createContext(false);

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false); // loader finished sliding
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ ready, setReady, menuOpen, setMenuOpen }), [ready, menuOpen]);
  return (
    <AppContext.Provider value={value}>
      <ReadyContext.Provider value={ready}>{children}</ReadyContext.Provider>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
/** Cheap subscription: re-renders only when the loader finishes (not on menu open/close). */
export const useReady = () => useContext(ReadyContext);