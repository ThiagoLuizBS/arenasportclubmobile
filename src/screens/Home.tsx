import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  Center,
  VStack,
  Heading,
  HStack,
  Box,
  Link,
  Button,
  Image,
  useColorMode,
  Switch,
  Skeleton,
  Flex,
  ScrollView,
  Select,
  CheckIcon,
  Icon,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import MatchService from "../services/match";
import logo from "../assets/logo1.png";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SkeletonHome from "../components/home/SkeletonHome";
import SelectHome from "../components/home/SelectHome";

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

  const checkLastEvent = (match: match) => {
    let event = "";
    if (match.events?.length > 0) {
      let timeLastEvent = parseInt(
        match.events[match.events?.length - 1].time.replace("'", "")
      );
      let timeMatch = parseInt(match.time.replace("MIN", ""));

      if (
        match.events[match.events.length - 1].type === "GOAL" &&
        timeMatch <= timeLastEvent + 2
      ) {
        event = "GOL";
      }
    }

    return event;
  };

  const changeMinMatch = (match: match) => {
    let time;
    if (match?.time === "INTERVALO")
      time = match?.time?.replace("INTERVALO", "INT");
    else if (match?.time === "SUSPENSO")
      time = match?.time?.replace("SUSPENSO", "SUSP");
    else if (match?.time === "ADIADO")
      time = match?.time?.replace("ADIADO", "CANC");
    else if (match?.time === "ATRASADO")
      time = match?.time?.replace("ATRASADO", "ATRA");
    else if (match?.time === "INTERROMPIDO")
      time = match?.time?.replace("INTERROMPIDO", "SUSP");
    else if (match?.time === "PÊNALTIS")
      time = match?.time?.replace("PÊNALTIS", "PEN");
    else time = match?.time?.replace(" MIN", "'");

    return time;
  };

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "emerald.100" }}
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
        <Center px={2}>
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={20}
            fontWeight="bold"
          >
            NENHUMA PARTIDA ENCONTRADA
          </Text>
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={20}
            fontWeight="bold"
          >
            PARA O DIA {dateFilter.replaceAll("-", "/")}
          </Text>
        </Center>
      ) : haveChampionships(matchsData) ? (
        <ScrollView>
          {matchsData?.map((championship: championship, i) =>
            haveMatchs(championship) && i < 3 ? (
              <Fragment key={i}>
                <Flex
                  _dark={{ bg: "blueGray.700", color: "orange.50" }}
                  _light={{ bg: "emerald.700", color: "orange.100" }}
                  alignSelf="center"
                  justifyContent="center"
                  px={2}
                  py={1}
                  width="100%"
                  h={10}
                  flexDirection="row"
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
                      <HStack
                        w="100%"
                        h={24}
                        _dark={{ bg: "blueGray.500" }}
                        _light={{ bg: "emerald.200" }}
                        px={2}
                        py={1}
                      >
                        <VStack w="80%">
                          <HStack h="50%">
                            <VStack h="100%" w="20%">
                              <Image
                                source={{ uri: match.teams?.homeImg }}
                                alt={`${match.teams?.homeName}`}
                                size="30"
                                m="auto"
                              />
                            </VStack>
                            <VStack h="100%" w="80%" justifyContent="center">
                              <Text
                                _dark={{ color: "white" }}
                                _light={{ color: "black" }}
                                fontSize={16}
                              >
                                {match.teams?.homeName}
                              </Text>
                            </VStack>
                          </HStack>
                          <HStack h="50%">
                            <VStack h="100%" w="20%">
                              <Image
                                source={{ uri: match.teams?.awayImg }}
                                alt={`${match.teams?.awayName}`}
                                size="30"
                                m="auto"
                              />
                            </VStack>
                            <VStack h="100%" w="80%" justifyContent="center">
                              <Text
                                _dark={{ color: "white" }}
                                _light={{ color: "black" }}
                                fontSize={16}
                              >
                                {match.teams?.awayName}
                              </Text>
                            </VStack>
                          </HStack>
                        </VStack>
                        <VStack w="5%">
                          <Center>
                            <HStack
                              h="50%"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text
                                _dark={{ color: "white" }}
                                _light={{ color: "black" }}
                                fontSize={18}
                                fontWeight="bold"
                              >
                                {match.scoreHome}
                              </Text>
                            </HStack>
                          </Center>
                          <HStack
                            h="50%"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Text
                              _dark={{ color: "white" }}
                              _light={{ color: "black" }}
                              fontSize={18}
                              fontWeight="bold"
                            >
                              {match.scoreAway}
                            </Text>
                          </HStack>
                        </VStack>
                        <VStack
                          w="15%"
                          justifyContent="center"
                          alignItems="center"
                          _dark={{ color: "white" }}
                          _light={{ color: "black" }}
                        >
                          {match?.status === "AO VIVO" ? (
                            <Text fontSize={18} fontWeight="bold">
                              {changeMinMatch(match)}
                            </Text>
                          ) : match?.status === "ENCERRADO" ? (
                            <Text fontSize={18} fontWeight="bold">
                              FIM
                            </Text>
                          ) : (
                            <Text fontSize={18} fontWeight="bold">
                              {match.schedule}
                            </Text>
                          )}
                          {match.status === "AO VIVO" &&
                            checkLastEvent(match) !== "" && (
                              <Icon
                                size={6}
                                _dark={{ color: "blueGray.500" }}
                                _light={{ color: "emerald.800" }}
                                as={<Ionicons name={"ios-football"} />}
                              />
                            )}
                        </VStack>
                      </HStack>
                      {i !== championship?.matchs.length - 1 && (
                        <Divider
                          _dark={{
                            bg: "blueGray.900",
                          }}
                          _light={{
                            bg: "emerald.800",
                          }}
                        />
                      )}
                    </Fragment>
                  ) : (
                    <Fragment key={i}></Fragment>
                  )
                )}
              </Fragment>
            ) : (
              <Fragment key={i}></Fragment>
            )
          )}
          <Center
            _dark={{ bg: "blueGray.900" }}
            _light={{ bg: "emerald.100" }}
            px={4}
            py={4}
            flex={1}
          >
            <VStack space={5} alignItems="center">
              <Image source={logo} alt="Alternate Text" size="xl" />
              <Heading
                size="lg"
                _dark={{ color: "white" }}
                _light={{ color: "black" }}
              >
                Arena Sport Club
              </Heading>
            </VStack>
          </Center>
        </ScrollView>
      ) : filterSelected === "ENCERRADO" ? (
        <Center px={2}>
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={20}
            fontWeight="bold"
          >
            NENHUMA PARTIDA ENCERRADA
          </Text>
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={20}
            fontWeight="bold"
          >
            PARA O DIA {dateFilter.replaceAll("-", "/")}
          </Text>
        </Center>
      ) : (
        <Center px={2}>
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={20}
            fontWeight="bold"
          >
            NENHUMA PARTIDA {filterSelected}
          </Text>
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={20}
            fontWeight="bold"
          >
            PARA O DIA {dateFilter.replaceAll("-", "/")}
          </Text>
        </Center>
      )}
    </Box>
  );
}
