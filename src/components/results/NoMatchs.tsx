import { Center, Text } from "native-base";
import { useWindowDimensions } from "react-native";

export function TextStylized({ text }: { text: string }) {
  const { width } = useWindowDimensions();

  return (
    <Text
      _dark={{ color: "orange.50" }}
      _light={{ color: "black" }}
      fontSize={width > 700 ? 32 : 20}
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
