import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon, Box, Center, HStack, Pressable, Text } from "native-base";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";

export default function Footer() {
  const [selected, setSelected] = useState(0);
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const navigationState = useNavigationState((state) => state);
  const rotaAtual = navigationState?.routes[navigationState.index];
  const nomeRotaAtual = rotaAtual?.name;

  useEffect(() => {
    if (nomeRotaAtual === "Home") setSelected(0);
    else if (nomeRotaAtual === "Favorites") setSelected(1);
    else if (nomeRotaAtual === "Favorites") setSelected(2);
    else if (nomeRotaAtual === "Profile") setSelected(3);
    else if (nomeRotaAtual === "Settings") setSelected(4);
    else if (nomeRotaAtual !== undefined) setSelected(-1);
  }, [nomeRotaAtual]);

  const handleSelected = (i: number) => {
    setSelected(i);
    if (i === 0) navigate("Home");
    else if (i === 1) navigate("Favorites");
    else if (i === 2) navigate("Favorites");
    else if (i === 3) navigate("Profile");
    else if (i === 4) navigate("Settings");
  };

  return (
    <Box
      _dark={{ bg: "blueGray.700" }}
      _light={{ bg: "emerald.700" }}
      width="100%"
      alignSelf="center"
    >
      <HStack
        _dark={{ bg: "blueGray.700" }}
        _light={{ bg: "emerald.700" }}
        alignItems="center"
        shadow={6}
        px={2}
      >
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="2"
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
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              size="xl"
            />
            <Text
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              fontSize={width > 700 ? 24 : 16}
            >
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
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              size="xl"
            />
            <Text
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              fontSize={width > 700 ? 24 : 16}
            >
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
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              size="xl"
            />
            <Text
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              fontSize={width > 700 ? 24 : 16}
            >
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
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              size="xl"
            />
            <Text
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              fontSize={width > 700 ? 24 : 16}
            >
              Notícias
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
