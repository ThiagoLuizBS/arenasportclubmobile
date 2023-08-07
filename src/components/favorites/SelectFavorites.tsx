import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Select,
  Icon,
  useColorMode,
  Pressable,
  Divider,
  VStack,
  Text,
} from "native-base";

type SelectFavoritesProps = {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectFavorites({
  type,
  setType,
}: SelectFavoritesProps) {
  const { colorMode } = useColorMode();
  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      w="100%"
      py={1}
      borderBottomWidth={2}
      _dark={{ borderBottomColor: "blueGray.700" }}
      _light={{ borderBottomColor: "emerald.700" }}
    >
      <Pressable
        w="50%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("team")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <FontAwesome
            name="group"
            size={32}
            color={
              colorMode === "light"
                ? type === "team"
                  ? "#047857"
                  : "black"
                : type === "team"
                ? "white"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={14}
            fontWeight="bold"
          >
            Equipes
          </Text>
        </VStack>
      </Pressable>
      <Divider
        h="60%"
        m="auto"
        orientation="vertical"
        _dark={{
          bg: "blueGray.700",
        }}
        _light={{
          bg: "emerald.700",
        }}
      />
      <Pressable
        w="50%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("championship")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <FontAwesome
            name="trophy"
            size={32}
            color={
              colorMode === "light"
                ? type === "championship"
                  ? "#047857"
                  : "black"
                : type === "championship"
                ? "white"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={14}
            fontWeight="bold"
          >
            Campeonatos
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
}
