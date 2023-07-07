import { Center, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function Favorites() {
  const { navigate } = useNavigation();
  return (
    <Center bg="emerald.100" px={4} flex={1}>
      Favorites
      <Button p={4} borderRadius={16} onPress={() => navigate("Home")}>
        Home
      </Button>
    </Center>
  );
}
