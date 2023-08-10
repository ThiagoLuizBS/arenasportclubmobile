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
                  <HStack>
                    <Text w="20%"> </Text>
                    <Text w="25%"> Equipe </Text>
                    <Text w="10%"> P</Text>
                    <Text w="10%"> J </Text>
                    <Text w="10%"> V </Text>
                    <Text w="10%"> E </Text>
                    <Text w="10%"> D </Text>
                    <Text w="10%"> SG </Text>
                  </HStack>
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
                          <Text w="8%"> {item.num} </Text>
                          <Text w="30%"> {item.team} </Text>
                          <Text w="8%"> {item.points} </Text>
                          <Text w="8%"> {item.games} </Text>
                          <Text w="8%"> {item.victorys} </Text>
                          <Text w="8%"> {item.draws} </Text>
                          <Text w="8%"> {item.loses} </Text>
                          <Text w="8%"> {item.goaldiference} </Text>
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
