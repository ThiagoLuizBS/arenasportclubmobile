import React, { useContext, useEffect, useState } from "react";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { VStack, Input, Icon, Flex, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/logo1.png";
import { SearchContext } from "../../contexts/SearchProvider";
import { useWindowDimensions } from "react-native";
import i18n from "../../languages/I18n";
import { AuthContext } from "../../contexts/AuthProvider";

export default function Header() {
  const authContext = useContext(AuthContext);
  const { navigate } = useNavigation();
  const context = useContext(SearchContext);
  const { width } = useWindowDimensions();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate((prev) => !prev);
  }, [authContext?.language]);

  const handleSearch = (e: string) => {
    context?.handleSearchField(e);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      paddingTop={4}
      px={2}
      paddingBottom={2}
      width="100%"
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flexDirection="row"
    >
      <VStack w="15%" alignItems="center" justifyContent="center">
        <Icon
          onPress={() => navigate("Profile")}
          as={<Entypo name="user" />}
          _dark={{ color: "orange.50" }}
          _light={{ color: "emerald.700" }}
          size="10"
        />
      </VStack>
      <VStack
        space={5}
        w="70%"
        h={12}
        _dark={{ bg: "blueGray.700" }}
        _light={{ bg: "emerald.700" }}
        borderRadius={16}
        justifyContent="center"
      >
        <VStack w="100%" space={5} alignItems="center" justifyContent="center">
          <Input
            placeholder={i18n.t("BuscarItens")}
            value={context?.searchField}
            onPressIn={() => navigate("Search")}
            onChangeText={(e) => handleSearch(e)}
            width="100%"
            borderWidth="0"
            py="3"
            px="1"
            fontSize={width > 700 ? 20 : 14}
            _dark={{ color: "orange.50", placeholderTextColor: "orange.50" }}
            _light={{
              color: "orange.100",
              placeholderTextColor: "orange.100",
            }}
            InputLeftElement={
              <Icon
                m="2"
                size="6"
                _dark={{ color: "orange.50" }}
                _light={{ color: "orange.100" }}
                as={<MaterialIcons name="search" />}
              />
            }
          />
        </VStack>
      </VStack>
      <VStack w="15%" alignItems="center" justifyContent="center">
        <Icon
          onPress={() => navigate("Settings")}
          as={<Ionicons name="settings" />}
          _dark={{ color: "orange.50" }}
          _light={{ color: "emerald.700" }}
          size="10"
        />
      </VStack>
    </Flex>
  );
}
