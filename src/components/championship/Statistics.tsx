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
                    fontSize={width > 700 ? 40 : 20}
                    fontWeight="bold"
                    _dark={{ color: "orange.50" }}
                    _light={{ color: "orange.100" }}
                  >
                    {item.name}
                  </Text>
                  <Box py={2} justifyContent="center" w="100%">
                    <HStack px={4} justifyContent="center" w="100%">
                      <Text w="8%"></Text>
                      <Text
                        w="42%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        {i18n.t("Jogador")}
                      </Text>
                      <Text
                        w="42%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        {i18n.t("EquipeTabela")}
                      </Text>
                      {item?.name === "Artilheiros" ? (
                        <Text
                          w="8%"
                          _dark={{ color: "orange.50" }}
                          _light={{ color: "orange.100" }}
                          fontWeight="semibold"
                          fontSize={width > 700 ? 24 : 16}
                        >
                          G
                        </Text>
                      ) : (
                        <Text
                          w="8%"
                          _dark={{ color: "orange.50" }}
                          _light={{ color: "orange.100" }}
                          fontWeight="semibold"
                          fontSize={width > 700 ? 24 : 16}
                        >
                          A
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
                        <HStack>
                          <Text
                            w="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.num}
                          </Text>
                          <Text
                            w="42%"
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
                            w="42%"
                            overflow="hidden"
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.team}
                          </Text>
                          <Text
                            w="8%"
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
