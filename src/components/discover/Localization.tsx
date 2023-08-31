import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Center,
  Skeleton,
  Icon,
  Text,
  Pressable,
  ScrollView,
} from "native-base";
import i18n from "../../languages/I18n";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import gptService from "../../services/gpt";
import { AuthContext } from "../../contexts/AuthProvider";

type LocalizationProps = {
  width: number;
  permission: boolean;
  errorMsg: boolean;
  location: Location.LocationObject | null;
};

export default function Localization({
  width,
  permission,
  errorMsg,
  location,
}: LocalizationProps) {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [promptError, setPromptError] = useState(false);
  const [runPrompt, setRunPrompt] = useState(false);
  const [promptResponse, setPromptResponse] = useState("");

  const promptList =
    promptResponse !== "" ? promptResponse.split(`\n\n`).slice(0, -1) : null;

  useEffect(() => {
    const getLocalization = async () => {
      if (location?.coords && runPrompt) {
        console.log("localization");
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
            setPromptError(false);
          })
          .catch((res) => {
            console.log(res);
            setLoading(false);
            setRunPrompt(false);
            setPromptError(true);
          });
      }
    };
    getLocalization();
  }, [runPrompt]);

  return (
    <>
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
        {promptError ? (
          <Text
            fontSize={width > 700 ? 24 : 16}
            fontWeight="semibold"
            color="red.500"
          >
            {i18n.t("TenteNovamente")}
          </Text>
        ) : (
          promptList?.map((item: string, i: number) => (
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
          ))
        )}
      </ScrollView>
    </>
  );
}
