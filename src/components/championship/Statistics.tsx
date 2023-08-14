import { Box, FlatList, HStack, Text } from "native-base";
import i18n from "../../languages/I18n";

type StatisticsProps = {
  championship: championship;
  width: number;
};

export default function Statistics({ championship, width }: StatisticsProps) {
  return (
    <>
      <Box w="100%">
        <FlatList
          data={championship.statistics}
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
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    _dark={{ color: "orange.50" }}
                    _light={{ color: "orange.100" }}
                  >
                    {item.name}
                  </Text>
                  <Box py={2} px={4} justifyContent="center" w="100%">
                    <HStack space={2} px={4} justifyContent="center" w="100%">
                      <Text minW="8%"></Text>
                      <Text
                        minW="30%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize="md"
                      >
                        {i18n.t("Jogador")}
                      </Text>
                      <Text
                        minW="30%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize="md"
                      >
                        {i18n.t("EquipeTabela")}
                      </Text>
                      {item?.name === "Artilheiros" ? (
                        <Text
                          minW="8%"
                          _dark={{ color: "orange.50" }}
                          _light={{ color: "orange.100" }}
                          fontWeight="semibold"
                          fontSize="md"
                        >
                          {i18n.t("Gols")}
                        </Text>
                      ) : (
                        <Text
                          minW="8%"
                          _dark={{ color: "orange.50" }}
                          _light={{ color: "orange.100" }}
                          fontWeight="semibold"
                          fontSize="md"
                        >
                          {i18n.t("Assistências")}
                        </Text>
                      )}
                    </HStack>
                  </Box>
                </Box>
                <FlatList
                  data={item.table}
                  renderItem={({ item }) => {
                    return (
                      <Box
                        _dark={{ bg: "blueGray.700" }}
                        _light={{ bg: "emerald.500" }}
                        py={2}
                        px={4}
                        my={1}
                        justifyContent="center"
                        w="100%"
                      >
                        <HStack space={2}>
                          <Text
                            minW="8%"
                            maxW="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.num}
                          </Text>
                          <Text
                            minW="40%"
                            maxW="40%"
                            overflow="hidden"
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.player}
                          </Text>
                          <Text
                            minW="30%"
                            maxW="30%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.team}
                          </Text>
                          <Text
                            minW="10%"
                            maxW="10%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.value}
                          </Text>
                        </HStack>
                      </Box>
                    );
                  }}
                  keyExtractor={(item) => item.num}
                />
              </Box>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </Box>
    </>
  );
}
