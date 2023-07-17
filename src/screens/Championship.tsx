import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Center, Flex, View } from "native-base";
import ChampionshipService from "../services/championship";

export default function Championship() {
  const { navigate } = useNavigation();
  const [championshipList, setChampionshipList] = useState([]);

  useEffect(() => {
    ChampionshipService.getChampionshipsPriority().then((response) => {
      setChampionshipList(response.data);
    });
  }, []);

  return (
    <Center bg="emerald.100" px={4} flex={1}>
      Championship
      <Button
        p={4}
        borderRadius={16}
        onPress={() => navigate("Match", { itemId: 32 })}
      >
        Match
      </Button>
    </Center>
  );
}
