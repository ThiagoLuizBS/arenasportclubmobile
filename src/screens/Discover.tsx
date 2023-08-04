import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "native-base";

export default function Discover() {
  const { navigate } = useNavigation();

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
      <Text fontSize={20}>Descubra</Text>
    </Box>
  );
}
