import { HStack, Select, Icon, ColorMode } from "native-base";
import { AntDesign } from "@expo/vector-icons";

type SelectHomeProps = {
  buttonChange: string;
  colorMode: ColorMode;
  changeSelected: (buttonName: string) => void;
  getTodayDate: (x: number) => string;
  dateFilter: string;
  changeDate: (dateChange: string) => void;
  getFilterSelect: (x: number) => string;
};

export default function SelectHome({
  buttonChange,
  colorMode,
  changeSelected,
  getTodayDate,
  dateFilter,
  changeDate,
  getFilterSelect,
}: SelectHomeProps) {
  return (
    <HStack space={5} pb={2} alignItems="center" justifyContent="center">
      <Select
        selectedValue={buttonChange}
        defaultValue="all"
        accessibilityLabel="Escolha o tipo"
        placeholder="Escolha o tipo"
        fontSize={16}
        fontWeight="bold"
        minWidth={140}
        borderRadius={16}
        borderWidth={0}
        my={1}
        _dark={{ bg: "blueGray.700", color: "orange.50" }}
        _light={{ bg: "emerald.700", color: "orange.100" }}
        dropdownIcon={
          <Icon
            name="down"
            size="4"
            mr={2}
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
            as={<AntDesign name="down" />}
          />
        }
        _selectedItem={
          colorMode === "light"
            ? {
                bg: "emerald.300",
                color: "orange.100",
              }
            : {
                bg: "blueGray.700",
                color: "orange.50",
              }
        }
        onValueChange={(itemValue) => changeSelected(itemValue)}
      >
        <Select.Item label="Todos" value="all" />
        <Select.Item
          label="Ao vivo"
          value="live"
          isDisabled={getTodayDate(0) !== dateFilter}
        />
        <Select.Item
          label="Encerrados"
          value="finished"
          isDisabled={getTodayDate(0) !== dateFilter}
        />
        <Select.Item
          label="Próximos"
          value="next"
          isDisabled={getTodayDate(0) !== dateFilter}
        />
      </Select>
      <Select
        selectedValue={dateFilter}
        defaultValue="Hoje"
        accessibilityLabel="Escolha a data"
        placeholder="Escolha a data"
        minWidth={140}
        fontSize={16}
        fontWeight="bold"
        borderRadius={16}
        borderWidth={0}
        my={1}
        _dark={{ bg: "blueGray.700", color: "orange.50" }}
        _light={{ bg: "emerald.700", color: "orange.100" }}
        dropdownIcon={
          <Icon
            name="down"
            size="4"
            mr={2}
            _dark={{ color: "orange.50" }}
            _light={{ color: "orange.100" }}
            as={<AntDesign name="down" />}
          />
        }
        _selectedItem={
          colorMode === "light"
            ? {
                bg: "emerald.300",
                color: "orange.100",
              }
            : {
                bg: "blueGray.700",
                color: "orange.50",
              }
        }
        onValueChange={(itemValue) => changeDate(itemValue)}
      >
        <Select.Item label={getFilterSelect(-2)} value={getTodayDate(-2)} />
        <Select.Item label={getFilterSelect(-1)} value={getTodayDate(-1)} />
        <Select.Item label="Hoje" value={getTodayDate(0)} />
        <Select.Item label={getFilterSelect(1)} value={getTodayDate(1)} />
        <Select.Item label={getFilterSelect(2)} value={getTodayDate(2)} />
      </Select>
    </HStack>
  );
}
