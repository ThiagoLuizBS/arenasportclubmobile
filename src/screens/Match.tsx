import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Box,
  Text,
  Button,
  Center,
  Heading,
  ScrollView,
  VStack,
  HStack,
  useColorMode,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { RouteContext } from "../contexts/RouteProvider";
import MatchService from "../services/match";
import MatchComp from "../components/match/MatchComp";
import SelectMatch from "../components/match/SelectMatch";

type paramsProps = {
  matchId: string;
};

export default function Match() {
  const route = useRoute();
  const { matchId } = route.params as paramsProps;
  const { navigate, goBack } = useNavigation();
  const context = useContext(RouteContext);
  const [match, setMatch] = useState<match>({
    idMatch: "",
    championship: "",
    time: "",
    schedule: "",
    status: "",
    scoreHome: "",
    scoreAway: "",
    stadium: "",
    teams: {
      homeId: "",
      homeName: ".",
      homeImg: ".",
      teamHomeHref: "",
      awayId: "",
      awayName: ".",
      awayImg: ".",
      teamAwayHref: "",
    },
    events: [{ time: "", type: "" }],
  });
  const [loading, setLoading] = useState(true);
  const [buttonChange, setButtonChange] = useState("summary");
  const { colorMode } = useColorMode();

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
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      <HStack
        _dark={{ bg: "blueGray.700" }}
        _light={{ bg: "emerald.700" }}
        shadow={1}
        rounded="lg"
        w="100%"
        p="4"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontSize={16}
          overflow="hidden"
          ellipsizeMode="tail"
          fontWeight="bold"
          _dark={{ color: "orange.50" }}
          _light={{ color: "orange.100" }}
          numberOfLines={1}
        >
          {match?.championship}
        </Text>
      </HStack>
      <MatchComp match={match} />
      <SelectMatch
        colorMode={colorMode}
        setButtonChange={setButtonChange}
        buttonChange={buttonChange}
      />
      <HStack flex={1}></HStack>
    </Box>
  );
}
