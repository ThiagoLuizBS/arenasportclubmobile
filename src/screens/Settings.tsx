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
import { AntDesign } from "@expo/vector-icons";
import { RouteContext } from "../contexts/RouteProvider";
import { AuthContext } from "../contexts/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const { navigate } = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [language, setLanguage] = useState("Português");
  const [nameUser, setNameUser] = useState("");
  const context = useContext(RouteContext);
  const authContext = useContext(AuthContext);
  const route = useRoute();

  useEffect(() => {
    const updateNameUser = async () => {
      const name = await AsyncStorage.getItem("@arena:nameUser");
      setNameUser(JSON.parse(name ?? "") ?? "");
    };
    updateNameUser();
  }, [authContext?.authenticated]);

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

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
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
            >
              Olá, {nameUser}!
            </Heading>
          </VStack>
          <Pressable
            onPress={() => {
              authContext.handleLogout();
            }}
            rounded="lg"
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
                fontSize={20}
                fontWeight="bold"
              >
                Sair
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
            rounded="lg"
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
                fontSize={20}
                fontWeight="bold"
              >
                Cadastrar
              </Text>
            </Center>
          </Pressable>
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
                Entrar
              </Text>
            </Center>
          </Pressable>
        </>
      )}
      <HStack w="80%" mb={2} alignItems="center" justifyContent="space-between">
        <Text
          w="40%"
          textAlign="center"
          _dark={{ color: "white" }}
          _light={{ color: "black" }}
          fontSize={20}
          fontWeight="bold"
        >
          Linguagem
        </Text>
        <Select
          selectedValue={language}
          defaultValue={language}
          accessibilityLabel="Escolha a linguagem"
          placeholder="Escolha a linguagem"
          _dark={{ bg: "blueGray.700", color: "orange.50" }}
          _light={{ bg: "emerald.700", color: "orange.100" }}
          width="180"
          fontSize={20}
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
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Select.Item label="Português" value="Português" />
          <Select.Item label="English" value="English" />
        </Select>
      </HStack>
      <HStack w="80%" space={2} alignItems="center" justifyContent="center">
        <Text
          _dark={{ color: "white" }}
          _light={{ color: "black" }}
          fontSize={20}
          fontWeight="bold"
        >
          Dark
        </Text>
        <Switch
          colorScheme="emerald"
          isChecked={colorMode === "light"}
          onToggle={toggleColorMode}
          aria-label={
            colorMode === "light"
              ? "switch to dark mode"
              : "switch to light mode"
          }
        />
        <Text
          _dark={{ color: "white" }}
          _light={{ color: "black" }}
          fontSize={20}
          fontWeight="bold"
        >
          Ligth
        </Text>
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
          _dark={{ color: "white" }}
          _light={{ color: "black" }}
        >
          Arena Sport Club
        </Heading>
      </VStack>
    </Box>
  );
}
