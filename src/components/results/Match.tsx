import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack, Text, Image, Divider, Icon } from "native-base";
import { useWindowDimensions } from "react-native";
import i18n from "../../languages/I18n";
import { I18n } from "i18n-js";

type MatchProps = {
  match: match;
};

export default function Match({ match }: MatchProps) {
  const { width } = useWindowDimensions();

  const checkLastEvent = (match: match) => {
    let event = "";
    if (match.events?.length > 0) {
      let timeLastEvent = parseInt(
        match.events[match.events?.length - 1].time.replace("'", "")
      );
      let timeMatch = parseInt(match.time.replace("MIN", ""));

      if (
        match.events[match.events.length - 1].type === "GOAL" &&
        timeMatch <= timeLastEvent + 2
      ) {
        event = "GOL";
      }
    }

    return event;
  };

  const changeMinMatch = (match: match) => {
    let time;
    if (match?.time === "INTERVALO")
      time = match?.time?.replace("INTERVALO", i18n.t("Intervalo"));
    else if (match?.time === "SUSPENSO")
      time = match?.time?.replace("SUSPENSO", "SUSP");
    else if (match?.time === "ADIADO")
      time = match?.time?.replace("ADIADO", "CANC");
    else if (match?.time === "ATRASADO")
      time = match?.time?.replace("ATRASADO", i18n.t("Atrasado"));
    else if (match?.time === "INTERROMPIDO")
      time = match?.time?.replace("INTERROMPIDO", "SUSP");
    else if (match?.time === "PÊNALTIS")
      time = match?.time?.replace("PÊNALTIS", "PEN");
    else time = match?.time?.replace(" MIN", "'");

    return time;
  };

  return (
    <>
      <HStack
        w="100%"
        h={width > 700 ? 32 : 24}
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "success.100" }}
        px={2}
        py={1}
      >
        <VStack w="80%">
          <HStack h="50%">
            <VStack h="100%" w="20%">
              <Image
                style={{ resizeMode: "contain" }}
                source={{ uri: match.teams?.homeImg }}
                alt={`${match.teams?.homeName}`}
                size="30"
                m="auto"
              />
            </VStack>
            <VStack h="100%" w="80%" justifyContent="center">
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "black" }}
                fontSize={width > 700 ? 32 : 18}
              >
                {match.teams?.homeName}
              </Text>
            </VStack>
          </HStack>
          <HStack h="50%">
            <VStack h="100%" w="20%">
              <Image
                style={{ resizeMode: "contain" }}
                source={{ uri: match.teams?.awayImg }}
                alt={`${match.teams?.awayName}`}
                size="30"
                m="auto"
              />
            </VStack>
            <VStack h="100%" w="80%" justifyContent="center">
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "black" }}
                fontSize={width > 700 ? 32 : 18}
              >
                {match.teams?.awayName}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack w="5%">
          <HStack h="50%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "orange.50" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 40 : 20}
              fontWeight="bold"
            >
              {match.scoreHome}
            </Text>
          </HStack>
          <HStack h="50%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "orange.50" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 40 : 20}
              fontWeight="bold"
            >
              {match.scoreAway}
            </Text>
          </HStack>
        </VStack>
        <VStack
          w="15%"
          justifyContent="center"
          alignItems="center"
          _dark={{ color: "orange.50" }}
          _light={{ color: "black" }}
        >
          {match?.status === "AO VIVO" ? (
            <Text fontSize={width > 700 ? 32 : 18} fontWeight="bold">
              {changeMinMatch(match)}
            </Text>
          ) : match?.status === "ENCERRADO" ? (
            <Text fontSize={width > 700 ? 32 : 18} fontWeight="bold">
              {i18n.t("Fim")}
            </Text>
          ) : (
            <Text fontSize={width > 700 ? 32 : 18} fontWeight="bold">
              {match.schedule}
            </Text>
          )}
          {match.status === "AO VIVO" && checkLastEvent(match) !== "" && (
            <Icon
              size={6}
              _dark={{ color: "orange.50" }}
              _light={{ color: "emerald.700" }}
              as={<Ionicons name={"ios-football"} />}
            />
          )}
        </VStack>
      </HStack>
    </>
  );
}
