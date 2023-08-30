import {
  HStack,
  ColorMode,
  VStack,
  Pressable,
  Text,
  useColorMode,
} from "native-base";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import i18n from "../../languages/I18n";
import { useWindowDimensions } from "react-native";

type SelectHomeProps = {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectMatch({ type, setType }: SelectHomeProps) {
  const { colorMode } = useColorMode();
  const { width } = useWindowDimensions();

  return (
    <HStack
      w="100%"
      h={16}
      py={3}
      borderBottomWidth={2}
      _dark={{ borderBottomColor: "blueGray.700" }}
      _light={{ borderBottomColor: "emerald.700" }}
    >
      <Pressable
        w="33%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("summary")}
      >
        <VStack flexDirection="row" justifyContent="center" alignItems="center">
          <Ionicons
            name="football-sharp"
            size={32}
            color={
              colorMode === "light"
                ? type === "summary"
                  ? "#047857"
                  : "black"
                : type === "summary"
                ? "white"
                : "#334155"
            }
          />
          <Text ml={1}>{i18n.t("Sumario")}</Text>
        </VStack>
      </Pressable>
      <Pressable
        w="33%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("statistics")}
      >
        <VStack flexDirection="row" justifyContent="center" alignItems="center">
          <AntDesign
            name="clockcircle"
            size={28}
            color={
              colorMode === "light"
                ? type === "statistics"
                  ? "#047857"
                  : "black"
                : type === "statistics"
                ? "white"
                : "#334155"
            }
          />
          <Text ml={1}>{i18n.t("Estatisticas")}</Text>
        </VStack>
      </Pressable>
      <Pressable
        w="33%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("lineup")}
      >
        <VStack flexDirection="row" justifyContent="center" alignItems="center">
          <MaterialCommunityIcons
            name="whistle"
            size={32}
            color={
              colorMode === "light"
                ? type === "lineup"
                  ? "#047857"
                  : "black"
                : type === "lineup"
                ? "white"
                : "#334155"
            }
          />
          <Text ml={1}>{i18n.t("Escalacoes")}</Text>
        </VStack>
      </Pressable>
    </HStack>
  );
}
