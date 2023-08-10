import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "native-base";
import { useWindowDimensions } from "react-native";

export default function Discover() {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize={width > 700 ? 32 : 20}>Descubra</Text>
    </Box>
  );
}
