import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Center, HStack, Text, VStack } from "native-base";

type SummaryProps = {
  match: match;
  width: number;
};

export default function Summary({ match, width }: SummaryProps) {
  const CountGoals = (
    event: {
      time: string;
      type: string;
      description: string;
      side: string;
    }[],
    half: string
  ) => {
    var countHome = 0;
    var countAway = 0;
    event.map((event) => {
      if (
        (event.type === "GOAL" || event.type === "OG") &&
        parseInt(event.time.replace("'", "")) <= 45 &&
        half === "first-half"
      ) {
        if (event.side === "home") {
          countHome++;
        } else {
          countAway++;
        }
      } else if (
        (event.type === "GOAL" || event.type === "OG") &&
        parseInt(event.time.replace("'", "")) > 45 &&
        half === "second-half"
      ) {
        if (event.side === "home") {
          countHome++;
        } else {
          countAway++;
        }
      }
      return <></>;
    });
    return countHome + " - " + countAway;
  };

  const Events = (
    event: {
      time: string;
      type: string;
      description: string;
      side: string;
    },
    side: string
  ) => {
    if (event.type === "GOAL") {
      return (
        <HStack
          w="100%"
          justifyContent={event.side === "home" ? "flex-start" : "flex-end"}
          space={2}
        >
          {event.side === "home" ? (
            <>
              <Text>{event.time}</Text>
              <Ionicons name="football" size={24} color="green" />
              <Text>{event.description}</Text>
            </>
          ) : (
            <>
              <Text>{event.description}</Text>
              <Ionicons name="football" size={24} color="green" />
              <Text>{event.time}</Text>
            </>
          )}
        </HStack>
      );
    } else if (event.type === "YC") {
      return (
        <HStack
          w="100%"
          justifyContent={event.side === "home" ? "flex-start" : "flex-end"}
          space={2}
        >
          {event.side === "home" ? (
            <>
              <Text>{event.time}</Text>
              <MaterialCommunityIcons name="cards" size={24} color="yellow" />
              <Text> {event.description}</Text>
            </>
          ) : (
            <>
              <Text> {event.description}</Text>
              <MaterialCommunityIcons name="cards" size={24} color="yellow" />
              <Text>{event.time}</Text>
            </>
          )}
        </HStack>
      );
    } else if (event.type === "RC") {
      return (
        <HStack
          w="100%"
          justifyContent={event.side === "home" ? "flex-start" : "flex-end"}
          space={2}
        >
          {event.side === "home" ? (
            <>
              <Text>{event.time}</Text>
              <MaterialCommunityIcons name="cards" size={24} color="red" />
              <Text> {event.description}</Text>
            </>
          ) : (
            <>
              <Text> {event.description}</Text>
              <MaterialCommunityIcons name="cards" size={24} color="red" />
              <Text>{event.time}</Text>
            </>
          )}
        </HStack>
      );
    } else if (event.type === "OG") {
      return (
        <HStack
          w="100%"
          justifyContent={event.side === "home" ? "flex-start" : "flex-end"}
          space={2}
        >
          {event.side === "home" ? (
            <>
              <Text>{event.time}</Text>
              <Ionicons name="football" size={24} color="red" />
              <Text>{event.description}</Text>
            </>
          ) : (
            <>
              <Text>{event.description}</Text>
              <Ionicons name="football" size={24} color="red" />
              <Text>{event.time}</Text>
            </>
          )}
        </HStack>
      );
    } else if (event.type === "YR") {
      return (
        <HStack
          w="100%"
          justifyContent={event.side === "home" ? "flex-start" : "flex-end"}
          space={2}
        >
          {event.side === "home" ? (
            <>
              <Text>{event.time}</Text>
              <MaterialCommunityIcons name="cards" size={24} color="yellow" />
              <MaterialCommunityIcons name="cards" size={24} color="red" />
              <Text> {event.description}</Text>
            </>
          ) : (
            <>
              <Text> {event.description}</Text>
              <MaterialCommunityIcons name="cards" size={24} color="yellow" />
              <MaterialCommunityIcons name="cards" size={24} color="red" />
              <Text>{event.time}</Text>
            </>
          )}
        </HStack>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Box flex={1} flexDir="row" flexWrap="wrap" px={2}>
      {match?.events.length > 0 ? (
        <>
          <VStack w="100%" flexDir="row" flexWrap="wrap">
            <HStack
              w="100%"
              _dark={{ bg: "blueGray.700" }}
              _light={{ bg: "emerald.700" }}
              rounded="md"
              justifyContent="space-between"
              my={2}
              px={1}
            >
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                1º TEMPO
              </Text>
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                {CountGoals(match?.events, "first-half")}
              </Text>
            </HStack>
            <VStack w="100%" flexDir="row" flexWrap="wrap" my={2}>
              {typeof match?.events === "undefined" ? (
                <Text>Loading...</Text>
              ) : (
                match.events.map((event, i) => (
                  <HStack key={i}>
                    {parseInt(event.time.replace("'", "")) <= 45 ? (
                      event.side === "home" ? (
                        <HStack w="100%" my={2}>
                          {Events(event, "home")}
                        </HStack>
                      ) : (
                        <HStack w="100%" my={2}>
                          {Events(event, "away")}
                        </HStack>
                      )
                    ) : (
                      <></>
                    )}
                  </HStack>
                ))
              )}
            </VStack>
          </VStack>

          <VStack w="100%" flexDir="row" flexWrap="wrap">
            <HStack
              w="100%"
              _dark={{ bg: "blueGray.700" }}
              _light={{ bg: "emerald.700" }}
              justifyContent="space-between"
              rounded="md"
              my={2}
              px={1}
            >
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                2º TEMPO
              </Text>
              <Text
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                fontSize={width > 700 ? 32 : 20}
                fontWeight="bold"
              >
                {CountGoals(match?.events, "second-half")}
              </Text>
            </HStack>

            <VStack flexDir="row" flexWrap="wrap" w="100%">
              {typeof match?.events === "undefined" ? (
                <Text>Loading...</Text>
              ) : (
                match.events.map((event, i) => (
                  <HStack key={i}>
                    {parseInt(event.time.replace("'", "")) > 45 ? (
                      event.side === "home" ? (
                        <HStack w="100%" my={2}>
                          {Events(event, "home")}
                        </HStack>
                      ) : (
                        <HStack w="100%" my={2}>
                          {Events(event, "away")}
                        </HStack>
                      )
                    ) : (
                      <></>
                    )}
                  </HStack>
                ))
              )}
            </VStack>
          </VStack>
        </>
      ) : (
        <HStack justifyContent="center" px={2} my={4} w="100%">
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 32 : 20}
            fontWeight="bold"
          >
            SUMÁRIO NÃO DISPONÍVEL
          </Text>
        </HStack>
      )}
    </Box>
  );
}
