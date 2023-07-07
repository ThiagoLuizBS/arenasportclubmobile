import React, { createContext, useEffect, useState } from "react";
import UserService from "../services/user";

type AuthProviderType = {
  authenticated: boolean;
  handleLogin: (token: string, id: string) => Promise<void>;
  handleLogout: () => void;
};

const Context = createContext<null | AuthProviderType>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // const id = localStorage.getItem("idUser");
    // if (token && id) {
    //   UserService.haveFavorites(JSON.parse(id))
    //     .then((response) => {
    //       if (response.status === 200) setAuthenticated(true);
    //     })
    //     .catch((response) => {
    //       if (response.response.status === 401) handleLogout();
    //     });
    // }
  }, []);

  async function handleLogin(token: string, id: string) {
    // localStorage.setItem("idUser", JSON.stringify(id));
    // localStorage.setItem("token", JSON.stringify(token));
    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);
    // localStorage.removeItem("idUser");
    // localStorage.removeItem("token");
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
