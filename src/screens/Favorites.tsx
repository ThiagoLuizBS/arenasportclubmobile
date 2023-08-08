import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Text,
  HStack,
  Box,
  Image,
  useColorMode,
  ScrollView,
  Select,
  Icon,
  View,
  Pressable,
} from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import UserService from "../services/user";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RouteContext } from "../contexts/RouteProvider";
import { AuthContext } from "../contexts/AuthProvider";
import SelectFavorites from "../components/favorites/SelectFavorites";
import { useWindowDimensions } from "react-native";

export default function Favorites() {
  const { width } = useWindowDimensions();
  const [type, setType] = useState("team");
  const { navigate } = useNavigation();
  const context = useContext(RouteContext);
  const authContext = useContext(AuthContext);
  const route = useRoute();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useEffect;

  const [starredStates, setStarredStates] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const handleStarClick = (index: number) => {
    const newStarredStates = [...starredStates];

    newStarredStates[index] = !newStarredStates[index];

    setStarredStates(newStarredStates);
  };

  const addFavoriteChamp = (championship: championshipFavorite) => {
    if (championship) {
      let { idChampionship, name, img, imgChampionship } = championship;
      authContext?.setFavoritesChampionships((favorite) => [
        ...favorite,
        { idChampionship, name, img, imgChampionship },
      ]);
    }
  };

  const removeFavoriteChamp = (championship: championshipFavorite) => {
    if (championship)
      authContext?.setFavoritesChampionships(
        authContext?.favoritesChampionships.filter(
          (camp) => camp.idChampionship !== championship.idChampionship
        )
      );
  };

  const isFavoriteChamp = (championship: championshipFavorite) =>
    authContext?.favoritesChampionships?.some(
      (camp) => camp.idChampionship === championship.idChampionship
    );

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      w="100%"
    >
      <ScrollView bg="success.100" px={4} flex={1}>
        <SelectFavorites type={type} setType={setType} />

        <Box my={4} width="100%" bg="#008264" p="1" shadow={2}>
          {type === "team" // Verifica se loadingType é "Times" e se o time existe
            ? authContext?.favoritesTeams?.map((team, i) => (
                <Pressable
                  key={i}
                  onPress={() => navigate("Team", { teamId: team.idTeam })}
                >
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    my={2}
                    mx={2}
                  >
                    <Image
                      source={{ uri: team.img }}
                      alt={team.name}
                      size="10"
                    />
                    <Text
                      _dark={{ color: "orange.50" }}
                      _light={{ color: "orange.100" }}
                      fontSize={width > 700 ? 24 : 16}
                      fontWeight="bold"
                    >
                      {team.name}
                    </Text>
                    <Icon
                      size="7"
                      _dark={{ color: "orange.50" }}
                      _light={{ color: "orange.100" }}
                      as={
                        <Ionicons
                          name={starredStates[1] ? "star" : "star-outline"}
                          onPress={() => handleStarClick(1)}
                        />
                      }
                    />
                  </HStack>
                </Pressable>
              ))
            : authContext?.favoritesChampionships?.map((championship, i) => (
                <HStack
                  key={i}
                  justifyContent="space-between"
                  alignItems="center"
                  my={2}
                  mx={2}
                >
                  <Image
                    source={{
                      uri: championship.imgChampionship
                        ? championship.imgChampionship
                        : championship.img,
                    }}
                    alt={championship.name}
                    size="10"
                  />
                  <Text
                    _dark={{ color: "orange.50" }}
                    _light={{ color: "orange.100" }}
                    fontSize={width > 700 ? 24 : 16}
                    fontWeight="bold"
                  >
                    {championship.name}
                  </Text>
                  <Icon
                    size="7"
                    _dark={{ color: "orange.50" }}
                    _light={{ color: "orange.100" }}
                    as={
                      <Ionicons
                        name={
                          isFavoriteChamp(championship)
                            ? "star"
                            : "star-outline"
                        }
                        onPress={() => {
                          isFavoriteChamp(championship)
                            ? removeFavoriteChamp(championship)
                            : addFavoriteChamp(championship);
                        }}
                      />
                    }
                  />
                </HStack>
              ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
