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
import userService from "../services/user";
import logo from "../assets/logo1.png";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import TeamService from "../services/team";
import ChampionshipService from "../services/championship";
import { FontAwesome } from "@expo/vector-icons";
import { color } from "native-base/lib/typescript/theme/styled-system";

type expandChampionship = {
  i: number;
  value: boolean;
};

export default function Favorites() {
  const id = "1185";
  const [team, setTeam] = useState<team[]>();
  const [championship, setChampionship] = useState<championship[]>();
  const [type, setType] = useState("team");

  useEffect(() => {
    userService.getFavorites("64348ce9a06f54f0bdcd1dc6").then((response) => {
      setTeam(response.data.teams);
      setChampionship(response.data.championships);
      setLoading(false);
    });
  }, []);

  const [starredStates, setStarredStates] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const { navigate } = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);

  const handleStarClick = (index: number) => {
    const newStarredStates = [...starredStates];

    newStarredStates[index] = !newStarredStates[index];

    setStarredStates(newStarredStates);
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
          selectedValue={type}
          defaultValue="team"
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
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Select.Item label="Times" value="team" />

          <Select.Item label="Campeonatos" value="championship" />
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
        {type === "team" // Verifica se loadingType é "Times" e se o time existe
          ? team?.map((team, i) => (
              <HStack
                justifyContent="space-between"
                alignItems="center"
                space={8}
              >
                <Image
                  source={{ uri: team.img }}
                  alt={team.name}
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
                  {team.name}
                </Text>
                <Icon
                  size="8"
                  marginRight={5}
                  _dark={{ color: "orange.50" }}
                  _light={{ color: "orange.100" }}
                  as={
                    <Ionicons
                      name={starredStates[1] ? "star" : "star-outline"}
                      onPress={() => handleStarClick(1)}
                    />
                  }
                />
              </HStack>
            ))
          : championship?.map((championship, i) => (
              <HStack
                justifyContent="space-between"
                alignItems="center"
                space={8}
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  space={8}
                >
                  <Image
                    source={{ uri: championship.img }}
                    alt={championship.name}
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
                    {championship.name}
                  </Text>
                  <Icon
                    size="8"
                    marginRight={5}
                    _dark={{ color: "orange.50" }}
                    _light={{ color: "orange.100" }}
                    as={
                      <Ionicons
                        name={starredStates[3] ? "star" : "star-outline"}
                        onPress={() => handleStarClick(3)}
                      />
                    }
                  />
                </HStack>
              </HStack>
            ))}
      </Box>
    </ScrollView>
  );
}
