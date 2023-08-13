import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  HStack,
  useColorMode,
  Pressable,
  Divider,
  VStack,
  Text,
} from "native-base";
import { useWindowDimensions } from "react-native";
import i18n from "../../languages/I18n";

type SelectFavoritesProps = {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectFavorites({
  type,
  setType,
}: SelectFavoritesProps) {
  const { colorMode } = useColorMode();
  const { width } = useWindowDimensions();
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
                ? "#fff7ed"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 16}
            fontWeight="bold"
          >
            {i18n.t("Equipe")}
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
          <Ionicons
            name="trophy-sharp"
            size={32}
            color={
              colorMode === "light"
                ? type === "championship"
                  ? "#047857"
                  : "black"
                : type === "championship"
                ? "#fff7ed"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 16}
            fontWeight="bold"
          >
            {i18n.t("Campeonatos")}
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
}
