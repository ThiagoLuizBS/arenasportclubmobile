import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, Button, Center, Heading, ScrollView, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import { RouteContext } from "../contexts/RouteProvider";

type paramsProps = {
  itemId: number;
};

export default function Match() {
  const route = useRoute();
  const { itemId } = route.params as paramsProps;
  const { navigate, goBack } = useNavigation();
  const context = useContext(RouteContext);

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
      w="100%"
    >
      {itemId}
      <Button p={4} borderRadius={16} onPress={() => goBack()}>
        Home
      </Button>
    </Box>
  );
}
