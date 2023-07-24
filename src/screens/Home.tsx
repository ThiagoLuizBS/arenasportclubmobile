import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Text,
  Center,
  VStack,
  HStack,
  Box,
  Image,
  useColorMode,
  Flex,
  ScrollView,
  Icon,
  Divider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import MatchService from "../services/match";
import { RouteContext } from "../contexts/RouteProvider";
import SkeletonHome from "../components/home/SkeletonHome";
import SelectHome from "../components/home/SelectHome";
import Branding from "../components/app/Branding";
import {
  NoMatchsEnded,
  NoMatchsFilteredToday,
  NoMatchsToday,
} from "../components/results/NoMatchs";
import Match from "../components/results/Match";

type expandChampionship = {
  i: number;
  value: boolean;
};

export default function Home() {
  const getTodayDate = (x: number) => {
    var date = new Date();
    date.setDate(date.getDate() + x);
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = date.getFullYear();
    if (Number(day) < 10) day = "0" + day;
    if (Number(month) < 10) month = "0" + month;
    return day + "-" + month + "-" + year;
  };

  const getFilterSelect = (x: number) => {
    var date = getTodayDate(x);
    date = date.replace("-", "/");
    date = date.replace("-2023", "");
    return date;
  };

  const { navigate } = useNavigation();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [matchsData, setMatchsData] = useState([]);
  const [dateFilter, setDateFilter] = useState(getTodayDate(0));
  const [filterSelected, setFilterSelected] = useState("");
  const [buttonChange, setButtonChange] = useState("all");
  const context = useContext(RouteContext);
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useEffect(() => {
    MatchService.getMatchsByDate(dateFilter, []).then((response) => {
      setMatchsData(response.data);
      setLoading(false);
    });
  }, [dateFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      MatchService.getMatchsByDate(dateFilter, []).then((response) => {
        setMatchsData(response.data);
      });
    }, 30000);
    return () => clearTimeout(timer);
  });

  const changeDate = (dateChange: string) => {
    if (dateFilter !== dateChange) {
      setLoading(true);
      setDateFilter(dateChange);
      if (dateChange !== getTodayDate(0)) {
        setButtonChange("all");
        setFilterSelected("");
      }
    }
  };

  const changeSelected = (buttonName: string) => {
    setButtonChange(buttonName);
    if (buttonName === "all") setFilterSelected("");
    else if (buttonName === "live") setFilterSelected("AO VIVO");
    else if (buttonName === "finished") setFilterSelected("ENCERRADO");
    else setFilterSelected("A REALIZAR");
  };

  const haveChampionships = (data: championship[]) => {
    let count = 0;
    for (let i = 0; i < data?.length; i++) {
      for (let j = 0; j < data[i]?.matchs?.length; j++) {
        if (
          filterSelected === "" ||
          data[i].matchs[j].status === filterSelected
        )
          return true;
      }
    }

    if (count === 0) return false;
  };

  const haveMatchs = (championship: championship) => {
    let count = 0;
    for (let index = 0; index < championship.matchs.length; index++) {
      if (
        filterSelected === "" ||
        championship.matchs[index].status === filterSelected
      )
        return true;
    }

    if (count === 0) return false;
  };

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      w="100%"
    >
      <SelectHome
        buttonChange={buttonChange}
        colorMode={colorMode}
        changeSelected={changeSelected}
        getTodayDate={getTodayDate}
        dateFilter={dateFilter}
        changeDate={changeDate}
        getFilterSelect={getFilterSelect}
      />
      {loading ? (
        <SkeletonHome />
      ) : matchsData?.length === 0 ? (
        <NoMatchsToday dateFilter={dateFilter} />
      ) : haveChampionships(matchsData) ? (
        <ScrollView>
          {matchsData?.map(
            (championship: championship, i) =>
              haveMatchs(championship) &&
              i < 3 && (
                <Fragment key={i}>
                  <Flex
                    _dark={{ bg: "blueGray.700", color: "orange.50" }}
                    _light={{ bg: "emerald.700", color: "orange.100" }}
                    px={2}
                    py={1}
                    width="100%"
                    h={10}
                    flexDirection="row"
                    alignSelf="center"
                    justifyContent="center"
                  >
                    <HStack
                      w="100%"
                      alignSelf="center"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        overflow="hidden"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        fontSize={16}
                        fontWeight="bold"
                      >
                        {championship._id.championship}
                      </Text>
                    </HStack>
                  </Flex>
                  {championship?.matchs.map((match, i) =>
                    filterSelected === "" || match.status === filterSelected ? (
                      <Fragment key={i}>
                        <Match match={match} />
                      </Fragment>
                    ) : (
                      <Fragment key={i}></Fragment>
                    )
                  )}
                </Fragment>
              )
          )}
          <Branding />
        </ScrollView>
      ) : filterSelected === "ENCERRADO" ? (
        <NoMatchsEnded dateFilter={dateFilter} />
      ) : (
        <NoMatchsFilteredToday
          filterSelected={filterSelected}
          dateFilter={dateFilter}
        />
      )}
    </Box>
  );
}
