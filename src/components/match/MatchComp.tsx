import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  HStack,
  VStack,
  Text,
  Image,
  Divider,
  Icon,
  Pressable,
} from "native-base";
import { useWindowDimensions } from "react-native";

type MatchProps = {
  match: match;
};

export default function MatchComp({ match }: MatchProps) {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  return (
    <>
      <HStack
        w="100%"
        h={64}
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
          <Pressable
            w="100%"
            onPress={() =>
              navigate("Team", {
                teamId: match.teams.homeId,
              })
            }
          >
            <HStack w="100%" justifyContent="center" alignItems="center">
              <Image
                style={{ resizeMode: "contain" }}
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
                fontSize={width > 700 ? 32 : 18}
                fontWeight="bold"
                mt={2}
                overflow="hidden"
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {match.teams?.homeName}
              </Text>
            </HStack>
          </Pressable>
        </VStack>

        <VStack w="20%" justifyContent="center" alignItems="center">
          <VStack w="100%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 48 : 32}
              fontWeight="bold"
            >
              {match.scoreHome} - {match.scoreAway}
            </Text>
          </VStack>
        </VStack>

        <VStack w="40%" flexDirection="row" flexWrap="wrap">
          <Pressable
            w="100%"
            onPress={() =>
              navigate("Team", {
                teamId: match.teams.awayId,
              })
            }
          >
            <HStack w="100%" justifyContent="center" alignItems="center">
              <Image
                style={{ resizeMode: "contain" }}
                source={{ uri: match.teams?.awayImg }}
                alt={`${match.teams?.awayName}`}
                size="24"
                m="auto"
              />
            </HStack>
            <HStack w="100%" justifyContent="center" alignItems="center">
              <Text
                _dark={{ color: "white" }}
                _light={{ color: "black" }}
                fontSize={width > 700 ? 32 : 18}
                fontWeight="bold"
                mt={2}
                overflow="hidden"
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {match.teams?.awayName}
              </Text>
            </HStack>
          </Pressable>
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
              fontSize={width > 700 ? 40 : 20}
              fontWeight="bold"
            >
              {match.status}
            </Text>
          </HStack>
          <HStack w="100%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 24 : 16}
            >
              {match.schedule}
            </Text>
          </HStack>
          <HStack w="100%" justifyContent="center" alignItems="center">
            <Text
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              fontSize={width > 700 ? 24 : 16}
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
