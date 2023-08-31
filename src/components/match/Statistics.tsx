import { HStack, Progress, Text, Box, Center, VStack } from "native-base";

type StatisticsProps = {
  match: match;
  width: number;
};

function CalculateStatistic(statistic_home: string, statistic_away: string) {
  const total = parseInt(statistic_home) + parseInt(statistic_away);
  return (parseInt(statistic_home) * 100) / total;
}

function ShowStatistics(statistic: {
  type: string;
  home: string;
  away: string;
}) {
  if (statistic.type === "Posse de bola (%)") {
    return (
      <Box width={"100%"} my={2}>
        <HStack justifyContent={"space-between"} mb={2}>
          <Text>{statistic.home} %</Text>
          <Text>Posse de bola</Text>
          <Text>{statistic.away} %</Text>
        </HStack>
        <Progress
          colorScheme="emerald"
          size="lg"
          value={parseInt(statistic.home)}
        />
      </Box>
    );
  } else if (statistic.type === "Passes corretos (%)") {
    return (
      <Box width={"100%"} my={2}>
        <HStack justifyContent={"space-between"} mb={2}>
          <Text>{statistic.home} %</Text>
          <Text>Passes corretos</Text>
          <Text>{statistic.away} %</Text>
        </HStack>
        <Progress
          colorScheme="emerald"
          size="lg"
          value={CalculateStatistic(statistic.home, statistic.away)}
        />
      </Box>
    );
  } else {
    return (
      <Box width={"100%"} my={2}>
        <HStack justifyContent={"space-between"} mb={2}>
          <Text> {statistic.home}</Text>
          <Text> {statistic.type}</Text>
          <Text> {statistic.away} </Text>
        </HStack>
        <Progress
          colorScheme="emerald"
          size="lg"
          value={CalculateStatistic(statistic.home, statistic.away)}
        />
      </Box>
    );
  }
}

export default function Statistics({ match, width }: StatisticsProps) {
  return (
    <Box flex={1} flexDir="row" flexWrap="wrap" px={2}>
      {match?.statistics?.length > 0 ? (
        <>
          <VStack>
            {typeof match?.statistics === "undefined" ? (
              <p>Loading...</p>
            ) : (
              match.statistics.map((statistic, i) => (
                <HStack key={i}>{ShowStatistics(statistic)}</HStack>
              ))
            )}
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
            ESTATÍSTICAS NÃO DISPONÍVEL
          </Text>
        </HStack>
      )}
    </Box>
  );
}
