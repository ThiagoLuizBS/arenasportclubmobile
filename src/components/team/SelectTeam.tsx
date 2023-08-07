import { FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import {
  HStack,
  useColorMode,
  Text,
  Pressable,
  VStack,
  Divider,
} from "native-base";

type SelectTeamProps = {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectTeam({ type, setType }: SelectTeamProps) {
  const { colorMode } = useColorMode();
  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      w="100%"
      my={2}
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
            Informações
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
          <FontAwesome
            name="trophy"
            size={32}
            color={
              colorMode === "light"
                ? type === "titles"
                  ? "#047857"
                  : "black"
                : type === "titles"
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
            Títulos
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
            Resultados
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
          <Fontisto
            name="date"
            size={32}
            color={
              colorMode === "light"
                ? type === "calendar"
                  ? "#047857"
                  : "black"
                : type === "calendar"
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
            Calendário
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
}
