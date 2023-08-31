import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";
import i18n from "../languages/I18n";

type AuthProviderType = {
  authenticated: boolean;
  handleLogin: (
    token: string,
    id: string,
    nameUser: string,
    email: string
  ) => Promise<void>;
  handleLogout: () => void;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<null | AuthProviderType>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem("@arena:token");
      const id = await AsyncStorage.getItem("@arena:idUser");
      if (token && id) {
        UserService.haveFavorites(JSON.parse(id))
          .then((response) => {
            if (response.status === 200) {
              setAuthenticated(true);
            }
          })
          .catch((response) => {
            if (response.response.status === 401) handleLogout();
          });
      }
    };
    verifyToken();
  }, []);

  useEffect(() => {
    const verifyLanguage = async () => {
      const lang = await AsyncStorage.getItem("@arena:language");
      if (lang && (JSON.parse(lang) === "pt" || JSON.parse(lang) === "en"))
        setLanguage(JSON.parse(lang));
    };
    verifyLanguage();
  }, []);

  useEffect(() => {
    i18n.locale = language;
    const changeLanguage = async () => {
      await AsyncStorage.setItem("@arena:language", JSON.stringify(language));
    };
    changeLanguage();
  }, [language]);

  async function handleLogin(
    token: string,
    id: string,
    nameUser: string,
    email: string
  ) {
    await AsyncStorage.setItem("@arena:token", JSON.stringify(token));
    await AsyncStorage.setItem("@arena:idUser", JSON.stringify(id));
    await AsyncStorage.setItem("@arena:nameUser", JSON.stringify(nameUser));
    await AsyncStorage.setItem("@arena:emailUser", JSON.stringify(email));
    setAuthenticated(true);
  }

  async function handleLogout() {
    setAuthenticated(false);
    await AsyncStorage.removeItem("@arena:token");
    await AsyncStorage.removeItem("@arena:idUser");
    await AsyncStorage.removeItem("@arena:nameUser");
    await AsyncStorage.removeItem("@arena:emailUser");
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        handleLogin,
        handleLogout,
        language,
        setLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
