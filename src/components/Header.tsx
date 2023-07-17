import React, { useState } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import {
  VStack,
  Input,
  Icon,
  Avatar,
  Flex,
  StatusBar,
  useColorMode,
} from "native-base";
import ModalHeader from "./ModalHeader";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { colorMode } = useColorMode();

  return (
    <Flex
      alignSelf="center"
      paddingTop={4}
      px={2}
      paddingBottom={2}
      width="100%"
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "emerald.100" }}
      flexDirection="row"
    >
      <StatusBar
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
        backgroundColor={colorMode === "light" ? "#d1fae5" : "#0f172a"}
      />
      <ModalHeader open={open} setOpen={setOpen} />
      <VStack
        space={5}
        w="85%"
        h={12}
        _dark={{ bg: "blueGray.500" }}
        _light={{ bg: "emerald.800" }}
        borderRadius={16}
        justifyContent="center"
      >
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            placeholder="Encontre equipes e campeonatos"
            width="100%"
            borderWidth="0"
            py="3"
            px="1"
            fontSize="14"
            _dark={{ color: "orange.50", placeholderTextColor: "orange.50" }}
            _light={{
              color: "orange.100",
              placeholderTextColor: "orange.100",
            }}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                as={<MaterialIcons name="mic" />}
              />
            }
          />
        </VStack>
      </VStack>
      <VStack w="15%" alignSelf="center">
        <Avatar
          _dark={{ bg: "blueGray.500" }}
          _light={{ bg: "emerald.800" }}
          size={12}
          alignSelf="center"
        >
          <Icon
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
            onPress={() => setOpen(true)}
            size="8"
            m="auto"
            as={<FontAwesome5 name="user-cog" />}
          />
        </Avatar>
      </VStack>
    </Flex>
  );
}
