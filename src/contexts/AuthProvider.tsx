import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";

type AuthProviderType = {
  authenticated: boolean;
  handleLogin: (token: string, id: string, nameUser: string) => Promise<void>;
  handleLogout: () => void;
  favoritesTeams: teamFavorite[];
  setFavoritesTeams: React.Dispatch<React.SetStateAction<teamFavorite[]>>;
  favoritesChampionships: championshipFavorite[];
  setFavoritesChampionships: React.Dispatch<
    React.SetStateAction<championshipFavorite[]>
  >;
};

const AuthContext = createContext<null | AuthProviderType>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [favoritesTeams, setFavoritesTeams] = useState<teamFavorite[]>([
    { img: ".", name: ".", idTeam: "" },
  ]);
  const [favoritesChampionships, setFavoritesChampionships] = useState<
    championshipFavorite[]
  >([{ name: ".", img: ".", imgChampionship: ".", idChampionship: "" }]);

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
    const getFavorites = async () => {
      const id = await AsyncStorage.getItem("@arena:idUser");
      if (authenticated && id) {
        UserService.getFavorites(JSON.parse(id)).then((response) => {
          setFavoritesTeams(response.data.teams);
          setFavoritesChampionships(response.data.championships);
        });
      } else {
        const teams = await AsyncStorage.getItem("@arena:favoritesTeams");
        if (teams) setFavoritesTeams(JSON.parse(teams));
        const championships = await AsyncStorage.getItem(
          "@arena:favoritesChampionships"
        );
        if (championships) setFavoritesChampionships(JSON.parse(championships));
      }
    };
    getFavorites();
  }, [authenticated]);

  useEffect(() => {
    const setFavoritesTeams = async () => {
      const id = await AsyncStorage.getItem("@arena:idUser");
      if (
        authenticated &&
        id &&
        favoritesTeams[0]?.name !== "." &&
        favoritesChampionships[0]?.name !== "."
      ) {
        UserService.setFavorites(
          JSON.parse(id),
          favoritesTeams,
          favoritesChampionships
        );
      }
      await AsyncStorage.setItem(
        "@arena:favoritesTeams",
        JSON.stringify(favoritesTeams)
      );
    };
    setFavoritesTeams();
  }, [favoritesTeams]);

  useEffect(() => {
    const setFavoritesChampionships = async () => {
      const id = await AsyncStorage.getItem("@arena:idUser");
      if (
        authenticated &&
        id &&
        favoritesTeams[0]?.name !== "." &&
        favoritesChampionships[0]?.name !== "."
      ) {
        UserService.setFavorites(
          JSON.parse(id),
          favoritesTeams,
          favoritesChampionships
        );
      }
      await AsyncStorage.setItem(
        "@arena:favoritesChampionships",
        JSON.stringify(favoritesChampionships)
      );
    };
    setFavoritesChampionships();
  }, [favoritesChampionships]);

  async function handleLogin(token: string, id: string, nameUser: string) {
    await AsyncStorage.setItem("@arena:token", JSON.stringify(token));
    await AsyncStorage.setItem("@arena:idUser", JSON.stringify(id));
    await AsyncStorage.setItem("@arena:nameUser", JSON.stringify(nameUser));
    setAuthenticated(true);
  }

  async function handleLogout() {
    setAuthenticated(false);
    await AsyncStorage.removeItem("@arena:token");
    await AsyncStorage.removeItem("@arena:idUser");
    await AsyncStorage.removeItem("@arena:nameUser");
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        handleLogin,
        handleLogout,
        favoritesTeams,
        setFavoritesTeams,
        favoritesChampionships,
        setFavoritesChampionships,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
