import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Box, Text, HStack, VStack, Image, Icon } from "native-base";
import ChampionshipService from "../services/championship";
import { RouteContext } from "../contexts/RouteProvider";
import { ScrollView, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../contexts/FavoritesProvider";
import SelectChampionship from "../components/championship/SelectChampionship";
import Table from "../components/championship/Table";
import Results from "../components/championship/Results";
import Calendar from "../components/championship/Calendar";
import SkeletonChampionship from "../components/championship/SkeletonChampionship";
import Statistics from "../components/championship/Statistics";

type paramsProps = {
  championshipId: string;
};

export default function Championship() {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const { championshipId } = route.params as paramsProps;
  const context = useContext(RouteContext);
  const favoritesContext = useContext(FavoritesContext);
  const [type, setType] = useState("table");
  const [championship, setChampionship] = useState<championship>({
    _id: ".",
    idChampionship: ".",
    url: ".",
    name: ".",
    img: ".",
    imgChampionship: ".",
    priority: 0,
    statistics: [
      {
        name: ".",
        table: [{ num: ".", player: ".", team: ".", value: "." }],
      },
    ],
    table: [
      {
        phase: ".",
        group: ".",
        table: [
          {
            num: ".",
            team: ".",
            points: ".",
            games: ".",
            victorys: ".",
            draws: ".",
            loses: ".",
            goaldiference: ".",
          },
        ],
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useEffect(() => {
    ChampionshipService.getChampionshipById(championshipId).then((response) => {
      setChampionship(response.data[0]);
      setLoading(false);
    });
  }, [championshipId]);

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      py={2}
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="100%"
        _dark={{ bg: "blueGray.700" }}
        _light={{ bg: "emerald.700" }}
        p="2"
        shadow={2}
        rounded="xl"
      >
        {loading ? (
          <SkeletonChampionship />
        ) : (
          <HStack justifyContent="center" alignItems="center" w="100%">
            <VStack w="20%">
              <Image
                style={{ resizeMode: "contain" }}
                source={{ uri: championship?.img }}
                alt={`${championship?.name}`}
                size="16"
                m="auto"
              />
            </VStack>
            <VStack w="70%" justifyContent="center" alignItems="center">
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                fontSize={width > 700 ? 48 : 24}
                fontWeight="bold"
                overflow="hidden"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {championship?.name}
              </Text>
            </VStack>
            <VStack w="10%" justifyContent="center">
              <Icon
                size="8"
                _dark={{ color: "orange.300" }}
                _light={{ color: "orange.500" }}
                as={
                  <Ionicons
                    name={
                      favoritesContext?.isFavoriteChamp(championship)
                        ? "star"
                        : "star-outline"
                    }
                    onPress={() => {
                      favoritesContext?.isFavoriteChamp(championship)
                        ? favoritesContext?.removeFavoriteChamp(championship)
                        : favoritesContext?.addFavoriteChamp(championship);
                    }}
                  />
                }
              />
            </VStack>
          </HStack>
        )}
      </Box>
      <SelectChampionship type={type} setType={setType} />
      <Box flex={1}>
        {championship.name !== "." &&
          (type === "table" ? (
            <Table championship={championship} width={width} />
          ) : type === "statistics" ? (
            <Statistics championship={championship} width={width} />
          ) : type === "results" ? (
            <ScrollView>
              <Results championshipId={championshipId} />
            </ScrollView>
          ) : (
            <ScrollView>
              <Calendar championshipId={championshipId} />
            </ScrollView>
          ))}
      </Box>
    </Box>
  );
}
