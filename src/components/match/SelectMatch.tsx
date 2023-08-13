import { HStack, ColorMode, VStack, Pressable, Text } from "native-base";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import i18n from "../../languages/I18n";

type SelectHomeProps = {
  buttonChange: string;
  setButtonChange: React.Dispatch<React.SetStateAction<string>>;
  colorMode: ColorMode;
};

export default function SelectMatch({
  buttonChange,
  setButtonChange,
  colorMode,
}: SelectHomeProps) {
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
        onPress={() => setButtonChange("summary")}
      >
        <VStack flexDirection="row" justifyContent="center" alignItems="center">
          <Ionicons
            name="football-sharp"
            size={32}
            color={
              colorMode === "light"
                ? buttonChange === "summary"
                  ? "#047857"
                  : "black"
                : buttonChange === "summary"
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
        onPress={() => setButtonChange("statistics")}
      >
        <VStack flexDirection="row" justifyContent="center" alignItems="center">
          <AntDesign
            name="clockcircle"
            size={28}
            color={
              colorMode === "light"
                ? buttonChange === "statistics"
                  ? "#047857"
                  : "black"
                : buttonChange === "statistics"
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
        onPress={() => setButtonChange("lineup")}
      >
        <VStack flexDirection="row" justifyContent="center" alignItems="center">
          <MaterialCommunityIcons
            name="whistle"
            size={32}
            color={
              colorMode === "light"
                ? buttonChange === "lineup"
                  ? "#047857"
                  : "black"
                : buttonChange === "lineup"
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
