import { useCallback, useContext, useEffect } from "react";
import { Center, Button, Box } from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RouteContext } from "../contexts/RouteProvider";

export default function Favorites() {
  const { navigate } = useNavigation();
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
      w="100%"
    >
      Favorites
      <Button p={4} borderRadius={16} onPress={() => navigate("Home")}>
        Home
      </Button>
    </Box>
  );
}
