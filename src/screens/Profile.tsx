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

export default function Profile() {
  const { navigate } = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [language, setLanguage] = useState("Português");
  const [nameUser, setNameUser] = useState("");
  const [EmailUser, setNameEmail] = useState("");
  const context = useContext(RouteContext);
  const authContext = useContext(AuthContext);
  const route = useRoute();

  useEffect(() => {
    const updateNameUser = async () => {
      const name = await AsyncStorage.getItem("@arena:nameUser");
      if (name) setNameUser(JSON.parse(name));
    };
    updateNameUser();
  }, [authContext?.authenticated]);

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
          <HStack
            space={7}
            alignItems="center"
            flexDirection={"row"}
            size="lg"
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            margin={5}
            my={5}
          >
            <Ionicons
              name="body-sharp"
              size={45}
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
            />

            <Heading
              flexDirection={"row"}
              size="lg"
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              margin={5}
              my={5}
            >
              Usuário: {nameUser}
            </Heading>
          </HStack>

          <HStack
            space={7}
            alignItems="center"
            flexDirection={"row"}
            size="lg"
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            margin={5}
            my={5}
          >
            <Ionicons
              name="mail"
              size={45}
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
            />

            <Heading
              flexDirection={"row"}
              size="lg"
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              margin={5}
              my={5}
            >
              Email: {EmailUser}
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
                Entrar
              </Text>
            </Center>
          </Pressable>
        </>
      )}

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
