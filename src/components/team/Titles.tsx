import { Box, Text, Image, HStack } from "native-base";

type TitlesProps = {
  team: team;
  width: number;
};

export default function Titles({ team, width }: TitlesProps) {
  return (
    <>
      {team?.titles.map((title, i) => (
        <Box
          key={i}
          alignItems="flex-start"
          _dark={{ bg: "blueGray.700" }}
          _light={{ bg: "emerald.700" }}
          py={2}
          px={4}
          my={1}
          rounded="xl"
          justifyContent="center"
        >
          <HStack space={4}>
            <Text
              flexDirection="row"
              _dark={{ color: "orange.50" }}
              _light={{ color: "orange.100" }}
              fontWeight="bold"
              fontSize={width > 700 ? 40 : 24}
            >
              {title.year}
            </Text>
            <Image
              style={{ resizeMode: "contain" }}
              source={{ uri: title?.logo }}
              alt={title?.name}
              size="8"
              m="auto"
            />
          </HStack>
          <Text
            fontSize={width > 700 ? 32 : 20}
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
          >
            {title.name}
          </Text>
        </Box>
      ))}
    </>
  );
}
