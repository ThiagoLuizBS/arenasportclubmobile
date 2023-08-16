import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
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

export default function SelectDiscover({
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
        onPress={() => setType("localization")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialIcons
            name="gps-fixed"
            size={32}
            color={
              colorMode === "light"
                ? type === "localization"
                  ? "#047857"
                  : "black"
                : type === "localization"
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
            {i18n.t("Localizacao")}
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
        disabled
        _disabled={{ opacity: "0.5" }}
        justifyContent="center"
        alignItems="center"
        onPress={() => setType("predict")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialIcons
            name="online-prediction"
            size={32}
            color={
              colorMode === "light"
                ? type === "predict"
                  ? "#047857"
                  : "black"
                : type === "predict"
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
            {i18n.t("Prever")}
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
}
