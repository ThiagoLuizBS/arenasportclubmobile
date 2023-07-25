import React, { Fragment, useEffect, useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  Modal,
  HStack,
  Switch,
  Text,
  useColorMode,
  Pressable,
  Center,
} from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ModalHeader({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { navigate } = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content width="350">
          <Modal.Body>
            <Pressable
              onPress={() => {
                navigate("SignUp");
                setOpen(false);
              }}
              rounded="8"
              w="100%"
              _dark={{ bg: "blueGray.700" }}
              _light={{ bg: "emerald.700" }}
              p="4"
              mb={2}
            >
              <Center>
                <Text
                  _dark={{ color: "orange.50" }}
                  _light={{ color: "orange.100" }}
                  fontSize={16}
                  fontWeight="bold"
                >
                  Cadastrar
                </Text>
              </Center>
            </Pressable>
            <Pressable
              onPress={() => {
                navigate("SignIn");
                setOpen(false);
              }}
              rounded="8"
              w="100%"
              _dark={{ bg: "blueGray.700" }}
              _light={{ bg: "emerald.700" }}
              p="4"
              mb={2}
            >
              <Center>
                <Text
                  _dark={{ color: "orange.50" }}
                  _light={{ color: "orange.100" }}
                  fontSize={16}
                  fontWeight="bold"
                >
                  Entrar
                </Text>
              </Center>
            </Pressable>
            <HStack
              w="100%"
              space={2}
              alignItems="center"
              justifyContent="center"
            >
              <Text
                _dark={{ color: "white" }}
                _light={{ color: "black" }}
                fontSize={16}
                fontWeight="bold"
              >
                Dark
              </Text>
              <Switch
                colorScheme="emerald"
                isChecked={colorMode === "light"}
                onToggle={toggleColorMode}
                aria-label={
                  colorMode === "light"
                    ? "switch to dark mode"
                    : "switch to light mode"
                }
              />
              <Text
                _dark={{ color: "white" }}
                _light={{ color: "black" }}
                fontSize={16}
                fontWeight="bold"
              >
                Ligth
              </Text>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </TouchableWithoutFeedback>
  );
}
