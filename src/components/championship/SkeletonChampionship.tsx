import { Center, VStack, HStack, Skeleton } from "native-base";

export default function SkeletonChampionship() {
  return (
    <Center>
      <HStack space="2" alignItems="center" justifyContent="center">
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          size="16"
          rounded="full"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          rounded="2xl"
          h="10"
          maxW="260"
        />
        <Skeleton
          _dark={{ endColor: "blueGray.500" }}
          _light={{ endColor: "emerald.200" }}
          size="8"
          rounded="full"
        />
      </HStack>
    </Center>
  );
}
