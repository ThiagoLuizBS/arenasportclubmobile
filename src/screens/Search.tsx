import { useEffect, useState, useContext } from "react";
import TeamService from "../services/team";
import ChampionshipService from "../services/championship";
import {
  Box,
  HStack,
  Image,
  Pressable,
  VStack,
  useColorMode,
  Text,
  ScrollView,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SearchContext } from "../contexts/SearchProvider";
import { Ionicons } from "@expo/vector-icons";

export default function Search() {
  const { navigate, goBack } = useNavigation();
  const { colorMode } = useColorMode();
  const context = useContext(SearchContext);
  const [listTeams, setListTeams] = useState<team[]>([]);
  const [listChampionships, setListChampionships] = useState<championship[]>(
    []
  );

  //   const handleSearch = (event) => {
  //     const { value } = event.target;
  //     setSearchField(value);
  //   };

  useEffect(() => {
    if (context?.searchField === "") {
      setListTeams([]);
      setListChampionships([]);
    } else if (context?.searchField) {
      TeamService.getTeams(context?.searchField).then((response) => {
        setListTeams(response.data.team);
      });
      ChampionshipService.getChampionships(context?.searchField).then(
        (response) => {
          setListChampionships(response.data.championship);
        }
      );
    }
  }, [context?.searchField]);

  const deleteSearch = () => {
    context?.handleSearchField("");
  };

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      w="100%"
    >
      <HStack w="100%" alignItems="flex-start" px={4}>
        <Pressable
          onPress={() => {
            deleteSearch();
            goBack();
          }}
        >
          <Ionicons
            name="arrow-back"
            color={colorMode === "light" ? "black" : "white"}
            size={24}
          />
        </Pressable>
      </HStack>
      <ScrollView>
        {listTeams?.map((team, i) => (
          <Pressable
            key={i}
            onPress={() => {
              deleteSearch();
              navigate("Team", { teamId: team.idTeam });
            }}
          >
            <HStack>
              <VStack w="20%">
                <Image
                  source={{ uri: team.img }}
                  alt={`${team.img}`}
                  size={10}
                />
              </VStack>
              <VStack w="70%">
                <Text>{team.name}</Text>
              </VStack>
              <VStack w="10%"></VStack>
            </HStack>
          </Pressable>
        ))}
        {listChampionships?.map((champ, i) => (
          <Pressable
            key={i}
            onPress={() => {
              deleteSearch();
              navigate("Championship", {
                championshipId: champ.idChampionship,
              });
            }}
          >
            <HStack>
              <VStack w="20%">
                <Image
                  source={{
                    uri:
                      champ.imgChampionship !== ""
                        ? `${champ.imgChampionship}`
                        : `${champ.img}`,
                  }}
                  size={10}
                  alt={`${champ.name}`}
                />
              </VStack>
              <VStack w="70%">
                <Text>{champ.name}</Text>
              </VStack>
              <VStack w="10%"></VStack>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );
}
