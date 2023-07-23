import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";

type RouteProviderType = {
  screensHidden: string[];
  hideHeaderFooter: boolean;
  handleRoute: (route: string) => void;
};

const RouteContext = createContext<null | RouteProviderType>(null);

function RouteProvider({ children }: { children: React.ReactNode }) {
  const screensHidden = [""];
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
