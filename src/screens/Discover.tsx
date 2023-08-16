import { useContext, useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  Icon,
  ScrollView,
  Skeleton,
  Text,
  Pressable,
} from "native-base";
import { useWindowDimensions } from "react-native";
import * as Location from "expo-location";
import gptService from "../services/gpt";
import i18n from "../languages/I18n";
import { Ionicons } from "@expo/vector-icons";
import SelectDiscover from "../components/discover/SelectDiscover";
import { AuthContext } from "../contexts/AuthProvider";

export default function Discover() {
  const { width } = useWindowDimensions();
  const authContext = useContext(AuthContext);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState(false);
  const [permission, setPermission] = useState(false);
  const [runPrompt, setRunPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promptResponse, setPromptResponse] = useState("");
  const [type, setType] = useState("localization");

  const promptList =
    promptResponse !== "" ? promptResponse.split(`\n\n`).slice(0, -1) : null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermission(false);
        setErrorMsg(true);
        return;
      }

      setPermission(true);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const getLocalization = async () => {
      if (location?.coords && permission && runPrompt) {
        setLoading(true);
        gptService
          .getGPTLocalization(
            [
              (location?.coords.latitude).toString(),
              (location?.coords.longitude).toString(),
            ],
            authContext?.language
          )
          .then((res) => {
            setPromptResponse(res.data.data.content);
            setLoading(false);
            setRunPrompt(false);
          })
          .catch((res) => {
            setLoading(false);
            setRunPrompt(false);
          });
      }
    };
    getLocalization();
  }, [runPrompt]);

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
      <SelectDiscover type={type} setType={setType} />

      <HStack
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        flexWrap="wrap"
        my={4}
      >
        <Text fontSize={width > 700 ? 24 : 20} fontWeight="semibold">
          {i18n.t("Coordenadas1")}
        </Text>
        <Text fontSize={width > 700 ? 24 : 20} fontWeight="semibold">
          {i18n.t("Coordenadas2")}
        </Text>
      </HStack>

      <HStack w="100%" justifyContent="center" alignItems="center">
        <Pressable
          onPress={() => setRunPrompt(true)}
          disabled={!permission}
          _disabled={{ opacity: "0.5" }}
          rounded="xl"
          w="80%"
          _dark={{ bg: "blueGray.700" }}
          _light={{ bg: "emerald.700" }}
          shadow={1}
          p="4"
        >
          <Center>
            {loading ? (
              <Skeleton
                _dark={{ endColor: "blueGray.500" }}
                _light={{ endColor: "emerald.200" }}
                size="10"
                rounded="full"
              />
            ) : (
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                fontSize={width > 700 ? 40 : 20}
                fontWeight="bold"
              >
                {i18n.t("BusqueEquipes")}
              </Text>
            )}
          </Center>
        </Pressable>
      </HStack>

      <HStack
        w="80%"
        justifyContent="center"
        alignItems="center"
        space={4}
        my={2}
      >
        {errorMsg || !permission ? (
          <Text fontSize={width > 700 ? 24 : 16} fontWeight="semibold">
            {i18n.t("Permissao")}
          </Text>
        ) : (
          <Text fontSize={width > 700 ? 24 : 16} fontWeight="semibold">
            {i18n.t("AcessoLiberado")}
          </Text>
        )}
        <Icon
          mb="1"
          as={<Ionicons name="compass-outline" />}
          _dark={{ color: permission ? "orange.50" : "red.500" }}
          _light={{ color: permission ? "emerald.700" : "red.500" }}
          size="12"
        />
      </HStack>
      <ScrollView flex={1}>
        {promptList?.map((item: string, i: number) => (
          <HStack
            w="100%"
            key={i}
            _dark={{ bg: "blueGray.700" }}
            _light={{ bg: "emerald.700" }}
            py={2}
            px={2}
            my={1}
            rounded="xl"
          >
            <Text
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              fontWeight="semibold"
              fontSize={width > 700 ? 24 : 16}
            >
              {item}
            </Text>
          </HStack>
        ))}
      </ScrollView>
    </Box>
  );
}
