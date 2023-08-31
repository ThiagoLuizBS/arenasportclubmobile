import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Box, Center, HStack, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

type LineupsProps = {
  match: match;
  width: number;
};

export default function Lineups({ match, width }: LineupsProps) {
  function ShowGoals(player: {
    num: string;
    name: string;
    actions: {
      substitution: string;
      card: string;
      goals: { item: string }[];
    };
  }) {
    return player.actions.goals.map((item, i) => {
      if (item.item === "GOAL") {
        return <Ionicons name="football" size={24} color="green" />;
      } else {
        return <Ionicons name="football" size={24} color="red" />;
      }
    });
  }

  function PlayerSwitch(player: {
    num: string;
    name: string;
    actions: {
      substitution: string;
      card: string;
      goals: { item: string }[];
    };
  }) {
    if (player.actions.substitution === "out") {
      return <AntDesign name="caretdown" size={24} color="black" />;
    } else if (player.actions.substitution === "in") {
      return <AntDesign name="caretup" size={24} color="black" />;
    }
  }

  function PlayerCards(player: {
    num: string;
    name: string;
    actions: {
      substitution: string;
      card: string;
      goals: { item: string }[];
    };
  }) {
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
  }

  return (
    <ScrollView>
      {match?.lineups?.homeStarting.length > 5 ? (
        <>
          <HStack>
            <Center px={2} my={4}>
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "black" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                TITULARES
              </Text>
            </Center>

            <HStack>
              {width < 600 ? (
                <>
                  <HStack>
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
                              goals: { item: string }[];
                            };
                          },

                          i: number
                        ) => (
                          <HStack key={i}>
                            <HStack>{player.num}</HStack>
                            <Text>{player.name}</Text>
                            {ShowGoals(player)}
                            {PlayerCards(player)}
                            {PlayerSwitch(player)}
                          </HStack>
                        )
                      )
                    )}
                  </HStack>
                  <HStack>
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
                              goals: { item: string }[];
                            };
                          },

                          i: number
                        ) => (
                          <HStack key={i}>
                            <HStack>
                              {PlayerSwitch(player)}
                              {PlayerCards(player)}
                              {ShowGoals(player)}
                            </HStack>
                            <Text>{player.name}</Text>
                            <HStack>{player.num}</HStack>
                          </HStack>
                        )
                      )
                    )}
                  </HStack>
                </>
              ) : (
                <>
                  <HStack>
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
                              goals: { item: string }[];
                            };
                          },

                          i: number
                        ) => (
                          <HStack key={i}>
                            <HStack>{player.num}</HStack>
                            <Text>{player.name}</Text>
                            {ShowGoals(player)}
                            {PlayerCards(player)}
                            {PlayerSwitch(player)}
                          </HStack>
                        )
                      )
                    )}
                  </HStack>
                  <HStack>
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
                              goals: { item: string }[];
                            };
                          },

                          i: number
                        ) => (
                          <HStack key={i}>
                            <HStack>
                              {PlayerSwitch(player)}
                              {PlayerCards(player)}
                              {ShowGoals(player)}
                            </HStack>
                            <Text>{player.name}</Text>
                            <HStack>{player.num}</HStack>
                          </HStack>
                        )
                      )
                    )}
                  </HStack>
                </>
              )}
            </HStack>
          </HStack>
          <HStack>
            <HStack>
              <Center px={2} my={4}>
                <Text
                  _dark={{ color: "orange.50" }}
                  _light={{ color: "black" }}
                  fontSize={width > 700 ? 32 : 20}
                  fontWeight="bold"
                >
                  RESERVAS
                </Text>
              </Center>
            </HStack>
            <HStack>
              <HStack>
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
                          goals: { item: string }[];
                        };
                      },

                      i: number
                    ) => (
                      <HStack key={i}>
                        <HStack>{player.num}</HStack>
                        <Text>{player.name}</Text>
                        <HStack>
                          {ShowGoals(player)}
                          {PlayerCards(player)}
                          {PlayerSwitch(player)}
                        </HStack>
                      </HStack>
                    )
                  )
                )}
              </HStack>
              <HStack>
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
                          goals: { item: string }[];
                        };
                      },

                      i: number
                    ) => (
                      <HStack key={i}>
                        {PlayerSwitch(player)}
                        {PlayerCards(player)}
                        {ShowGoals(player)}
                        <Text>{player.name}</Text>
                        <HStack>{player.num}</HStack>
                      </HStack>
                    )
                  )
                )}
              </HStack>
            </HStack>
          </HStack>
        </>
      ) : (
        <Center px={2} my={4}>
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 32 : 20}
            fontWeight="bold"
          >
            ESCALAÇÃO NÃO DISPONÍVEL
          </Text>
        </Center>
      )}
    </ScrollView>
  );
}
