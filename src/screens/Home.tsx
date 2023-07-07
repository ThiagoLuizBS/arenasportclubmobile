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
} from "native-base";
import NativeBaseIcon from "../components/NativeBaseIcon";
import { ToggleDarkMode } from "../../App";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo1.jpg";

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "emerald.100" }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Image source={logo} alt="Alternate Text" size="xl" />
        <Heading size="lg">Arena Sport Club</Heading>
        <ToggleDarkMode />
        <Button onPress={() => navigate("Championship")}>Campeonatos</Button>
      </VStack>
    </Center>
  );
}
