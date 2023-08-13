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
                        fontSize={20}
                        fontWeight="bold"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                      >
                        {item.phase}
                      </Text>
                    ) : (
                      <Text
                        fontSize={20}
                        fontWeight="bold"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                      >
                        {i18n.t("Classificacao")}
                      </Text>
                    )
                  ) : (
                    <>
                      {item.group === "Grupo A" ? (
                        <Text
                          fontSize={20}
                          fontWeight="bold"
                          _dark={{ color: "orange.50" }}
                          _light={{ color: "orange.100" }}
                        >
                          {item.phase}
                        </Text>
                      ) : (
                        <></>
                      )}
                      <Text
                        fontSize={20}
                        fontWeight="bold"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                      >
                        {item.group}
                      </Text>
                    </>
                  )}
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
                        {i18n.t("EquipeTabela")}
                      </Text>
                      <Text
                        minW="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize="md"
                      >
                        P
                      </Text>
                      <Text
                        minW="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize="md"
                      >
                        J
                      </Text>
                      <Text
                        minW="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize="md"
                      >
                        V
                      </Text>
                      <Text
                        minW="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize="md"
                      >
                        E
                      </Text>
                      <Text
                        minW="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize="md"
                      >
                        D
                      </Text>
                      <Text
                        minW="8%"
                        _dark={{ color: "orange.50" }}
                        _light={{ color: "orange.100" }}
                        fontWeight="semibold"
                        fontSize="md"
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
                            minW="30%"
                            maxW="30%"
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
                            minW="8%"
                            maxW="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.points}
                          </Text>
                          <Text
                            minW="8%"
                            maxW="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.games}
                          </Text>
                          <Text
                            minW="8%"
                            maxW="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.victorys}
                          </Text>
                          <Text
                            minW="8%"
                            maxW="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.draws}
                          </Text>
                          <Text
                            minW="8%"
                            maxW="8%"
                            _dark={{ color: "orange.50" }}
                            _light={{ color: "orange.100" }}
                            fontWeight="semibold"
                          >
                            {item.loses}
                          </Text>
                          <Text
                            minW="8%"
                            maxW="8%"
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
