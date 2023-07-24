import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
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

export default function Settings() {
  const { navigate, goBack } = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [language, setLanguage] = useState("Português");
  const context = useContext(RouteContext);
  const route = useRoute();

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
      {/* <HStack w="100%" alignItems="flex-start">
        <Pressable onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </HStack> */}
      <Pressable
        onPress={() => {
          navigate("Favorites");
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
          navigate("Favorites");
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
