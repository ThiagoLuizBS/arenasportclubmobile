import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Box, Button, Center, Flex, View } from "native-base";
import ChampionshipService from "../services/championship";
import { RouteContext } from "../contexts/RouteProvider";

export default function Championship() {
  const { navigate } = useNavigation();
  const [championshipList, setChampionshipList] = useState([]);
  const context = useContext(RouteContext);
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useEffect(() => {
    ChampionshipService.getChampionshipsPriority().then((response) => {
      setChampionshipList(response.data);
    });
  }, []);

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      w="100%"
    >
      Championship
      <Button
        p={4}
        borderRadius={16}
        onPress={() => navigate("Match", { itemId: 32 })}
      >
        Match
      </Button>
    </Box>
  );
}
