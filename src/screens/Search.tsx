import { useEffect, useState, useContext, Fragment } from "react";
import TeamService from "../services/team";
import ChampionshipService from "../services/championship";
import {
  Box,
  HStack,
  Image,
  Pressable,
  VStack,
  useColorMode,
  Text,
  ScrollView,
  Divider,
  Icon,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SearchContext } from "../contexts/SearchProvider";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

export default function Search() {
  const { width } = useWindowDimensions();
  const { navigate, goBack } = useNavigation();
  const { colorMode } = useColorMode();
  const context = useContext(SearchContext);
  const authContext = useContext(AuthContext);
  const [listTeams, setListTeams] = useState<team[]>([]);
  const [listChampionships, setListChampionships] = useState<championship[]>(
    []
  );

  useEffect(() => {
    if (context?.searchField === "") {
      setListTeams([]);
      setListChampionships([]);
    } else if (context?.searchField) {
      TeamService.getTeams(context?.searchField).then((response) => {
        setListTeams(response.data.team);
      });
      ChampionshipService.getChampionships(context?.searchField).then(
        (response) => {
          setListChampionships(response.data.championship);
        }
      );
    }
  }, [context?.searchField]);

  const deleteSearch = () => {
    context?.handleSearchField("");
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
      <HStack w="100%" alignItems="flex-start" px={4}>
        <Pressable
          onPress={() => {
            deleteSearch();
            goBack();
          }}
        >
          <Ionicons
            name="arrow-back"
            color={colorMode === "light" ? "black" : "white"}
            size={24}
          />
        </Pressable>
      </HStack>
      <ScrollView>
        {listTeams.length > 0 && (
          <HStack w="100%" my={2} justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 32 : 24}
              fontWeight="bold"
            >
              Equipes
            </Text>
          </HStack>
        )}
        {listTeams?.map((team, i) => (
          <Fragment key={i}>
            <Pressable
              my={1}
              onPress={() => {
                deleteSearch();
                navigate("Team", { teamId: team.idTeam });
              }}
            >
              <HStack justifyContent="center" alignItems="center">
                <VStack w="20%">
                  <Image
                    source={{ uri: team.img }}
                    alt={`${team.img}`}
                    size={10}
                    m="auto"
                  />
                </VStack>
                <VStack w="70%">
                  <Text
                    fontSize={width > 700 ? 24 : 16}
                    overflow="hidden"
                    numberOfLines={1}
                    fontWeight="semibold"
                    ellipsizeMode="tail"
                  >
                    {team.name}
                  </Text>
                </VStack>
                <VStack w="10%"></VStack>
              </HStack>
            </Pressable>
            {listTeams.length !== i + 1 && (
              <Divider
                h="0.5"
                _dark={{
                  bg: "blueGray.700",
                }}
                _light={{
                  bg: "emerald.700",
                }}
              />
            )}
          </Fragment>
        ))}
        {listChampionships.length > 0 && (
          <HStack w="100%" my={2} justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 32 : 24}
              fontWeight="bold"
            >
              Campeonatos
            </Text>
          </HStack>
        )}
        {listChampionships?.map((champ, i) => (
          <Fragment key={i}>
            <Pressable
              key={i}
              my={1}
              onPress={() => {
                deleteSearch();
                navigate("Championship", {
                  championshipId: champ.idChampionship,
                });
              }}
            >
              <HStack justifyContent="center" alignItems="center">
                <VStack w="20%">
                  <Image
                    source={{
                      uri:
                        champ.imgChampionship !== ""
                          ? `${champ.imgChampionship}`
                          : `${champ.img}`,
                    }}
                    size={10}
                    alt={`${champ.name}`}
                    m="auto"
                  />
                </VStack>
                <VStack w="70%">
                  <Text
                    fontSize={width > 700 ? 24 : 16}
                    overflow="hidden"
                    numberOfLines={1}
                    fontWeight="semibold"
                    ellipsizeMode="tail"
                  >
                    {champ.name}
                  </Text>
                </VStack>
                <VStack w="10%">
                  <Icon
                    size="7"
                    _dark={{ color: "white" }}
                    _light={{ color: "black" }}
                    as={
                      <Ionicons
                        name={isFavoriteChamp(champ) ? "star" : "star-outline"}
                        onPress={() => {
                          isFavoriteChamp(champ)
                            ? removeFavoriteChamp(champ)
                            : addFavoriteChamp(champ);
                        }}
                      />
                    }
                  />
                </VStack>
              </HStack>
            </Pressable>
            {listChampionships.length !== i + 1 && (
              <Divider
                h="0.5"
                _dark={{
                  bg: "blueGray.700",
                }}
                _light={{
                  bg: "emerald.700",
                }}
              />
            )}
          </Fragment>
        ))}
      </ScrollView>
    </Box>
  );
}
