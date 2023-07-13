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
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [matchsData, setMatchsData] = useState([]);
  const [dateFilter, setDateFilter] = useState(getTodayDate(0));
  const [buttonExpand, setButtonExpand] = useState<expandChampionship[]>([]);
  const [filterSelected, setFilterSelected] = useState("");
  const [buttonChange, setButtonChange] = useState("all");

  useEffect(() => {
    MatchService.getMatchsByDate(dateFilter, []).then((response) => {
      setMatchsData(response.data);
      setExpand(response.data.length);
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
    setLoading(true);
    setDateFilter(dateChange);
    if (dateChange !== getTodayDate(0)) {
      setButtonChange("all");
      setFilterSelected("");
    }
  };

  const changeSelected = (buttonName: string) => {
    setButtonChange(buttonName);
    if (buttonName === "all") setFilterSelected("");
    else if (buttonName === "live") setFilterSelected("AO VIVO");
    else if (buttonName === "finished") setFilterSelected("ENCERRADO");
    else setFilterSelected("A REALIZAR");
  };

  const setExpand = (length: number) => {
    const array: expandChampionship[] = [];
    for (let index = 0; index < length; index++) {
      array.push({ i: index, value: true });
    }
    setButtonExpand(array);
  };

  const changeExpand = (key: number) => {
    setButtonExpand(
      buttonExpand.map((item) => {
        if (item.i === key && item.value === true)
          return { i: key, value: false };
        else if (item.i === key && item.value === false)
          return { i: key, value: true };

        return item;
      })
    );
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
    <>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "emerald.100" }}
        pb={2}
      >
        <HStack space={5}>
          <Select
            selectedValue={buttonChange}
            defaultValue="all"
            accessibilityLabel="Escolha o tipo"
            placeholder="Escolha o tipo"
            fontSize={16}
            minWidth={140}
            borderRadius={16}
            borderWidth={0}
            my={1}
            _dark={{ bg: "blueGray.600", color: "orange.50" }}
            _light={{ bg: "emerald.600", color: "orange.100" }}
            dropdownIcon={
              <Icon
                name="down"
                size="4"
                mr={2}
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                as={<AntDesign name="down" />}
              />
            }
            _selectedItem={
              colorMode === "light"
                ? {
                    bg: "emerald.100",
                    color: "orange.100",
                  }
                : {
                    bg: "blueGray.600",
                    color: "orange.50",
                  }
            }
            onValueChange={(itemValue) => changeSelected(itemValue)}
          >
            <Select.Item label="Todos" value="all" />
            <Select.Item
              label="Ao vivo"
              value="live"
              isDisabled={getTodayDate(0) !== dateFilter}
            />
            <Select.Item
              label="Encerrados"
              value="finished"
              isDisabled={getTodayDate(0) !== dateFilter}
            />
            <Select.Item
              label="Próximos"
              value="next"
              isDisabled={getTodayDate(0) !== dateFilter}
            />
          </Select>
          <Select
            selectedValue={dateFilter}
            defaultValue="Hoje"
            accessibilityLabel="Escolha a data"
            placeholder="Escolha a data"
            minWidth={140}
            fontSize={16}
            borderRadius={16}
            borderWidth={0}
            my={1}
            _dark={{ bg: "blueGray.600", color: "orange.50" }}
            _light={{ bg: "emerald.600", color: "orange.100" }}
            dropdownIcon={
              <Icon
                name="down"
                size="4"
                mr={2}
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                as={<AntDesign name="down" />}
              />
            }
            _selectedItem={
              colorMode === "light"
                ? {
                    bg: "emerald.100",
                    color: "orange.100",
                  }
                : {
                    bg: "blueGray.600",
                    color: "orange.50",
                  }
            }
            onValueChange={(itemValue) => changeDate(itemValue)}
          >
            <Select.Item label={getFilterSelect(-2)} value={getTodayDate(-2)} />
            <Select.Item label={getFilterSelect(-1)} value={getTodayDate(-1)} />
            <Select.Item label="Hoje" value={getTodayDate(0)} />
            <Select.Item label={getFilterSelect(1)} value={getTodayDate(1)} />
            <Select.Item label={getFilterSelect(2)} value={getTodayDate(2)} />
          </Select>
        </HStack>
      </Center>
      {loading ? (
        <Center
          w="100%"
          flex={1}
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "emerald.100" }}
        >
          <VStack
            w="90%"
            maxW={400}
            space={2}
            rounded="md"
            alignItems="center"
            justifyContent="center"
            _dark={{ bg: "blueGray.900" }}
            _light={{ bg: "emerald.100" }}
          >
            <HStack>
              <Skeleton
                h="10"
                w="90%"
                _dark={{ endColor: "blueGray.600" }}
                _light={{ endColor: "emerald.600" }}
              />
            </HStack>
            <HStack space="2" alignItems="center" justifyContent="center">
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="10"
                rounded="full"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                rounded="2xl"
                h="4"
                maxW="200"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="5"
                rounded="full"
              />
            </HStack>
            <HStack space="2" alignItems="center" justifyContent="center">
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="10"
                rounded="full"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                rounded="2xl"
                h="4"
                maxW="200"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="5"
                rounded="full"
              />
            </HStack>
            <HStack>
              <Skeleton
                h="10"
                w="90%"
                _dark={{ endColor: "blueGray.600" }}
                _light={{ endColor: "emerald.600" }}
              />
            </HStack>
            <HStack space="2" alignItems="center" justifyContent="center">
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="10"
                rounded="full"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                rounded="2xl"
                h="4"
                maxW="200"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="5"
                rounded="full"
              />
            </HStack>
            <HStack space="2" alignItems="center" justifyContent="center">
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="10"
                rounded="full"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                rounded="2xl"
                h="4"
                maxW="200"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="5"
                rounded="full"
              />
            </HStack>
            <HStack>
              <Skeleton
                h="10"
                w="90%"
                _dark={{ endColor: "blueGray.600" }}
                _light={{ endColor: "emerald.600" }}
              />
            </HStack>
            <HStack space="2" alignItems="center" justifyContent="center">
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="10"
                rounded="full"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                rounded="2xl"
                h="4"
                maxW="200"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="5"
                rounded="full"
              />
            </HStack>
            <HStack space="2" alignItems="center" justifyContent="center">
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="10"
                rounded="full"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                rounded="2xl"
                h="4"
                maxW="200"
              />
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="5"
                rounded="full"
              />
            </HStack>
          </VStack>
        </Center>
      ) : matchsData?.length === 0 ? (
        <Center>NENHUMA PARTIDA ENCONTRADA PARA O DIA {dateFilter}</Center>
      ) : haveChampionships(matchsData) ? (
        <ScrollView>
          {matchsData?.map((championship: championship, i) =>
            haveMatchs(championship) ? (
              <Fragment key={i}>
                <Flex
                  alignSelf="center"
                  justifyContent="center"
                  px={2}
                  py={1}
                  width="100%"
                  _dark={{ bg: "blueGray.600", color: "orange.50" }}
                  _light={{ bg: "emerald.600", color: "orange.100" }}
                  flexDirection="row"
                >
                  <VStack w="10%">
                    <Button variant="ghost" onPress={() => changeExpand(i)}>
                      {buttonExpand[i]?.value ? (
                        <Icon
                          name="down"
                          size="4"
                          _dark={{ color: "orange.50" }}
                          _light={{ color: "orange.100" }}
                          as={<AntDesign name="up" />}
                        />
                      ) : (
                        <Icon
                          name="down"
                          size="4"
                          _dark={{ color: "orange.50" }}
                          _light={{ color: "orange.100" }}
                          as={<AntDesign name="down" />}
                        />
                      )}
                    </Button>
                  </VStack>
                  <VStack
                    w="80%"
                    alignSelf="center"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text
                      overflow="hidden"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      _dark={{ color: "orange.50" }}
                      _light={{ color: "orange.100" }}
                    >
                      {championship._id.championship}
                    </Text>
                  </VStack>
                  <VStack w="10%"></VStack>
                </Flex>
                <>
                  {buttonExpand[i]?.value ? (
                    championship?.matchs.map((match, i) =>
                      filterSelected === "" ||
                      match.status === filterSelected ? (
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
                                    size={35}
                                    m="auto"
                                  />
                                </VStack>
                                <VStack
                                  h="100%"
                                  w="80%"
                                  justifyContent="center"
                                >
                                  <Text
                                    _dark={{ color: "white" }}
                                    _light={{ color: "black" }}
                                    fontSize="16"
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
                                    size={35}
                                    m="auto"
                                  />
                                </VStack>
                                <VStack
                                  h="100%"
                                  w="80%"
                                  justifyContent="center"
                                >
                                  <Text
                                    _dark={{ color: "white" }}
                                    _light={{ color: "black" }}
                                    fontSize="16"
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
                                    fontSize="18"
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
                                  fontSize="18"
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
                                <Text fontSize="18" fontWeight="bold">
                                  {changeMinMatch(match)}
                                </Text>
                              ) : match?.status === "ENCERRADO" ? (
                                <Text fontSize="18" fontWeight="bold">
                                  FIM
                                </Text>
                              ) : (
                                <Text fontSize="18" fontWeight="bold">
                                  {match.schedule}
                                </Text>
                              )}
                              {match.status === "AO VIVO" &&
                                checkLastEvent(match) !== "" && (
                                  <Icon
                                    size={6}
                                    _dark={{ color: "blueGray.600" }}
                                    _light={{ color: "emerald.600" }}
                                    as={<Ionicons name={"ios-football"} />}
                                  />
                                )}
                            </VStack>
                          </HStack>
                          {i !== championship?.matchs.length - 1 && (
                            <Divider
                              _dark={{
                                bg: "blueGray.800",
                              }}
                              _light={{
                                bg: "emerald.600",
                              }}
                            />
                          )}
                        </Fragment>
                      ) : (
                        <Fragment key={i}></Fragment>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </>
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
              <Heading size="lg">Arena Sport Club</Heading>
              <HStack space={2} alignItems="center">
                <Text>Dark</Text>
                <Switch
                  isChecked={colorMode === "light"}
                  onToggle={toggleColorMode}
                  aria-label={
                    colorMode === "light"
                      ? "switch to dark mode"
                      : "switch to light mode"
                  }
                />
                <Text>Light</Text>
              </HStack>
            </VStack>
          </Center>
        </ScrollView>
      ) : filterSelected === "ENCERRADO" ? (
        <Center>NENHUMA PARTIDA ENCERRADA PARA O DIA {dateFilter}</Center>
      ) : (
        <Center>
          NENHUMA PARTIDA {filterSelected} PARA O DIA {dateFilter}
        </Center>
      )}
    </>
  );
}
