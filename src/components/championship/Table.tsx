import { Box, FlatList, HStack, Text } from "native-base";

type TableProps = {
  championship: championship;
  width: number;
};

export default function Table({ championship, width }: TableProps) {
  return (
    <>
      <Box w="100%">
        <FlatList
          data={championship.table}
          renderItem={({ item }) => {
            return (
              <Box
                _dark={{ bg: "blueGray.700" }}
                _light={{ bg: "emerald.500" }}
                py={2}
                my={1}
                rounded="xl"
                justifyContent="center"
                w="100%"
              >
                <Box alignItems="center">
                  {item?.group === "" ? (
                    item?.phase !== "" ? (
                      <Text fontSize={20} fontWeight="bold">
                        {item.phase}
                      </Text>
                    ) : (
                      <Text fontSize={20} fontWeight="bold">
                        Classificação
                      </Text>
                    )
                  ) : (
                    <>
                      {item.group === "Grupo A" ? (
                        <Text fontSize={20} fontWeight="bold">
                          {item.phase}
                        </Text>
                      ) : (
                        <></>
                      )}
                      <Text fontSize={20} fontWeight="bold">
                        {" "}
                        {item.group}{" "}
                      </Text>
                    </>
                  )}
                  <Box py={2} px={4} justifyContent="center" w="100%">
                    <HStack
                      space={2}
                      px={4}
                      rounded="xl"
                      justifyContent="center"
                      w="100%"
                    >
                      <Text minW="8%"></Text>
                      <Text minW="30%">Equipe</Text>
                      <Text minW="8%">P</Text>
                      <Text minW="8%">J</Text>
                      <Text minW="8%">V</Text>
                      <Text minW="8%">E</Text>
                      <Text minW="8%">D</Text>
                      <Text minW="8%">SG</Text>
                    </HStack>
                  </Box>
                </Box>
                <FlatList
                  data={item.table}
                  renderItem={({ item }) => {
                    return (
                      <Box
                        _dark={{ bg: "blueGray.700" }}
                        _light={{ bg: "emerald.100" }}
                        py={2}
                        px={4}
                        my={1}
                        rounded="xl"
                        justifyContent="center"
                        w="100%"
                      >
                        <HStack space={2}>
                          <Text minW="8%">{item.num}</Text>
                          <Text minW="30%">{item.team}</Text>
                          <Text minW="8%">{item.points}</Text>
                          <Text minW="8%">{item.games}</Text>
                          <Text minW="8%">{item.victorys}</Text>
                          <Text minW="8%">{item.draws}</Text>
                          <Text minW="8%">{item.loses}</Text>
                          <Text minW="8%">{item.goaldiference}</Text>
                        </HStack>
                      </Box>
                    );
                  }}
                  keyExtractor={(item) => item.team}
                />
              </Box>
            );
          }}
          keyExtractor={(item) => item.group}
        />
      </Box>
    </>
  );
}
