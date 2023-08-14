import React, { useCallback, useContext, useState } from "react";
import {
  Text,
  HStack,
  Box,
  Image,
  useColorMode,
  ScrollView,
  Icon,
  Pressable,
  VStack,
  Divider,
} from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RouteContext } from "../contexts/RouteProvider";
import { FavoritesContext } from "../contexts/FavoritesProvider";
import { useWindowDimensions } from "react-native";
import SelectFavorites from "../components/favorites/SelectFavorites";
import i18n from "../languages/I18n";

export default function Favorites() {
  const { colorMode } = useColorMode();
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const route = useRoute();
  const context = useContext(RouteContext);
  const favoritesContext = useContext(FavoritesContext);
  const [type, setType] = useState("team");
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      w="100%"
    >
      <SelectFavorites type={type} setType={setType} />
      <ScrollView>
        <Box m={2} width="100%" shadow={2}>
          {type === "team" // Verifica se loadingType é "Times" e se o time existe
            ? favoritesContext?.favoritesTeams?.map((team, i) => (
                <Pressable
                  key={i}
                  onPress={() => navigate("Team", { teamId: team.idTeam })}
                >
                  <HStack
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                    my={2}
                  >
                    <VStack w="20%">
                      <Image
                        style={{ resizeMode: "contain" }}
                        source={{ uri: team?.img }}
                        alt={team?.name}
                        size="10"
                        m="auto"
                      />
                    </VStack>
                    <VStack w="70%">
                      <Text
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "black" }}
                        fontSize={width > 700 ? 24 : 16}
                        fontWeight="bold"
                        overflow="hidden"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {team?.name}
                      </Text>
                    </VStack>
                    <VStack w="10%" justifyContent="center">
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
                  {favoritesContext?.favoritesTeams.length !== i + 1 && (
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
                </Pressable>
              ))
            : favoritesContext?.favoritesChampionships?.map(
                (championship, i) => (
                  <Pressable
                    key={i}
                    onPress={() =>
                      navigate("Championship", {
                        championshipId: championship.idChampionship,
                      })
                    }
                  >
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      my={2}
                    >
                      <VStack w="20%">
                        <Image
                          style={{ resizeMode: "contain" }}
                          source={{
                            uri: championship?.imgChampionship
                              ? championship?.imgChampionship
                              : championship?.img,
                          }}
                          alt={championship?.name}
                          size="10"
                          m="auto"
                        />
                      </VStack>
                      <VStack w="70%">
                        <Text
                          _dark={{ color: "orange.50" }}
                          _light={{ color: "black" }}
                          fontSize={width > 700 ? 24 : 16}
                          fontWeight="bold"
                          overflow="hidden"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {championship?.name}
                        </Text>
                      </VStack>
                      <VStack w="10%" justifyContent="center">
                        <Icon
                          size="7"
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
                                  ? favoritesContext?.removeFavoriteChamp(
                                      championship
                                    )
                                  : favoritesContext?.addFavoriteChamp(
                                      championship
                                    );
                              }}
                            />
                          }
                        />
                      </VStack>
                    </HStack>
                    {favoritesContext?.favoritesChampionships.length !==
                      i + 1 && (
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
                  </Pressable>
                )
              )}
        </Box>
      </ScrollView>
    </Box>
  );
}
