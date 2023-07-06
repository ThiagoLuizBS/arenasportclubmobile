import { useNavigation } from "@react-navigation/native";
import { Button, Center } from "native-base";

export default function Match() {
  const { navigate } = useNavigation();
  return (
    <Center bg="black" px={4} flex={1}>
      Partida
      <Button p={4} borderRadius={16} onPress={() => navigate("Home")}>
        Home
      </Button>
    </Center>
  );
}
