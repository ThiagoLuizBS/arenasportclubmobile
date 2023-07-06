import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { VStack, Input, Icon, Avatar, Flex, Center } from "native-base";

export default function Header() {
  return (
    <>
      <Flex
        alignSelf="center"
        paddingTop={8}
        paddingRight={2}
        paddingLeft={2}
        paddingBottom={2}
        width="100%"
        backgroundColor="emerald.100"
        flexDirection="row"
      >
        <VStack
          space={5}
          w="85%"
          h={12}
          backgroundColor="emerald.600"
          borderRadius={16}
          justifyContent="center"
        >
          <VStack w="100%" space={5} alignSelf="center">
            <Input
              placeholder="Encontre equipes e campeonatos"
              placeholderTextColor="orange.100"
              width="100%"
              borderWidth="0"
              py="3"
              px="1"
              fontSize="14"
              color="orange.100"
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="orange.100"
                  as={<MaterialIcons name="search" />}
                />
              }
              InputRightElement={
                <Icon
                  m="2"
                  mr="3"
                  size="6"
                  color="orange.100"
                  as={<MaterialIcons name="mic" />}
                />
              }
            />
          </VStack>
        </VStack>
        <VStack w="15%" alignSelf="center">
          <Avatar backgroundColor="emerald.600" size={10} alignSelf="center">
            <AntDesign name="user" size={32} color="#ffedd5" />
          </Avatar>
        </VStack>
      </Flex>
    </>
  );
}
