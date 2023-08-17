import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  useColorMode,
  ScrollView,
  Pressable,
  Center,
  Text,
  Divider,
  Skeleton,
} from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
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
import MatchTitle from "../components/results/MatchTitle";
import { FavoritesContext } from "../contexts/FavoritesProvider";
import i18n from "../languages/I18n";
import { AuthContext } from "../contexts/AuthProvider";

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
  const context = useContext(RouteContext);
  const favoritesContext = useContext(FavoritesContext);
  const authContext = useContext(AuthContext);
  const route = useRoute();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [loadingMoreChamps, setLoadingMoreChamps] = useState(false);
  const [matchsData, setMatchsData] = useState([]);
  const [dateFilter, setDateFilter] = useState(getTodayDate(0));
  const [filterSelected, setFilterSelected] = useState("");
  const [buttonChange, setButtonChange] = useState("all");
  const [currentItems, setCurrentItems] = useState(6);
  const itemsPerPage = 6;

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useEffect(() => {
    if (favoritesContext?.favoritesChampionships && authContext?.authenticated)
      MatchService.getMatchsByDate(
        dateFilter,
        favoritesContext?.favoritesChampionships
      ).then((response) => {
        setCurrentItems(itemsPerPage);
        setMatchsData(response.data);
        setLoading(false);
      });
    else {
      MatchService.getMatchsByDate(dateFilter, []).then((response) => {
        setCurrentItems(itemsPerPage);
        setMatchsData(response.data);
        setLoading(false);
      });
    }
  }, [dateFilter, authContext?.language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        favoritesContext?.favoritesChampionships &&
        authContext?.authenticated
      )
        MatchService.getMatchsByDate(
          dateFilter,
          favoritesContext?.favoritesChampionships
        ).then((response) => {
          setMatchsData(response.data);
        });
      else {
        MatchService.getMatchsByDate(dateFilter, []).then((response) => {
          setMatchsData(response.data);
        });
      }
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

  const haveChampionships = (data: championshipMatchs[]) => {
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

  const haveMatchs = (championship: championshipMatchs) => {
    let count = 0;
    for (let i = 0; i < championship.matchs.length; i++) {
      if (
        filterSelected === "" ||
        championship.matchs[i].status === filterSelected
      )
        return true;
    }

    if (count === 0) return false;
  };

  const getMoreChampionships = () => {
    setLoadingMoreChamps(true);
    const timer = setTimeout(() => {
      setCurrentItems(currentItems + itemsPerPage);
      setLoadingMoreChamps(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
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
            (championship: championshipMatchs, i) =>
              haveMatchs(championship) &&
              i < currentItems && (
                <Fragment key={i}>
                  <Pressable
                    onPress={() =>
                      navigate("Championship", {
                        championshipId: championship._id.idChampionship,
                      })
                    }
                  >
                    <MatchTitle title={championship._id.championship} />
                  </Pressable>
                  {championship?.matchs.map(
                    (match, i) =>
                      (filterSelected === "" ||
                        match.status === filterSelected) && (
                        <Pressable
                          key={i}
                          onPress={() =>
                            navigate("Match", { matchId: match.idMatch })
                          }
                        >
                          <Match match={match} />
                          {championship.matchs.length !== i + 1 && (
                            <Divider
                              h={1}
                              _dark={{
                                bg: "blueGray.700",
                              }}
                              _light={{
                                bg: "emerald.700",
                              }}
                            />
                          )}
                        </Pressable>
                      )
                  )}
                </Fragment>
              )
          )}
          <Center>
            <Pressable
              onPress={() => getMoreChampionships()}
              disabled={currentItems >= matchsData.length || loadingMoreChamps}
              _disabled={{ opacity: "0.5" }}
              rounded="xl"
              w="80%"
              _dark={{ bg: "blueGray.700" }}
              _light={{ bg: "emerald.700" }}
              shadow={1}
              p="4"
              mt={4}
            >
              <Center>
                {loadingMoreChamps ? (
                  <Skeleton
                    _dark={{ endColor: "blueGray.500" }}
                    _light={{ endColor: "emerald.200" }}
                    size="10"
                    rounded="full"
                  />
                ) : (
                  <Text
                    _dark={{ color: "orange.50" }}
                    _light={{ color: "orange.100" }}
                    fontSize={width > 700 ? 40 : 20}
                    fontWeight="bold"
                  >
                    {i18n.t("vejaMais")}
                  </Text>
                )}
              </Center>
            </Pressable>
          </Center>
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
