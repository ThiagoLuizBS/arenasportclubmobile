import React, { createContext, useState } from "react";

type RouteProviderType = {
  screensHidden: string[];
  hideHeaderFooter: boolean;
  handleRoute: (route: string) => void;
};

const RouteContext = createContext<null | RouteProviderType>(null);

function RouteProvider({ children }: { children: React.ReactNode }) {
  const screensHidden = ["SignIn", "SignUp"];
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);

  async function handleRoute(route: string) {
    if (screensHidden.includes(route)) setHideHeaderFooter(true);
    else setHideHeaderFooter(false);
  }

  return (
    <RouteContext.Provider
      value={{
        screensHidden,
        hideHeaderFooter,
        handleRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export { RouteContext, RouteProvider };
