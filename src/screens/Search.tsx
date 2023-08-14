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
import { FavoritesContext } from "../contexts/FavoritesProvider";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import SkeletonSearch from "../components/search/SkeletonSearch";
import i18n from "../languages/I18n";

export default function Search() {
  const { width } = useWindowDimensions();
  const { navigate, goBack } = useNavigation();
  const { colorMode } = useColorMode();
  const context = useContext(SearchContext);
  const favoritesContext = useContext(FavoritesContext);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(true);
  const [listTeams, setListTeams] = useState<team[]>([]);
  const [listChampionships, setListChampionships] = useState<championship[]>(
    []
  );

  useEffect(() => {
    if (context?.searchField === "") {
      setWarning(true);
      setLoading(false);
      setListTeams([]);
      setListChampionships([]);
    } else if (context?.searchField) {
      setLoading(true);
      setWarning(true);
      TeamService.getTeams(context?.searchField).then((response) => {
        if (response.data.team.length > 0) {
          setWarning(false);
          setLoading(false);
        }
        setListTeams(response.data.team);
      });
      ChampionshipService.getChampionships(context?.searchField).then(
        (response) => {
          if (response.data.championship.length > 0) {
            setWarning(false);
            setLoading(false);
          }
          setListChampionships(response.data.championship);
        }
      );
    }
  }, [context?.searchField]);

  const deleteSearch = () => {
    context?.handleSearchField("");
  };

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      w="100%"
    >
      <HStack
        w="100%"
        alignItems="flex-start"
        justifyContent="space-between"
        px={4}
      >
        <Pressable
          onPress={() => {
            deleteSearch();
            goBack();
          }}
        >
          <Ionicons
            name="arrow-back"
            color={colorMode === "light" ? "black" : "#fff7ed"}
            size={24}
          />
        </Pressable>
        {warning && (
          <Text fontWeight="semibold" fontSize={width > 700 ? 24 : 16}>
            {i18n.t("PesquisaVazia")}
          </Text>
        )}
      </HStack>
      <ScrollView>
        {loading && <SkeletonSearch />}
        {listTeams.length > 0 && (
          <HStack w="100%" my={2} justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "orange.50" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 32 : 24}
              fontWeight="bold"
            >
              {i18n.t("Equipe")}
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
                    style={{ resizeMode: "contain" }}
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
                <VStack w="10%">
                  <Icon
                    size="7"
                    _dark={{ color: "orange.300" }}
                    _light={{ color: "orange.500" }}
                    as={
                      <Ionicons
                        name={
                          favoritesContext?.isFavoriteTeam(team)
                            ? "star"
                            : "star-outline"
                        }
                        onPress={() => {
                          favoritesContext?.isFavoriteTeam(team)
                            ? favoritesContext?.removeFavoriteTeam(team)
                            : favoritesContext?.addFavoriteTeam(team);
                        }}
                      />
                    }
                  />
                </VStack>
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
              _dark={{ color: "orange.50" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 32 : 24}
              fontWeight="bold"
            >
              {i18n.t("Campeonatos")}
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
                    style={{ resizeMode: "contain" }}
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
                    _dark={{ color: "orange.300" }}
                    _light={{ color: "orange.500" }}
                    as={
                      <Ionicons
                        name={
                          favoritesContext?.isFavoriteChamp(champ)
                            ? "star"
                            : "star-outline"
                        }
                        onPress={() => {
                          favoritesContext?.isFavoriteChamp(champ)
                            ? favoritesContext?.removeFavoriteChamp(champ)
                            : favoritesContext?.addFavoriteChamp(champ);
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
