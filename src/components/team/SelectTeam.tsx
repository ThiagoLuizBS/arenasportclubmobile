import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  useColorMode,
  Text,
  Pressable,
  VStack,
  Divider,
} from "native-base";
import { useWindowDimensions } from "react-native";
import i18n from "../../languages/I18n";

type SelectTeamProps = {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectTeam({ type, setType }: SelectTeamProps) {
  const { width } = useWindowDimensions();
  const { colorMode } = useColorMode();

  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      w="100%"
      my={3}
      pb={3}
      borderBottomWidth={2}
      _dark={{ borderBottomColor: "blueGray.700" }}
      _light={{ borderBottomColor: "emerald.700" }}
    >
      <Pressable
        w="25%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("informations")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Ionicons
            name="information-circle"
            size={32}
            color={
              colorMode === "light"
                ? type === "informations"
                  ? "#047857"
                  : "black"
                : type === "informations"
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
            {i18n.t("Informacao")}
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
        w="25%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("titles")}
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
                ? type === "titles"
                  ? "#047857"
                  : "black"
                : type === "titles"
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
            {i18n.t("Titulos")}
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
        w="25%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("results")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Ionicons
            name="football-sharp"
            size={32}
            color={
              colorMode === "light"
                ? type === "results"
                  ? "#047857"
                  : "black"
                : type === "results"
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
            {i18n.t("Resultados")}
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
        w="25%"
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("calendar")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Ionicons
            name="calendar"
            size={32}
            color={
              colorMode === "light"
                ? type === "calendar"
                  ? "#047857"
                  : "black"
                : type === "calendar"
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
            {i18n.t("Calendario")}
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
}
