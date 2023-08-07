import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  Center,
  HStack,
  Box,
  Image,
  useColorMode,
  ScrollView,
  Select,
  Icon,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MatchService from "../services/match";
import logo from "../assets/logo1.png";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import TeamService from "../services/team";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { Ionicons } from "@expo/vector-icons";
import SelectTeam from "../components/team/SelectTeam";

type expandChampionship = {
  i: number;
  value: boolean;
};

type paramsProps = {
  teamId: string;
};

export default function Team() {
  const route = useRoute();
  const { teamId } = route.params as paramsProps;
  const [team, setTeam] = useState<team>();

  useEffect(() => {
    TeamService.getTeamById(teamId).then((response) => {
      setTeam(response.data[0]);
      setLoading(false);
    });
  }, [teamId]);

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

  const [isStarred, setIsStarred] = useState(false);
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [matchsData, setMatchsData] = useState([]);
  const [dateFilter, setDateFilter] = useState(getTodayDate(0));
  const [type, setType] = useState("informations");
  const [buttonExpand, setButtonExpand] = useState<expandChampionship[]>([]);
  const [filterSelected, setFilterSelected] = useState("");
  const [buttonChange, setButtonChange] = useState("all");

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

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

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      w="100%"
    >
      <Box
        width="100%"
        _dark={{ bg: "blueGray.600" }}
        _light={{ bg: "emerald.600" }}
        p="5"
        shadow={2}
        _text={{
          fontSize: "md",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <HStack justifyContent="space-between" alignItems="center" space={8}>
          <Image source={{ uri: team?.img }} alt={`${team?.name}`} size="16" />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "orange.100" }}
            marginY={3}
            fontSize={30}
            fontWeight="bold"
          >
            {team?.name}
          </Text>

          <Icon
            size="8"
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
            as={<Ionicons name={isStarred ? "star" : "star-outline"} />}
            onPress={handleStarClick}
          />
        </HStack>
      </Box>
      <SelectTeam type={type} setType={setType} />
      <ScrollView>
        <Center
          alignItems="flex-start"
          paddingBottom="10"
          justifyContent="center"
          _dark={{ bg: "blueGray.700" }}
          _light={{ bg: "emerald.600" }}
          mb={4}
        >
          {team?.infos.map((info, i) => (
            <Box
              key={i}
              alignItems="flex-start"
              paddingBottom="13"
              justifyContent="center"
              marginRight="5"
              marginLeft="5"
              paddingTop="8"
            >
              <Text
                flexDirection="row"
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                fontWeight="bold"
                fontSize="24"
              >
                {info.title}
              </Text>
              <Text
                fontSize="18"
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
              >
                {info.description}
              </Text>
            </Box>
          ))}
        </Center>
      </ScrollView>
    </Box>
  );
}
