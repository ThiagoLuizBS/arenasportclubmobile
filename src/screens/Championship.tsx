import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Box, Text, Button, Center, Flex, View } from "native-base";
import ChampionshipService from "../services/championship";
import { RouteContext } from "../contexts/RouteProvider";
import { useWindowDimensions } from "react-native";

type paramsProps = {
  championshipId: string;
};

export default function Championship() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { championshipId } = route.params as paramsProps;
  const context = useContext(RouteContext);
  const [championship, setChampionship] = useState([]);
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
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize={width > 700 ? 32 : 20}>
        {championshipId} ID Championship
      </Text>
    </Box>
  );
}
