import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  VStack,
  Input,
  Icon,
  Flex,
  Box,
  Center,
  HStack,
  Pressable,
  Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
  const { navigate } = useNavigation();
  const [selected, setSelected] = React.useState(0);

  const handleSelected = (i: number) => {
    setSelected(i);
    if (i === 0) navigate("Home");
    else if (i === 1) navigate("Favorites");
    else if (i === 2) navigate("Championship");
    else if (i === 3) navigate("Match");
  };

  return (
    <Box bg="emerald.100" width="100%" alignSelf="center">
      <HStack
        bg="emerald.600"
        alignItems="center"
        shadow={6}
        paddingRight={2}
        paddingLeft={2}
      >
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => handleSelected(0)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <Ionicons
                  name={
                    selected === 0 ? "ios-football" : "ios-football-outline"
                  }
                />
              }
              color="orange.100"
              size="md"
            />
            <Text color="orange.100" fontSize="14">
              Resultados
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => handleSelected(1)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <Ionicons
                  name={selected === 1 ? "ios-star" : "ios-star-outline"}
                />
              }
              color="orange.100"
              size="md"
            />
            <Text color="orange.100" fontSize="14">
              Favoritos
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => handleSelected(2)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 2 ? "robot" : "robot-outline"}
                />
              }
              color="orange.100"
              size="md"
            />
            <Text color="orange.100" fontSize="14">
              Descubra
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => handleSelected(3)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <Ionicons
                  name={selected === 3 ? "newspaper" : "newspaper-outline"}
                />
              }
              color="orange.100"
              size="md"
            />
            <Text color="orange.100" fontSize="14">
              Notícias
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
