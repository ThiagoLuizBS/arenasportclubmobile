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
  View,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MatchService from "../services/match";
import championship from "../services/championship";
import logo from "../assets/logo1.png";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import TeamService from "../services/team";
import { FontAwesome } from "@expo/vector-icons";
import { color } from "native-base/lib/typescript/theme/styled-system";

type expandChampionship = {
  i: number;
  value: boolean;
};

export default function Favorites() {
  const id = "1185";
  const [team, setTeam] = useState<team>();

  useEffect(() => {
    TeamService.getTeamById(id).then((response) => {
      setTeam(response.data[0]);
      console.log(team);
      setLoading(false);
    });
  }, [id]);

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

  const [starredStates, setStarredStates] = useState<boolean[]>(
    Array(5).fill(false)
  );
  const { navigate } = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [matchsData, setMatchsData] = useState([]);
  const [dateFilter, setDateFilter] = useState(getTodayDate(0));
  const [buttonExpand, setButtonExpand] = useState<expandChampionship[]>([]);
  const [filterSelected, setFilterSelected] = useState("");
  const [buttonChange, setButtonChange] = useState("all");

  const handleStarClick = (index: number) => {
    const newStarredStates = [...starredStates];

    newStarredStates[index] = !newStarredStates[index];

    setStarredStates(newStarredStates);
  };

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

  return (
    <ScrollView bg="success.100" px={4} flex={1}>
      <HStack
        alignItems="center"
        justifyContent="center"
        marginRight="5"
        space={5}
      >
        <Select
          selectedValue={buttonChange}
          defaultValue="all"
          accessibilityLabel="Escolha o tipo"
          placeholder="Escolha o tipo"
          fontSize={14}
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
          <Select.Item label="Times" value="all"
          
          
          />
          <Select.Item label="Campeonatos" value="Campeonatos" />
        </Select>
      </HStack>

      <View alignItems="center" justifyContent="center" flexDirection="row">
        <Text fontSize={25} fontWeight="bold" textAlign="center">
          Favoritos
        </Text>

        <Icon
          size="10"
          marginLeft="2"
          _dark={{ color: "yellow.400" }}
          _light={{ color: "yellow.400" }}
          as={<Ionicons name="star" />}
          onPress={() => navigate("Home")}
        />
      </View>

      <Box
        my={4}
        width="100%"
        bg="#008264"
        p="1"
        shadow={2}
        _text={{
          fontSize: "15",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <HStack justifyContent="space-between" alignItems="center" space={8}>
          <Image
            source={{ uri: team?.img }}
            alt={team?.name}
            size="12"
            marginLeft="2"
            borderRadius="xl"
            maxHeight="lg"
          />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "orange.100" }}
            marginY={3}
            fontSize={26}
            fontWeight="bold"
          >
            {team?.name}
          </Text>
          <Icon
            size="8"
            marginRight={5}
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
            as={<Ionicons name={starredStates[1] ? "star" : "star-outline"} />}
            onPress={() => handleStarClick(1)}
          />
        </HStack>
      </Box>

  

      <View alignItems="center" justifyContent="center" flexDirection="row">
        <Text fontSize={25} fontWeight="bold" textAlign="center">
          Times/Campeonatos
        </Text>

        <Icon
          size="10"
          marginLeft="2.5"
          _dark={{ color: "#008264" }}
          _light={{ color: "#008264" }}
          as={<FontAwesome name="soccer-ball-o" size={24} color="#008264" />}
        />
      </View>

      <Box
        my={4}
        width="100%"
        bg="#008264"
        p="1"
        shadow={2}
        _text={{
          fontSize: "15",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <HStack justifyContent="space-between" alignItems="center" space={8}>
          <Image
            source={{ uri: team?.img }}
            alt={team?.name}
            size="12"
            marginLeft="2"
            borderRadius="xl"
            maxHeight="lg"
          />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "orange.100" }}
            marginY={3}
            fontSize={26}
            fontWeight="bold"
          >
            {team?.name}
          </Text>
          <Icon
            size="8"
            marginRight={5}
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
            as={<Ionicons name={starredStates[3] ? "star" : "star-outline"} />}
            onPress={() => handleStarClick(3)}
          />
        </HStack>
      </Box>

    </ScrollView>
  );
}
