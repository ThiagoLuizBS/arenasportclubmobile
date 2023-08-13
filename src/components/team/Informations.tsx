import { Box, Text } from "native-base";

type InformationsProps = {
  team: team;
  width: number;
};

export default function Informations({ team, width }: InformationsProps) {
  return (
    <>
      {team?.infos.map((info, i) => (
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
          <Text
            flexDirection="row"
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
            fontWeight="bold"
            fontSize={width > 700 ? 40 : 24}
          >
            {info.title}
          </Text>
          <Text
            fontSize={width > 700 ? 32 : 20}
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
          >
            {info.description}
          </Text>
        </Box>
      ))}
    </>
  );
}
