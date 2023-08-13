import { Center, VStack, HStack, Skeleton } from "native-base";

export default function SkeletonSearch() {
  return (
    <Center>
      <VStack
        w="100%"
        my={2}
        space={2}
        rounded="md"
        alignItems="center"
        justifyContent="center"
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "success.100" }}
      >
        <HStack alignItems="flex-start" justifyContent="flex-start">
          <Skeleton
            h="10"
            w="100%"
            _dark={{ endColor: "blueGray.700" }}
            _light={{ endColor: "emerald.700" }}
          />
        </HStack>
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="10"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="250"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="5"
            rounded="full"
          />
        </HStack>
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="10"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="250"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="5"
            rounded="full"
          />
        </HStack>
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="10"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="250"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="5"
            rounded="full"
          />
        </HStack>
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="10"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="250"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="5"
            rounded="full"
          />
        </HStack>
        <HStack>
          <Skeleton
            h="10"
            w="100%"
            _dark={{ endColor: "blueGray.700" }}
            _light={{ endColor: "emerald.700" }}
          />
        </HStack>
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="10"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="250"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="5"
            rounded="full"
          />
        </HStack>
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="10"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="250"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="5"
            rounded="full"
          />
        </HStack>
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="10"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="250"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="5"
            rounded="full"
          />
        </HStack>
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="10"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="250"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="5"
            rounded="full"
          />
        </HStack>
      </VStack>
    </Center>
  );
}
