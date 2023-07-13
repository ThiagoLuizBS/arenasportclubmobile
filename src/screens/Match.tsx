import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading, ScrollView, VStack } from "native-base";
import colors from "native-base";

export default function Match() {
  const { navigate } = useNavigation();
  return (
    <Center bg="emerald.100" px={4} flex={1}>
      Favorites
      <Button p={4} borderRadius={16} onPress={() => navigate("Favorites")}>
        Home
      </Button>
    </Center>
  );
}
