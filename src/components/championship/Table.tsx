import { Box, FlatList, HStack, Text } from "native-base";
import i18n from "../../languages/I18n";

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
                      <Text
                        fontSize={width > 700 ? 40 : 20}
                        fontWeight="bold"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                      >
                        {item.phase}
                      </Text>
                    ) : (
                      <Text
                        fontSize={width > 700 ? 40 : 20}
                        fontWeight="bold"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                      >
                        {i18n.t("Classificacao")}
                      </Text>
                    )
                  ) : (
                    <>
                      <Text
                        fontSize={width > 700 ? 40 : 20}
                        fontWeight="bold"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                      >
                        {item.group}
                      </Text>
                    </>
                  )}
                  <Box py={2} justifyContent="center" w="100%">
                    <HStack px={4} justifyContent="center" w="100%">
                      <Text w="8%"></Text>
                      <Text
                        w="44%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        {i18n.t("EquipeTabela")}
                      </Text>
                      <Text
                        w="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        P
                      </Text>
                      <Text
                        w="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        J
                      </Text>
                      <Text
                        w="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        V
                      </Text>
                      <Text
                        w="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        E
                      </Text>
                      <Text
                        w="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        D
                      </Text>
                      <Text
                        w="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize={width > 700 ? 24 : 16}
                      >
                        SG
                      </Text>
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
                            w="44%"
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
                            {item.points}
                          </Text>
                          <Text
                            w="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.games}
                          </Text>
                          <Text
                            w="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.victorys}
                          </Text>
                          <Text
                            w="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.draws}
                          </Text>
                          <Text
                            w="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.loses}
                          </Text>
                          <Text
                            w="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.goaldiference}
                          </Text>
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
