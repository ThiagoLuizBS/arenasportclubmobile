import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  useColorMode,
} from "native-base";
import React, { Fragment } from "react";

type LineupsProps = {
  match: match;
  width: number;
};

export default function Lineups({ match, width }: LineupsProps) {
  const { colorMode } = useColorMode();
  const ShowGoals = (player: {
    num: string;
    name: string;
    actions: {
      substitution: string;
      card: string;
      goals: string[];
    };
  }) => {
    return player.actions.goals.map((item, i) => {
      if (item === "GOAL") {
        return <Ionicons name="football" key={i} size={24} color="green" />;
      } else {
        return <Ionicons name="football" key={i} size={24} color="red" />;
      }
    });
  };

  const PlayerSwitch = (player: {
    num: string;
    name: string;
    actions: {
      substitution: string;
      card: string;
      goals: string[];
    };
  }) => {
    if (player.actions.substitution === "out") {
      return (
        <AntDesign
          name="caretdown"
          size={24}
          color={colorMode === "light" ? "black" : "white"}
        />
      );
    } else if (player.actions.substitution === "in") {
      return (
        <AntDesign
          name="caretup"
          size={24}
          color={colorMode === "light" ? "black" : "white"}
        />
      );
    }
  };

  const PlayerCards = (player: {
    num: string;
    name: string;
    actions: {
      substitution: string;
      card: string;
      goals: string[];
    };
  }) => {
    if (player.actions.card === "YC") {
      return <MaterialCommunityIcons name="cards" size={24} color="yellow" />;
    } else if (player.actions.card === "RC") {
      return <MaterialCommunityIcons name="cards" size={24} color="red" />;
    } else if (player.actions.card === "YR") {
      return (
        <>
          <MaterialCommunityIcons name="cards" size={24} color="yellow" />
          <MaterialCommunityIcons name="cards" size={24} color="red" />
        </>
      );
    }
  };

  return (
    <Box flex={1} flexDir="row" flexWrap="wrap" px={2}>
      {match?.lineups?.homeStarting.length > 5 ? (
        <>
          <VStack
            w="100%"
            justifyContent="center"
            flexWrap="wrap"
            px={2}
            my={4}
          >
            <HStack w="100%" justifyContent="center">
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "black" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                TITULARES
              </Text>
            </HStack>

            <VStack w="100%">
              <VStack w="100%">
                {typeof match?.lineups?.homeStarting === "undefined" ? (
                  <Text>Loading...</Text>
                ) : (
                  match.lineups.homeStarting.map(
                    (
                      player: {
                        num: string;
                        name: string;
                        actions: {
                          substitution: string;
                          card: string;
                          goals: string[];
                        };
                      },

                      i: number
                    ) => (
                      <HStack
                        key={i}
                        my={1}
                        w="100%"
                        justifyContent="flex-start"
                        space={2}
                      >
                        <Text>{player.num}</Text>
                        <Text>{player.name}</Text>
                        {ShowGoals(player)}
                        {PlayerCards(player)}
                        {PlayerSwitch(player)}
                      </HStack>
                    )
                  )
                )}
              </VStack>
              <VStack w="100%">
                {typeof match?.lineups?.awayStarting === "undefined" ? (
                  <Text>Loading...</Text>
                ) : (
                  match.lineups.awayStarting.map(
                    (
                      player: {
                        num: string;
                        name: string;
                        actions: {
                          substitution: string;
                          card: string;
                          goals: string[];
                        };
                      },

                      i: number
                    ) => (
                      <HStack
                        key={i}
                        my={1}
                        w="100%"
                        justifyContent="flex-end"
                        space={2}
                      >
                        {PlayerSwitch(player)}
                        {PlayerCards(player)}
                        {ShowGoals(player)}
                        <Text>{player.name}</Text>
                        <Text>{player.num}</Text>
                      </HStack>
                    )
                  )
                )}
              </VStack>
            </VStack>
          </VStack>

          <VStack w="100%">
            <HStack w="100%" justifyContent="center" px={2} my={4}>
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "black" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                RESERVAS
              </Text>
            </HStack>
            <VStack w="100%">
              <VStack w="100%">
                {typeof match?.lineups?.homeBench === "undefined" ? (
                  <Text>Loading...</Text>
                ) : (
                  match.lineups.homeBench.map(
                    (
                      player: {
                        num: string;
                        name: string;
                        actions: {
                          substitution: string;
                          card: string;
                          goals: string[];
                        };
                      },

                      i: number
                    ) => (
                      <HStack
                        w="100%"
                        key={i}
                        justifyContent="flex-start"
                        my={1}
                        space={2}
                      >
                        <Text>{player.num}</Text>
                        <Text>{player.name}</Text>
                        {ShowGoals(player)}
                        {PlayerCards(player)}
                        {PlayerSwitch(player)}
                      </HStack>
                    )
                  )
                )}
              </VStack>
              <VStack w="100%">
                {typeof match?.lineups?.awayBench === "undefined" ? (
                  <Text>Loading...</Text>
                ) : (
                  match.lineups.awayBench.map(
                    (
                      player: {
                        num: string;
                        name: string;
                        actions: {
                          substitution: string;
                          card: string;
                          goals: string[];
                        };
                      },

                      i: number
                    ) => (
                      <HStack
                        w="100%"
                        my={1}
                        key={i}
                        justifyContent="flex-end"
                        space={2}
                      >
                        {PlayerSwitch(player)}
                        {PlayerCards(player)}
                        {ShowGoals(player)}
                        <Text>{player.name}</Text>
                        <Text>{player.num}</Text>
                      </HStack>
                    )
                  )
                )}
              </VStack>
            </VStack>
          </VStack>
        </>
      ) : (
        <HStack justifyContent="center" px={2} my={4} w="100%">
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 32 : 20}
            fontWeight="bold"
          >
            ESCALAÇÃO NÃO DISPONÍVEL
          </Text>
        </HStack>
      )}
    </Box>
  );
}
