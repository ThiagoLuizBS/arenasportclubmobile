import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Box,
  Text,
  Button,
  Center,
  Heading,
  ScrollView,
  VStack,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { RouteContext } from "../contexts/RouteProvider";
import MatchService from "../services/match";

type paramsProps = {
  matchId: string;
};

export default function Match() {
  const route = useRoute();
  const { matchId } = route.params as paramsProps;
  const { navigate, goBack } = useNavigation();
  const context = useContext(RouteContext);
  const [match, setMatch] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useEffect(() => {
    MatchService.getMatch(matchId).then((response) => {
      setMatch(response.data[0]);
      setLoading(false);
    });
  }, [matchId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      MatchService.getMatch(matchId).then((response) =>
        setMatch(response.data[0])
      );
    }, 15000);
    return () => clearTimeout(timer);
  });

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
      <Text fontSize={20}>{matchId} ID match</Text>
    </Box>
  );
}
