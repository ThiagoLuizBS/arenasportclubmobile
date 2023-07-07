import { useNavigation } from "@react-navigation/native";
import { Button, Center } from "native-base";

export default function Match() {
  const { navigate } = useNavigation();
  return (
    <Center bg="emerald.100" px={4} flex={1}>
      Match
      <Button p={4} borderRadius={16} onPress={() => navigate("Favorites")}>
        Favorites
      </Button>
    </Center>
  );
}
