import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Box,
  Text,
  ScrollView,
  HStack,
  useColorMode,
  Pressable,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import { RouteContext } from "../contexts/RouteProvider";
import MatchService from "../services/match";
import MatchComp from "../components/match/MatchComp";
import SelectMatch from "../components/match/SelectMatch";
import { useWindowDimensions } from "react-native";
import SkeletonMatch from "../components/match/SkeletonMatch";
import Summary from "../components/match/Summary";
import Statistics from "../components/match/Statistics";
import Lineups from "../components/match/Lineups";
import SelectTeam from "../components/team/SelectTeam";

type paramsProps = {
  matchId: string;
};

export default function Match() {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const { matchId } = route.params as paramsProps;
  const context = useContext(RouteContext);
  const { navigate } = useNavigation();
  const [type, setType] = useState("summary");
  const [match, setMatch] = useState<match>({
    idMatch: "",
    idChampionship: "",
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
    events: [{ time: "", type: "", description: "", side: "" }],
    statistics: [{ type: "", home: "", away: "" }],
    lineups: {
      homeStarting: [
        {
          num: "",
          name: "",
          actions: {
            substitution: "",
            card: "",
            goals: [{ item: "" }],
          },
        },
      ],
      awayStarting: [
        {
          num: "",
          name: "",
          actions: {
            substitution: "",
            card: "",
            goals: [{ item: "" }],
          },
        },
      ],
      homeBench: [
        {
          num: "",
          name: "",
          actions: {
            substitution: "",
            card: "",
            goals: [{ item: "" }],
          },
        },
      ],
      awayBench: [
        {
          num: "",
          name: "",
          actions: {
            substitution: "",
            card: "",
            goals: [{ item: "" }],
          },
        },
      ],
    },
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
      <Pressable
        w="100%"
        onPress={() =>
          navigate("Championship", {
            championshipId: match.idChampionship,
          })
        }
      >
        <HStack
          _dark={{ bg: "blueGray.700" }}
          _light={{ bg: "emerald.700" }}
          shadow={1}
          rounded="lg"
          w="100%"
          p="2"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize={width > 700 ? 24 : 16}
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
      </Pressable>
      {loading ? <SkeletonMatch /> : <MatchComp match={match} />}

      <Box flex={1}>
        <SelectMatch type={type} setType={setType} />
        <ScrollView>
          {match.teams.homeName !== "." &&
            (type === "summary" ? (
              <Summary match={match} width={width} />
            ) : type === "statistics" ? (
              <Statistics match={match} width={width} />
            ) : (
              <Lineups match={match} width={width} />
            ))}
        </ScrollView>
      </Box>
    </Box>
  );
}
