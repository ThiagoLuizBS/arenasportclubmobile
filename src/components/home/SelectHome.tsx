import {
  HStack,
  Select,
  Icon,
  ColorMode,
  VStack,
  Pressable,
} from "native-base";
import {
  AntDesign,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";

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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeDatePicker = (date: Date) => {
    setSelectedDate(date);
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = date.getFullYear();
    if (Number(day) < 10) day = "0" + day;
    if (Number(month) < 10) month = "0" + month;
    changeDate(`${day}-${month}-${year}`);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange(event, date) {
        if (date) changeDatePicker(date);
      },
      mode: "date",
      is24Hour: true,
    });
  };
  return (
    <>
      <HStack
        w="100%"
        py={3}
        borderBottomWidth={2}
        _dark={{ borderBottomColor: "blueGray.700" }}
        _light={{ borderBottomColor: "emerald.700" }}
      >
        <Pressable
          w="20%"
          justifyContent="center"
          alignItems="center"
          onPress={() => changeSelected("all")}
        >
          <VStack>
            <Ionicons
              name="football-sharp"
              size={32}
              color={
                colorMode === "light"
                  ? buttonChange === "all"
                    ? "#047857"
                    : "black"
                  : buttonChange === "all"
                  ? "white"
                  : "#334155"
              }
            />
          </VStack>
        </Pressable>
        <Pressable
          w="20%"
          justifyContent="center"
          alignItems="center"
          isDisabled={getTodayDate(0) !== dateFilter}
          _disabled={{ opacity: 0.4 }}
          onPress={() => changeSelected("live")}
        >
          <VStack>
            <AntDesign
              name="clockcircle"
              size={28}
              color={
                colorMode === "light"
                  ? buttonChange === "live"
                    ? "#047857"
                    : "black"
                  : buttonChange === "live"
                  ? "white"
                  : "#334155"
              }
            />
          </VStack>
        </Pressable>
        <Pressable
          w="20%"
          justifyContent="center"
          alignItems="center"
          isDisabled={getTodayDate(0) !== dateFilter}
          _disabled={{ opacity: 0.4 }}
          onPress={() => changeSelected("finished")}
        >
          <VStack>
            <MaterialCommunityIcons
              name="whistle"
              size={32}
              color={
                colorMode === "light"
                  ? buttonChange === "finished"
                    ? "#047857"
                    : "black"
                  : buttonChange === "finished"
                  ? "white"
                  : "#334155"
              }
            />
          </VStack>
        </Pressable>
        <Pressable
          w="20%"
          justifyContent="center"
          alignItems="center"
          isDisabled={getTodayDate(0) !== dateFilter}
          _disabled={{ opacity: 0.4 }}
          onPress={() => changeSelected("next")}
        >
          <VStack>
            <Ionicons
              name="play-forward"
              size={32}
              color={
                colorMode === "light"
                  ? buttonChange === "next"
                    ? "#047857"
                    : "black"
                  : buttonChange === "next"
                  ? "white"
                  : "#334155"
              }
            />
          </VStack>
        </Pressable>
        <Pressable
          w="20%"
          justifyContent="center"
          alignItems="center"
          onPress={() => showMode()}
        >
          <VStack>
            <Fontisto
              name="date"
              size={32}
              color={colorMode === "light" ? "black" : "white"}
            />
          </VStack>
        </Pressable>
      </HStack>
    </>
    // <HStack space={5} pb={2} alignItems="center" justifyContent="center">
    //   <Select
    //     selectedValue={buttonChange}
    //     defaultValue="all"
    //     accessibilityLabel="Escolha o tipo"
    //     placeholder="Escolha o tipo"
    //     fontSize={16}
    //     fontWeight="bold"
    //     minWidth={140}
    //     borderRadius={16}
    //     borderWidth={0}
    //     my={1}
    //     _dark={{ bg: "blueGray.700", color: "orange.50" }}
    //     _light={{ bg: "emerald.700", color: "orange.100" }}
    //     dropdownIcon={
    //       <Icon
    //         name="down"
    //         size="4"
    //         mr={2}
    //         _dark={{ color: "orange.50" }}
    //         _light={{ color: "orange.100" }}
    //         as={<AntDesign name="down" />}
    //       />
    //     }
    //     _selectedItem={
    //       colorMode === "light"
    //         ? {
    //             bg: "emerald.300",
    //             color: "orange.100",
    //           }
    //         : {
    //             bg: "blueGray.700",
    //             color: "orange.50",
    //           }
    //     }
    //     onValueChange={(itemValue) => changeSelected(itemValue)}
    //   >
    //     <Select.Item label="Todos" value="all" />
    //     <Select.Item
    //       label="Ao vivo"
    //       value="live"
    //       isDisabled={getTodayDate(0) !== dateFilter}
    //     />
    //     <Select.Item
    //       label="Encerrados"
    //       value="finished"
    //       isDisabled={getTodayDate(0) !== dateFilter}
    //     />
    //     <Select.Item
    //       label="Próximos"
    //       value="next"
    //       isDisabled={getTodayDate(0) !== dateFilter}
    //     />
    //   </Select>
    //   <Select
    //     selectedValue={dateFilter}
    //     defaultValue="Hoje"
    //     accessibilityLabel="Escolha a data"
    //     placeholder="Escolha a data"
    //     minWidth={140}
    //     fontSize={16}
    //     fontWeight="bold"
    //     borderRadius={16}
    //     borderWidth={0}
    //     my={1}
    //     _dark={{ bg: "blueGray.700", color: "orange.50" }}
    //     _light={{ bg: "emerald.700", color: "orange.100" }}
    //     dropdownIcon={
    //       <Icon
    //         name="down"
    //         size="4"
    //         mr={2}
    //         _dark={{ color: "orange.50" }}
    //         _light={{ color: "orange.100" }}
    //         as={<AntDesign name="down" />}
    //       />
    //     }
    //     _selectedItem={
    //       colorMode === "light"
    //         ? {
    //             bg: "emerald.300",
    //             color: "orange.100",
    //           }
    //         : {
    //             bg: "blueGray.700",
    //             color: "orange.50",
    //           }
    //     }
    //     onValueChange={(itemValue) => changeDate(itemValue)}
    //   >
    //     <Select.Item label={getFilterSelect(-2)} value={getTodayDate(-2)} />
    //     <Select.Item label={getFilterSelect(-1)} value={getTodayDate(-1)} />
    //     <Select.Item label="Hoje" value={getTodayDate(0)} />
    //     <Select.Item label={getFilterSelect(1)} value={getTodayDate(1)} />
    //     <Select.Item label={getFilterSelect(2)} value={getTodayDate(2)} />
    //   </Select>
    // </HStack>
  );
}
