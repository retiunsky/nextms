import { createContext, useContext, useState } from "react";

const SortContext = createContext({});

export function SortProvider({ children }) {
  const [sortBy, setSort] = useState("Newest");
  return (
    <SortContext.Provider
      value={{ sortBy, setSort }}
    >
      {children}
    </SortContext.Provider>
  );
}

export function useSortContext() {
  return useContext(SortContext);
}