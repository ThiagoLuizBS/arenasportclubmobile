import { Flex, HStack, Text } from "native-base";

export default function MatchTitle({ title }: { title: string }) {
  return (
    <Flex
      _dark={{ bg: "blueGray.700", color: "orange.50" }}
      _light={{ bg: "emerald.700", color: "orange.100" }}
      px={2}
      py={1}
      width="100%"
      h={10}
      flexDirection="row"
      alignSelf="center"
      justifyContent="center"
    >
      <HStack
        w="100%"
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          _dark={{ color: "orange.50" }}
          _light={{ color: "orange.100" }}
          overflow="hidden"
          numberOfLines={1}
          ellipsizeMode="tail"
          fontSize={16}
          fontWeight="bold"
        >
          {title}
        </Text>
      </HStack>
    </Flex>
  );
}
