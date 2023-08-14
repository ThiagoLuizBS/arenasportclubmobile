import { VStack, HStack, Alert, Text } from "native-base";
import { useWindowDimensions } from "react-native";
import i18n from "../../languages/I18n";

export default function ToastLogin({
  nameUser,
  type,
}: {
  nameUser: string;
  type: string;
}) {
  const { width } = useWindowDimensions();
  return (
    <Alert
      maxWidth="80%"
      alignSelf="center"
      flexDirection="row"
      status="success"
      variant="solid"
      mb={20}
    >
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize={width > 700 ? 24 : 16}
              fontWeight="medium"
              flexShrink={1}
              color="lightText"
            >
              {type} {i18n.t("Realizado")}
            </Text>
          </HStack>
        </HStack>
        <Text px="6" color="lightText">
          {i18n.t("BemVindo")} {nameUser}!
        </Text>
      </VStack>
    </Alert>
  );
}
