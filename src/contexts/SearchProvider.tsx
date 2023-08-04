import React, { createContext, useState } from "react";

type SearchProviderType = {
  searchField: string;
  handleSearchField: (search: string) => void;
};

const SearchContext = createContext<null | SearchProviderType>(null);

function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchField, setSearchField] = useState("");

  function handleSearchField(search: string) {
    setSearchField(search);
  }

  return (
    <SearchContext.Provider
      value={{
        searchField,
        handleSearchField,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
