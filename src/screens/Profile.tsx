import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  Heading,
  Pressable,
  Switch,
  Text,
  VStack,
  useColorMode,
  Image,
  Select,
  Icon,
  Divider,
  ScrollView,
} from "native-base";
import logo from "../assets/logo1.png";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RouteContext } from "../contexts/RouteProvider";
import { AuthContext } from "../contexts/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../services/user";
import i18n from "../languages/I18n";
import { FavoritesContext } from "../contexts/FavoritesProvider";

export default function Profile() {
  const { navigate } = useNavigation();
  const [language, setLanguage] = useState("Português");
  const [nameUser, setNameUser] = useState("");
  const [EmailUser, setNameEmail] = useState("");
  const context = useContext(RouteContext);
  const authContext = useContext(AuthContext);
  const favoritesContext = useContext(FavoritesContext);
  const route = useRoute();
  const [teamsList, setTeamsList] = useState<team[]>();
  const [championshipsList, setChampionshipsList] = useState<championship[]>();
  const [type, setType] = useState("team");
  const { colorMode, toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(true);

  const [favoritesChamp, setFavoritesChamp] = useState<championshipFavorite[]>(
    []
  );

  const [favoritesTeams, setFavoritesTeams] = useState<teamFavorite[]>([]);

  useEffect(() => {
    const updateNameUser = async () => {
      const name = await AsyncStorage.getItem("@arena:nameUser");
      if (name) setNameUser(JSON.parse(name));
    };
    updateNameUser();
  }, [authContext?.authenticated]);

  useEffect(() => {
    const getFavorites: any = async () => {
      const id = await AsyncStorage.getItem("@arena:idUser");
      if (authContext?.authenticated && id) {
        userService.getFavorites(JSON.parse(id)).then((response) => {
          setTeamsList(response.data.teams);
          setChampionshipsList(response.data.championships);
        });
      }
    };
    getFavorites();
  }, []);

  useEffect(() => {
    const updateEmailUser = async () => {
      const email = await AsyncStorage.getItem("@arena:emailUser");
      if (email) setNameEmail(JSON.parse(email));
    };
    updateEmailUser();
  }, [authContext?.authenticated]);

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  const addFavoriteChamp = (championship: championship) => {
    if (championship) {
      let { idChampionship, name, img, imgChampionship } = championship;
      setFavoritesChamp((favorite) => [
        ...favorite,
        { idChampionship, name, img, imgChampionship },
      ]);
    }
  };

  const removeFavoriteChamp = (championship: championship) => {
    if (championship)
      setFavoritesChamp(
        favoritesChamp.filter(
          (camp) => camp.idChampionship !== championship.idChampionship
        )
      );
  };

  const addFavoriteTeams = (team: team) => {
    if (team) {
      let { idTeam, name, img } = team;
      setFavoritesTeams((favorite) => [...favorite, { idTeam, name, img }]);
    }
  };

  const removeFavoriteTeams = (team: team) => {
    if (team)
      setFavoritesTeams(
        favoritesTeams.filter((team) => team.idTeam !== team.idTeam)
      );
  };

  const isFavoriteTeam = (teamToCheck: team) =>
    favoritesTeams?.some((team) => teamToCheck.idTeam === team.idTeam);

  const isFavoriteChamp = (championship: championship) =>
    favoritesChamp?.some(
      (camp) => camp.idChampionship === championship.idChampionship
    );

  return (
    <ScrollView _light={{ bg: "success.100" }} _dark={{ bg: "blueGray.900" }}>
      <Box
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "success.100" }}
        flex={1}
        px={2}
        justifyContent="center"
        alignItems="center"
        w="100%"
      >
        {authContext?.authenticated ? (
          <>
            <HStack
              space={7}
              alignItems="center"
              flexDirection={"row"}
              size="lg"
              _dark={{ bg: "blueGray.900" }}
              _light={{ bg: "success.100" }}
              margin={5}
              my={5}
            >
              <Icon
                size="10"
                _dark={{ color: "orange.50" }}
                _light={{ color: "emerald.700" }}
                as={<Ionicons name="body-sharp" />}
              />

              <Heading
                flexDirection={"row"}
                _dark={{ color: "white" }}
                _light={{ color: "black" }}
                margin={5}
                my={5}
                size="sm"
              >
                {i18n.t("Usuario")}: {nameUser}
              </Heading>
            </HStack>

            <HStack
              space={7}
              alignItems="center"
              flexDirection={"row"}
              size="sm"
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              margin={5}
              my={5}
            >
              <Icon
                size="10"
                _dark={{ color: "orange.50" }}
                _light={{ color: "emerald.700" }}
                as={<Ionicons name="mail" />}
              />

              <Heading
                flexDirection={"row"}
                _dark={{ color: "white" }}
                _light={{ color: "black" }}
                margin={2}
                my={2}
                size="sm"
              >
                E-mail: {EmailUser}
              </Heading>
            </HStack>
          </>
        ) : (
          <>
            <Pressable
              onPress={() => {
                navigate("SignIn");
              }}
              rounded="lg"
              w="80%"
              _dark={{ bg: "blueGray.700" }}
              _light={{ bg: "emerald.700" }}
              shadow={1}
              p="4"
              mt={2}
              mb={4}
            >
              <Center>
                <Text
                  _dark={{ color: "orange.50" }}
                  _light={{ color: "orange.100" }}
                  fontSize={20}
                  fontWeight="bold"
                >
                  {i18n.t("Entrar")}
                </Text>
              </Center>
            </Pressable>
          </>
        )}

        <Box
          bg="success.100"
          px={4}
          flex={1}
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "success.100" }}
        >
          {authContext?.authenticated && (
            <Select
              w="100%"
              alignItems="center"
              justifyContent="center"
              selectedValue={type}
              defaultValue="team"
              accessibilityLabel={i18n.t("EscolhaTipo")}
              placeholder={i18n.t("EscolhaTipo")}
              fontSize={14}
              minWidth={220}
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
              <Select.Item label={i18n.t("TimesFavoritos")} value="team" />
              <Select.Item
                label={i18n.t("CampeonatosFavoritos")}
                value="championship"
              />
            </Select>
          )}
          <HStack
            _dark={{ bg: "blueGray.900" }}
            _light={{ bg: "success.100" }}
            alignItems="center"
            justifyContent="center"
            marginRight="5"
            space={7}
          ></HStack>
          {authContext?.authenticated && (
            <Box
              justifyContent="center"
              alignContent="space-between"
              _dark={{ bg: "blueGray.600" }}
              _light={{ bg: "emerald.600" }}
              my={5}
              width="100%"
              bg="#008264"
              p="5"
              marginLeft={5}
              shadow={2}
              _text={{
                fontSize: "15",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {/* Times ou Campeonatos */}
              {type === "team"
                ? teamsList?.map((team, i) => (
                    <HStack
                      key={i}
                      my={2}
                      mx={2}
                      justifyContent="space-between"
                      textAlign="center"
                      alignItems="center"
                      space={5}
                    >
                      <Image
                        source={{ uri: team.img }}
                        alt={team.name}
                        size="10"
                      />
                      <Text
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontSize={14}
                        fontWeight="bold"
                      >
                        {team.name}
                      </Text>
                    </HStack>
                  ))
                : championshipsList?.map((championship, i) => (
                    <HStack
                      key={i}
                      justifyContent="space-between"
                      alignItems="center"
                      my={2}
                      mx={2}
                      space={5}
                    >
                      <Image
                        source={{
                          uri: championship?.imgChampionship
                            ? championship?.imgChampionship
                            : championship?.img,
                        }}
                        alt={championship.name}
                        size="10"
                      />
                      <Text
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontSize={16}
                        fontWeight="bold"
                      >
                        {championship.name}
                      </Text>
                    </HStack>
                  ))}
            </Box>
          )}
        </Box>
      </Box>
    </ScrollView>
  );
}
