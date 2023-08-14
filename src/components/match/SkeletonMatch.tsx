import { Center, VStack, HStack, Skeleton } from "native-base";

export default function SkeletonMatch() {
  return (
    <Center>
      <VStack
        w="100%"
        space={2}
        rounded="md"
        h={64}
        alignItems="center"
        justifyContent="center"
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "success.100" }}
      >
        <HStack space="2" alignItems="center" justifyContent="center">
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="32"
            rounded="full"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            maxW="32"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            size="32"
            rounded="full"
          />
        </HStack>
        <HStack
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          flexWrap="wrap"
        >
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="8"
            my={1}
            maxW="400"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            my={1}
            maxW="400"
          />
          <Skeleton
            _dark={{ endColor: "blueGray.500" }}
            _light={{ endColor: "emerald.200" }}
            rounded="2xl"
            h="4"
            my={1}
            maxW="400"
          />
        </HStack>
      </VStack>
    </Center>
  );
}
