import { Center, Text } from "native-base";

export function TextStylized({ text }: { text: string }) {
  return (
    <Text
      _dark={{ color: "white" }}
      _light={{ color: "black" }}
      fontSize={20}
      fontWeight="bold"
    >
      {text}
    </Text>
  );
}

export function NoMatchsToday({ dateFilter }: { dateFilter: string }) {
  return (
    <Center px={2} my={4}>
      <TextStylized text={`NENHUMA PARTIDA ENCONTRADA`} />
      <TextStylized text={`PARA O DIA ${dateFilter.replaceAll("-", "/")}`} />
    </Center>
  );
}

export function NoMatchsEnded({ dateFilter }: { dateFilter: string }) {
  return (
    <Center px={2} my={4}>
      <TextStylized text={`NENHUMA PARTIDA ENCERRADA`} />
      <TextStylized text={`PARA O DIA ${dateFilter.replaceAll("-", "/")}`} />
    </Center>
  );
}

export function NoMatchsFilteredToday({
  filterSelected,
  dateFilter,
}: {
  filterSelected: string;
  dateFilter: string;
}) {
  return (
    <Center px={2} my={4}>
      <TextStylized text={`NENHUMA PARTIDA ${filterSelected}`} />
      <TextStylized text={`PARA O DIA ${dateFilter.replaceAll("-", "/")}`} />
    </Center>
  );
}
