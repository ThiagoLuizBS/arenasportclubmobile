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
import userService from "../services/user";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RouteContext } from "../contexts/RouteProvider";

export default function Favorites() {
  const [teamsList, setTeamsList] = useState<team[]>();
  const [championshipsList, setChampionshipsList] = useState<championship[]>();
  const [type, setType] = useState("team");
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();
  const context = useContext(RouteContext);
  const route = useRoute();

  const [favoritesChamp, setFavoritesChamp] = useState<championshipFavorite[]>(
    []
  );
  const [favoritesTeams, setFavoritesTeams] = useState<teamFavorite[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useEffect(() => {
    userService.getFavorites("64348ce9a06f54f0bdcd1dc6").then((response) => {
      setTeamsList(response.data.teams);
      setChampionshipsList(response.data.championships);
      setLoading(false);
    });
  }, []);

  const [starredStates, setStarredStates] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const handleStarClick = (index: number) => {
    const newStarredStates = [...starredStates];

    newStarredStates[index] = !newStarredStates[index];

    setStarredStates(newStarredStates);
  };

  const addFavoriteChamp = (championship: championship) => {
    if (championship) {
      let { idChampionship, name, img, imgChampionship } = championship;
      setFavoritesChamp((favorite) => [
        ...favorite,
        { idChampionship, name, img, imgChampionship },
      ]);
    }
  };

  const removeFavoriteChamp = (championship: championship) => {
    if (championship)
      setFavoritesChamp(
        favoritesChamp.filter(
          (camp) => camp.idChampionship !== championship.idChampionship
        )
      );
  };

  const isFavoriteChamp = (championship: championship) =>
    favoritesChamp?.some(
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
        <HStack
          alignItems="center"
          justifyContent="center"
          marginRight="5"
          space={5}
        >
          <Select
            selectedValue={type}
            defaultValue="team"
            accessibilityLabel="Escolha o tipo"
            placeholder="Escolha o tipo"
            fontSize={14}
            minWidth={140}
            borderRadius={16}
            borderWidth={0}
            my={1}
            _dark={{ bg: "blueGray.600", color: "orange.50" }}
            _light={{ bg: "emerald.600", color: "orange.100" }}
            dropdownIcon={
              <Icon
                name="down"
                size="4"
                mr={2}
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                as={<AntDesign name="down" />}
              />
            }
            _selectedItem={
              colorMode === "light"
                ? {
                    bg: "emerald.100",
                    color: "orange.100",
                  }
                : {
                    bg: "blueGray.600",
                    color: "orange.50",
                  }
            }
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Select.Item label="Times" value="team" />
            <Select.Item label="Campeonatos" value="championship" />
          </Select>
        </HStack>

        <Box
          my={4}
          width="100%"
          bg="#008264"
          p="1"
          shadow={2}
          _text={{
            fontSize: "15",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {type === "team" // Verifica se loadingType é "Times" e se o time existe
            ? teamsList?.map((team, i) => (
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
                      fontSize={18}
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
            : championshipsList?.map((championship, i) => (
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
                    fontSize={16}
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
