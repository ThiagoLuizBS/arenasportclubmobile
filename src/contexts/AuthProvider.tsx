import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";

type AuthProviderType = {
  authenticated: boolean;
  handleLogin: (token: string, id: string) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext<null | AuthProviderType>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem("@arena:token");
      const id = await AsyncStorage.getItem("@arena:idUser");
      if (token && id) {
        UserService.haveFavorites(JSON.parse(id))
          .then((response) => {
            if (response.status === 200) setAuthenticated(true);
          })
          .catch((response) => {
            if (response.response.status === 401) handleLogout();
          });
      }
    };
    verifyToken();
  }, []);

  async function handleLogin(token: string, id: string) {
    await AsyncStorage.setItem("@arena:token", JSON.stringify(token));
    await AsyncStorage.setItem("@arena:idUser", JSON.stringify(id));
    setAuthenticated(true);
  }

  async function handleLogout() {
    setAuthenticated(false);
    await AsyncStorage.removeItem("@arena:token");
    await AsyncStorage.removeItem("@arena:idUser");
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
