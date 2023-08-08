import { VStack, Skeleton, HStack } from "native-base";

export default function SkeletonNews() {
  return (
    <VStack
      w="100%"
      space={2}
      rounded="md"
      alignItems="center"
      justifyContent="center"
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flexDirection="row"
      flexWrap="wrap"
    >
      <HStack w="100%" px={2} pt={4}>
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="8"
          w="50%"
        />
      </HStack>
      <VStack w="50%" space={2} px={2} py={4}>
        <Skeleton
          h="40"
          w="100%"
          rounded="lg"
          _dark={{ endColor: "blueGray.700" }}
          _light={{ endColor: "emerald.700" }}
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
      </VStack>
      <VStack w="50%" space={2} px={2} py={4}>
        <Skeleton
          h="40"
          w="100%"
          rounded="lg"
          _dark={{ endColor: "blueGray.700" }}
          _light={{ endColor: "emerald.700" }}
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
      </VStack>
      <VStack w="50%" space={2} px={2} py={4}>
        <Skeleton
          h="40"
          w="100%"
          rounded="lg"
          _dark={{ endColor: "blueGray.700" }}
          _light={{ endColor: "emerald.700" }}
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
      </VStack>
      <VStack w="50%" space={2} px={2} py={4}>
        <Skeleton
          h="40"
          w="100%"
          rounded="lg"
          _dark={{ endColor: "blueGray.700" }}
          _light={{ endColor: "emerald.700" }}
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="4"
          maxW="200"
        />
      </VStack>
    </VStack>
  );
}
