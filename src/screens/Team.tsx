import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  Center,
  HStack,
  Box,
  Image,
  ScrollView,
  Icon,
  VStack,
} from "native-base";
import { useWindowDimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import TeamService from "../services/team";
import { Ionicons } from "@expo/vector-icons";
import SelectTeam from "../components/team/SelectTeam";
import { FavoritesContext } from "../contexts/FavoritesProvider";
import Informations from "../components/team/Informations";
import Titles from "../components/team/Titles";
import Results from "../components/team/Results";
import Calendar from "../components/team/Calendar";
import SkeletonChampionship from "../components/championship/SkeletonChampionship";

type paramsProps = {
  teamId: string;
};

export default function Team() {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const { teamId } = route.params as paramsProps;
  const favoritesContext = useContext(FavoritesContext);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("informations");
  const [team, setTeam] = useState<team>({
    img: ".",
    name: ".",
    url: ".",
    idTeam: ".",
    locality: ".",
    infos: [{ title: ".", description: "." }],
    titles: [{ year: ".", name: ".", logo: "." }],
  });

  useEffect(() => {
    TeamService.getTeamById(teamId).then((response) => {
      setTeam(response.data[0]);
      setLoading(false);
    });
  }, [teamId]);

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      py={2}
      w="100%"
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
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <VStack w="20%">
              <Image
                style={{ resizeMode: "contain" }}
                source={{ uri: team?.img }}
                alt={`${team?.name}`}
                size="16"
                m="auto"
              />
            </VStack>
            <VStack w="70%" justifyContent="center" alignItems="center">
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                marginY={3}
                fontSize={width > 700 ? 48 : 24}
                fontWeight="bold"
                overflow="hidden"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {team?.name}
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
        )}
      </Box>
      <SelectTeam type={type} setType={setType} />
      <ScrollView>
        {team.name !== "." &&
          (type === "informations" ? (
            <Informations team={team} width={width} />
          ) : type === "titles" ? (
            <Titles team={team} width={width} />
          ) : type === "results" ? (
            <Results teamId={teamId} />
          ) : (
            <Calendar teamId={teamId} />
          ))}
      </ScrollView>
    </Box>
  );
}
