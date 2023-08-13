import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack, Text, Image, Divider, Icon } from "native-base";

type MatchProps = {
  match: match;
};

export default function MatchComp({ match }: MatchProps) {
  return (
    <>
      <HStack
        w="100%"
        h={56}
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "success.100" }}
        px={2}
        py={4}
        flexDirection="row"
        flexWrap="wrap"
      >
        <VStack
          w="40%"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <HStack w="100%" justifyContent="center" alignItems="center">
            <Image
              source={{ uri: match.teams?.homeImg }}
              alt={`${match.teams?.homeName}`}
              size="24"
              m="auto"
            />
          </HStack>
          <HStack w="100%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={18}
              fontWeight="bold"
              mt={2}
              overflow="hidden"
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {match.teams?.homeName}
            </Text>
          </HStack>
        </VStack>

        <VStack w="20%" justifyContent="center" alignItems="center">
          <VStack w="100%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={32}
              fontWeight="bold"
            >
              {match.scoreHome} - {match.scoreAway}
            </Text>
          </VStack>
        </VStack>

        <VStack w="40%" flexDirection="row" flexWrap="wrap">
          <HStack w="100%">
            <Image
              source={{ uri: match.teams?.awayImg }}
              alt={`${match.teams?.awayName}`}
              size="24"
              m="auto"
            />
          </HStack>
          <HStack w="100%" justifyContent="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={18}
              fontWeight="bold"
              mt={2}
              overflow="hidden"
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {match.teams?.awayName}
            </Text>
          </HStack>
        </VStack>
        <HStack
          w="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          flexWrap="wrap"
        >
          <HStack w="100%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={20}
              fontWeight="bold"
            >
              {match.status}
            </Text>
          </HStack>
          <HStack w="100%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={16}
            >
              {match.schedule}
            </Text>
          </HStack>
          <HStack w="100%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={16}
              overflow="hidden"
              ellipsizeMode="tail"
            >
              {match.stadium}
            </Text>
          </HStack>
        </HStack>
      </HStack>
    </>
  );
}
