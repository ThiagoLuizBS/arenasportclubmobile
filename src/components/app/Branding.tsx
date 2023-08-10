import { Center, Heading, VStack, Image } from "native-base";
import logo from "../../assets/logo1.png";

export default function Branding() {
  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      px={4}
      py={4}
      flex={1}
    >
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
    </Center>
  );
}
