import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Text,
  Center,
  HStack,
  Box,
  Image,
  useColorMode,
  ScrollView,
  Icon,
} from "native-base";
import { useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TeamService from "../services/team";
import { Ionicons } from "@expo/vector-icons";
import SelectTeam from "../components/team/SelectTeam";
import { FavoritesContext } from "../contexts/FavoritesProvider";

type paramsProps = {
  teamId: string;
};

export default function Team() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const route = useRoute();
  const { teamId } = route.params as paramsProps;
  const favoritesContext = useContext(FavoritesContext);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("informations");
  const [team, setTeam] = useState<team>({
    img: ".",
    name: ".",
    url: ".",
    idTeam: ".",
    locality: ".",
    infos: [{ title: ".", description: "." }],
    titles: [{ year: ".", name: ".", logo: "." }],
  });

  useEffect(() => {
    TeamService.getTeamById(teamId).then((response) => {
      setTeam(response.data[0]);
      setLoading(false);
    });
  }, [teamId]);

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
      >
        <HStack justifyContent="space-between" alignItems="center" space={8}>
          <Image source={{ uri: team?.img }} alt={`${team?.name}`} size="16" />
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
            marginY={3}
            fontSize={width > 700 ? 48 : 32}
            fontWeight="bold"
          >
            {team?.name}
          </Text>

          <Icon
            size="8"
            _dark={{ color: "orange.300" }}
            _light={{ color: "orange.500" }}
            as={
              <Ionicons
                name={
                  favoritesContext?.isFavoriteTeam(team)
                    ? "star"
                    : "star-outline"
                }
                onPress={() => {
                  favoritesContext?.isFavoriteTeam(team)
                    ? favoritesContext?.removeFavoriteTeam(team)
                    : favoritesContext?.addFavoriteTeam(team);
                }}
              />
            }
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
                fontSize={width > 700 ? 40 : 24}
              >
                {info.title}
              </Text>
              <Text
                fontSize={width > 700 ? 32 : 20}
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
