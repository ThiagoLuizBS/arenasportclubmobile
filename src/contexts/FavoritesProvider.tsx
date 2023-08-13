import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";
import { AuthContext } from "./AuthProvider";

type FavoritesProviderType = {
  favoritesTeams: teamFavorite[];
  setFavoritesTeams: React.Dispatch<React.SetStateAction<teamFavorite[]>>;
  favoritesChampionships: championshipFavorite[];
  setFavoritesChampionships: React.Dispatch<
    React.SetStateAction<championshipFavorite[]>
  >;
  addFavoriteTeam: (team: teamFavorite | team) => void;
  removeFavoriteTeam: (team: teamFavorite | team) => void;
  isFavoriteTeam: (team: teamFavorite | team) => boolean;
  addFavoriteChamp: (championship: championshipFavorite) => void;
  removeFavoriteChamp: (championship: championshipFavorite) => void;
  isFavoriteChamp: (championship: championshipFavorite) => boolean;
};

const FavoritesContext = createContext<null | FavoritesProviderType>(null);

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);
  const [favoritesTeams, setFavoritesTeams] = useState<teamFavorite[]>([
    { img: ".", name: ".", idTeam: "" },
  ]);
  const [favoritesChampionships, setFavoritesChampionships] = useState<
    championshipFavorite[]
  >([{ name: ".", img: ".", imgChampionship: ".", idChampionship: "" }]);

  useEffect(() => {
    const getFavorites = async () => {
      const id = await AsyncStorage.getItem("@arena:idUser");
      if (authContext?.authenticated && id) {
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
  }, [authContext?.authenticated]);

  useEffect(() => {
    const setFavoritesTeams = async () => {
      const id = await AsyncStorage.getItem("@arena:idUser");
      if (
        authContext?.authenticated &&
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
        authContext?.authenticated &&
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

  const addFavoriteTeam = (team: teamFavorite | team) => {
    if (team) {
      let { idTeam, name, img } = team;
      setFavoritesTeams((favorite) => [...favorite, { idTeam, name, img }]);
    }
  };

  const removeFavoriteTeam = (team: teamFavorite | team) => {
    if (team)
      setFavoritesTeams(
        favoritesTeams.filter(
          (favoriteTeam) => team.idTeam !== favoriteTeam.idTeam
        )
      );
  };

  const isFavoriteTeam = (team: teamFavorite | team) =>
    favoritesTeams?.some((favoriteTeam) => team.idTeam === favoriteTeam.idTeam);

  const addFavoriteChamp = (championship: championshipFavorite) => {
    if (championship) {
      let { idChampionship, name, img, imgChampionship } = championship;
      setFavoritesChampionships((favorite) => [
        ...favorite,
        { idChampionship, name, img, imgChampionship },
      ]);
    }
  };

  const removeFavoriteChamp = (championship: championshipFavorite) => {
    if (championship)
      setFavoritesChampionships(
        favoritesChampionships.filter(
          (camp) => camp.idChampionship !== championship.idChampionship
        )
      );
  };

  const isFavoriteChamp = (championship: championshipFavorite) =>
    favoritesChampionships?.some(
      (camp) => camp.idChampionship === championship.idChampionship
    );

  return (
    <FavoritesContext.Provider
      value={{
        favoritesTeams,
        setFavoritesTeams,
        favoritesChampionships,
        setFavoritesChampionships,
        addFavoriteTeam,
        removeFavoriteTeam,
        isFavoriteTeam,
        addFavoriteChamp,
        removeFavoriteChamp,
        isFavoriteChamp,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export { FavoritesContext, FavoritesProvider };
