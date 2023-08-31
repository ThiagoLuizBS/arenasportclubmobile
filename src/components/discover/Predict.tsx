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
import ModalDiscover from "./Modal";
import MatchService from "../../services/match";
import gptService from "../../services/gpt";
import { AuthContext } from "../../contexts/AuthProvider";

type LocalizationProps = {
  width: number;
  permission: boolean;
  errorMsg: boolean;
};

export default function Predict({
  width,
  permission,
  errorMsg,
}: LocalizationProps) {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [runPrompt, setRunPrompt] = useState(false);
  const [promptError, setPromptError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [matchsData, setMatchsData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [promptResponse, setPromptResponse] = useState("");

  const promptList =
    promptResponse !== "" ? promptResponse.split(`\n\n`).slice(0, -1) : null;

  const getTodayDate = (x: number) => {
    var date = new Date();
    date.setDate(date.getDate() + x);
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = date.getFullYear();
    if (Number(day) < 10) day = "0" + day;
    if (Number(month) < 10) month = "0" + month;
    return day + "-" + month + "-" + year;
  };

  useEffect(() => {
    MatchService.getMatchsByDate(getTodayDate(0), []).then((response) => {
      setMatchsData(response.data);
    });
  }, []);

  useEffect(() => {
    const getLocalization = async () => {
      if (runPrompt) {
        console.log("predict");
        setLoading(true);
        gptService
          .getGPTPredict(selectedMatch, authContext?.language)
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
          {i18n.t("Prever1")}
        </Text>
        <Text fontSize={width > 700 ? 24 : 20} fontWeight="semibold">
          {i18n.t("Prever2")}
        </Text>
      </HStack>

      <HStack w="100%" justifyContent="center" alignItems="center">
        <Pressable
          onPress={() => setModalVisible(true)}
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
                {i18n.t("PreverPartida")}
              </Text>
            )}
          </Center>
        </Pressable>
      </HStack>

      <ModalDiscover
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        width={width}
        matchsData={matchsData}
        setSelectedMatch={setSelectedMatch}
        setRunPrompt={setRunPrompt}
      />

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
