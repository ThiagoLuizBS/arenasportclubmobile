import { useNavigation } from "@react-navigation/native";
import { Button, Center, Flex, View } from "native-base";
import React from "react";

export default function Campeonatos() {
  const { navigate } = useNavigation();

  return (
    <Center bg="black" px={4} flex={1}>
      Olá
      <Button p={4} borderRadius={16} onPress={() => navigate("Match")}>
        Match
      </Button>
    </Center>
  );
}
