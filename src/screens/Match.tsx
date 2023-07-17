import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading, ScrollView, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

type paramsProps = {
  itemId: number;
};

export default function Match() {
  const route = useRoute();
  const { itemId } = route.params as paramsProps;
  const { navigate, goBack } = useNavigation();
  return (
    <Center bg="emerald.100" px={4} flex={1}>
      {itemId}
      <Button p={4} borderRadius={16} onPress={() => goBack()}>
        Home
      </Button>
    </Center>
  );
}
