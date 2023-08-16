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
} from "native-base";
import logo from "../assets/logo1.png";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RouteContext } from "../contexts/RouteProvider";
import { AuthContext } from "../contexts/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWindowDimensions } from "react-native";
import i18n from "../languages/I18n";

export default function Settings() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [nameUser, setNameUser] = useState("");
  const context = useContext(RouteContext);
  const authContext = useContext(AuthContext);
  const route = useRoute();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate((prev) => !prev);
  }, [authContext?.language]);

  useEffect(() => {
    const updateNameUser = async () => {
      const name = await AsyncStorage.getItem("@arena:nameUser");
      if (name) setNameUser(JSON.parse(name));
    };
    updateNameUser();
  }, [authContext?.authenticated]);

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  const toggleTheme = async () => {
    if (colorMode === "light")
      await AsyncStorage.setItem("@arena:theme", JSON.stringify("dark"));
    else await AsyncStorage.setItem("@arena:theme", JSON.stringify("light"));
    toggleColorMode();
  };

  return (
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
          <VStack space={5} alignItems="center">
            <Heading
              size="lg"
              _dark={{ color: "orange.50" }}
              _light={{ color: "black" }}
            >
              {i18n.t("saudacao")}, {nameUser}!
            </Heading>
          </VStack>
          <Pressable
            onPress={() => {
              authContext.handleLogout();
            }}
            rounded="xl"
            w="80%"
            _dark={{ bg: "blueGray.700" }}
            _light={{ bg: "emerald.700" }}
            shadow={1}
            p="4"
            mt={4}
            mb={2}
          >
            <Center>
              <Text
                _dark={{ color: "red.500" }}
                _light={{ color: "red.500" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                {i18n.t("Sair")}
              </Text>
            </Center>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            onPress={() => {
              navigate("SignUp");
            }}
            rounded="xl"
            w="80%"
            _dark={{ bg: "blueGray.700" }}
            _light={{ bg: "emerald.700" }}
            shadow={1}
            p="4"
            mt={4}
            mb={2}
          >
            <Center>
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                {i18n.t("Cadastrar")}
              </Text>
            </Center>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate("SignIn");
            }}
            rounded="xl"
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
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                {i18n.t("Entrar")}
              </Text>
            </Center>
          </Pressable>
        </>
      )}
      <HStack w="80%" mb={2} alignItems="center" justifyContent="space-between">
        <Text
          w="40%"
          textAlign="center"
          _dark={{ color: "orange.50" }}
          _light={{ color: "black" }}
          fontSize={width > 700 ? 32 : 20}
          fontWeight="bold"
        >
          {i18n.t("Linguagem")}
        </Text>
        <Select
          selectedValue={authContext?.language}
          defaultValue={authContext?.language}
          accessibilityLabel="Escolha a linguagem"
          placeholder="Escolha a linguagem"
          _dark={{ bg: "blueGray.700", color: "orange.50" }}
          _light={{ bg: "emerald.700", color: "orange.100" }}
          w={width > 700 ? 56 : 40}
          fontSize={width > 700 ? 32 : 20}
          fontWeight="bold"
          rounded="xl"
          p={4}
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
                  bg: "emerald.300",
                  color: "orange.100",
                }
              : {
                  bg: "blueGray.500",
                  color: "orange.50",
                }
          }
          onValueChange={(itemValue) => authContext?.setLanguage(itemValue)}
        >
          <Select.Item label="Português" value="pt" />
          <Select.Item label="English" value="en" />
        </Select>
      </HStack>
      <HStack w="80%" space={2} alignItems="center" justifyContent="center">
        <Icon
          as={<Ionicons name="moon" />}
          _dark={{ color: "orange.50" }}
          _light={{ color: "black" }}
          size="2xl"
        />
        <Switch
          colorScheme="emerald"
          isChecked={colorMode === "light"}
          onToggle={toggleTheme}
          aria-label={
            colorMode === "light"
              ? "switch to dark mode"
              : "switch to light mode"
          }
        />
        <Icon
          as={<Ionicons name="sunny" />}
          _dark={{ color: "orange.50" }}
          _light={{ color: "black" }}
          size="2xl"
        />
      </HStack>
      <Divider
        w="80%"
        my={4}
        _dark={{
          bg: "blueGray.700",
        }}
        _light={{
          bg: "emerald.700",
        }}
      />
      <VStack space={5} alignItems="center">
        <Image source={logo} alt="ArenaSportClub" size="xl" />
        <Heading
          size="lg"
          _dark={{ color: "orange.50" }}
          _light={{ color: "black" }}
        >
          Arena Sport Club
        </Heading>
      </VStack>
      <Text fontSize={width > 700 ? 24 : 16}>{i18n.t("ProjetoAcademico")}</Text>
    </Box>
  );
}
